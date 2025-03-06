---
title: 'Self-guided information for few-shot classification'
authors:
  - Zhineng Zhao
  - Qifan Liu
  - Wenming Cao
  - Deliang Lian
  - Zhihai He
author_notes:
  - ''
  - ''
date: '2022-11-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2022-11-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['2']

# Publication name and optional abbreviated publication name.
publication: 'Pattern Recognition: The Journal of the Pattern Recognition Society'
publication_short: 'Pattern Recognition'

abstract: Few-shot classification aims to identify novel categories using only a few labeled samples. Generally, the metric-based few-shot classification methods compare the feature embedding of Query samples (unlabeled samples) with Support samples (labeled samples) in a metric algorithm to predict which category the Query sample belongs to. Obtaining a good feature embedding for each sample in the feature extraction stage can improve the classification accuracy in the metric stage. Based on this, we design the Self-Guided Information Convolution (SGI-Conv), an improved convolution structure, which utilizes the high-level features to guide the network to extract the required discriminative features. To effectively utilize the feature embeddings of samples, we divide the metric network into multiple blocks and build a multi-layer graph convolutional network by sharing adjacent matrices. The multi-layer structure enhances the aggregation ability of graph convolution. Extensive experiments on multiple benchmark datasets demonstrate that our method has achieved competitive results on the few-shot classification tasks.

# Summary. An optional shortened abstract.
share: false
feature: true
tags:
  - Few-shot classification
  - Graph convolution network
  - Self-guided information


links: 
- name: "Link"
  url: "https://www.sciencedirect.com/science/article/abs/pii/S0031320322003612"
# url_pdf: 
# url_code: ''
# url_dataset: ''
# url_poster: ''
# url_project: ''
# url_slides: ''
# url_source: ''
# url_video: ''

# # Featured image
# # To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/jdD8gXaTZsc)'
#   focal_point: ''
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.

---

