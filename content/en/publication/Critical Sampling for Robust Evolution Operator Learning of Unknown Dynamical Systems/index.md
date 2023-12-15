---
title: 'Critical Sampling for Robust Evolution Operator Learning of Unknown Dynamical Systems'
authors:
  - Ce Zhang
  - Kailiang Wu
  - Zhihai He
author_notes:
  - ''
  - ''
date: '2023-4-15T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-04-15T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['2']

# Publication name and optional abbreviated publication name.
publication: 'IEEE Transactions on Artificial Intelligence'
publication_short: 'IEEE TAI'

abstract: Given an unknown dynamical system, what is the minimum number of samples needed for effective learning of its governing laws and accurate prediction of its future evolution behavior, and how to select these critical samples? In this work, we propose to explore this problem based on a design approach. Starting from a small initial set of samples, we adaptively discover critical samples to achieve increasingly accurate learning of the system evolution. One central challenge here is that we do not know the network modeling error since the ground-truth system state is unknown, which is however needed for critical sampling. To address this challenge, we introduce a multi-step reciprocal prediction network where forward and backward evolution networks are designed to learn the temporal evolution behavior in the forward and backward time directions, respectively. Very interestingly, we find that the desired network modeling error is highly correlated with the multi-step reciprocal prediction error, which can be directly computed from the current system state. This allows us to perform a dynamic selection of critical samples from regions with high network modeling errors for dynamical systems. Additionally, a joint spatial-temporal evolution network is introduced which incorporates spatial dynamics modeling into the temporal evolution prediction for robust learning of the system evolution operator with few samples. Our extensive experimental results demonstrate that our proposed method is able to dramatically reduce the number of samples needed for effective learning and accurate prediction of evolution behaviors of unknown dynamical systems by up to hundreds of times.

# Summary. An optional shortened abstract.
share: false
feature: true



links: 
# - name: "Link"
#   url: ""
url_pdf: https://arxiv.org/pdf/2304.07485.pdf
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

