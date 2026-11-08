const trackingParameters = new Set([
  'fbclid', 'gclid', 'dclid', 'msclkid', 'mc_cid', 'mc_eid', 'igshid',
  '_ga', '_gl', 'spm', 'si', 'feature', 'ref', 'referrer', 'via',
]);

/** Remove tracking without deleting identifiers such as OpenReview's id. */
export function cleanPublicationUrl(value: string): string {
  if (!/^https?:\/\//i.test(value)) return value;
  const url = new URL(value);
  for (const key of [...url.searchParams.keys()]) {
    if (key.toLowerCase().startsWith('utm_') || trackingParameters.has(key.toLowerCase())) {
      url.searchParams.delete(key);
    }
  }
  url.hash = '';
  return url.href;
}
