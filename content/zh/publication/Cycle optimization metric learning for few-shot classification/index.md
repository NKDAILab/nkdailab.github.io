---
title: 'Cycle optimization metric learning for few-shot classification'
authors:
  - Qifan Liu
  - Wenming Cao
  - Zhihai He
author_notes:
  - ''
  - ''
date: '2023-07-01T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-07-01T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['2']

# Publication name and optional abbreviated publication name.
publication: 'Pattern Recognition: The Journal of the Pattern Recognition Society'
publication_short: 'Pattern Recognition'

abstract: Metric learning methods are widely used in few-shot learning due to their simplicity and effectiveness. Most existing methods directly predict query labels by comparing the similarity between support and query samples. In this paper, we design a cycle optimization metric network for few-shot classification task that optimizes model performance based on loop-prediction of the labels of query samples and support samples. Specifically, we construct a forward network and reverse network based on a geometric algebra Graph Neural Network (GA-GNN). These two networks form the loop prediction from support samples to query samples and then back to support samples, guided by a cycle-consistency loss. We also introduce an optimization module that is able to correct the predicted results of query samples to further improve the network performance. Our extensive experimental results demonstrate that the proposed cycle optimization metric network outperforms existing state-of-the-art few-shot learning methods on classification tasks.

# Summary. An optional shortened abstract.
share: false
feature: true
tags:
  - Few-shot classification
  - Graph convolution network
  - Self-guided information


links: 
- name: "Link"
  url: "https://www.sciencedirect.com/science/article/abs/pii/S0031320323001681"
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

