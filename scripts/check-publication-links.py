#!/usr/bin/env python3
"""Check each unique external paper URL with a streamed GET (requires requests).

This is an explicit, on-demand check. It is not part of CI because publishers
may rate-limit requests or require browser verification. No website data is edited.
"""
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone
from html import unescape
import json
from pathlib import Path
import re
import time
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

import requests

TRACKING = {'fbclid', 'gclid', 'dclid', 'msclkid', 'mc_cid', 'mc_eid', 'igshid',
            '_ga', '_gl', 'spm', 'si', 'feature', 'ref', 'referrer', 'via'}


def clean_url(value):
    parsed = urlsplit(value.strip())
    query = [(k, v) for k, v in parse_qsl(parsed.query, keep_blank_values=True)
             if not k.lower().startswith('utm_') and k.lower() not in TRACKING]
    # Preserve identifiers such as OpenReview id and ICASSP PaperNum.
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, urlencode(query), ''))


def check_url(url, timeout=25):
    start = time.monotonic()
    result = {'url': url, 'clean': clean_url(url) == url,
              'checkedAt': datetime.now(timezone.utc).isoformat(timespec='seconds')}
    try:
        with requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; AcademicPublicationLinkCheck/1.0)',
            'Accept': 'text/html,application/pdf;q=0.9,*/*;q=0.8',
            'Range': 'bytes=0-131071',
        }, timeout=(min(timeout, 12), timeout), allow_redirects=True, stream=True) as response:
            result.update(httpStatus=response.status_code, finalUrl=clean_url(response.url),
                          contentType=response.headers.get('Content-Type', '').split(';')[0])
            sample = bytearray()
            for chunk in response.iter_content(16384):
                sample.extend(chunk)
                if len(sample) >= 131072 or time.monotonic() - start > timeout:
                    break
            result['sampleBytes'] = len(sample)
            is_pdf = bytes(sample[:1024]).lstrip().startswith(b'%PDF-')
            text = sample.decode(response.encoding or 'utf-8', errors='replace')
            title = re.search(r'<title[^>]*>(.*?)</title>', text, re.I | re.S)
            result['pageTitle'] = unescape(re.sub('<[^>]+>', '', title[1])).strip()[:240] if title else ''
            challenge = bool(re.search(
                r'verifying your browser|making sure you.re not a bot|just a moment|'
                r'verify (?:that )?you are (?:a )?human|captcha|enable javascript and cookies|'
                r'client challenge|anubis|access denied|cookies_not_supported|request (?:was )?rejected',
                text[:65536], re.I))
            if '/challenge' in response.url or 'cookies_not_supported' in response.url:
                challenge = True
            if response.status_code in (401, 403, 407, 418, 420, 429) or challenge:
                result.update(status='restricted', detail='Browser verification, access restriction, or rate limit; not proof of a dead link.')
            elif response.status_code in (404, 410):
                result.update(status='not-found', detail='Server returned not found or gone.')
            elif response.status_code >= 400:
                result.update(status='http-error', detail='Server returned an HTTP error.')
            elif is_pdf:
                result.update(status='accessible', detail='Paper PDF returned with a valid %PDF signature.')
            elif response.status_code == 202 or len(sample) < 100 or re.fullmatch(
                    r'redirecting(?:\.{3})?', result['pageTitle'], re.I):
                result.update(status='unconfirmed', detail='Empty/queued/redirect-only response; paper page access not confirmed.')
            elif result['contentType'] == 'application/pdf':
                result.update(status='unconfirmed', detail='PDF content type without a valid PDF signature in the response sample.')
            else:
                result.update(status='accessible', detail='Paper landing page returned; this does not imply subscription full-text access.')
    except requests.RequestException as error:
        result.update(status='network-error', detail=str(error)[:400])
    result['elapsedSeconds'] = round(time.monotonic() - start, 2)
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input', type=Path, default=Path(__file__).resolve().parents[1] / 'src/data/site.json')
    parser.add_argument('--output', type=Path, default=Path(__file__).resolve().parents[1] / 'docs/publication-link-check.json')
    parser.add_argument('--workers', type=int, default=5)
    parser.add_argument('--timeout', type=int, default=25)
    args = parser.parse_args()
    data = json.loads(args.input.read_text())
    papers = data['publications'] if isinstance(data, dict) else data
    references = {}
    for paper in papers:
        for link in paper.get('links', []):
            url = link['url']
            if url.startswith(('https://', 'http://')):
                references.setdefault(url, []).append({'paper': paper.get('id', paper.get('number')), 'title': paper['title'], 'label': link.get('label', '')})
    results = []
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        jobs = {pool.submit(check_url, url, args.timeout): url for url in references}
        for future in as_completed(jobs):
            item = future.result()
            item['papers'] = references[item['url']]
            results.append(item)
            print(f"{len(results)}/{len(references)} {item['status']} {item.get('httpStatus', '-')} {item['url']}", flush=True)
    results.sort(key=lambda r: r['url'])
    counts = {key: sum(r['status'] == key for r in results) for key in sorted({r['status'] for r in results})}
    report = {'checkedAt': datetime.now(timezone.utc).isoformat(timespec='seconds'), 'method': 'Streamed HTTP GET with redirects; PDF signature and challenge-page checks',
              'paperCount': len(papers), 'uniqueExternalLinks': len(results), 'counts': counts, 'results': results}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps(counts, ensure_ascii=False), flush=True)


if __name__ == '__main__':
    main()
