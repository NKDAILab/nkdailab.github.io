---
title: 'Critical Sampling for Data-Driven Modeling of Unknown Dynamical Systems'
authors:
  - Ce Zhang
  - Siqi Wu
  - Zhihai He
  - Zhao Joy Sun
# author_notes:
#   - 'Equal contribution'
#   - 'Equal contribution'
date: '2023-11-05T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-11-05T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *Conference on Robot Learning*
publication_short: In *CoRL*

abstract: When a robot is exploring an unknown dynamical system, we often face the following important question:what is the minimum number of samples needed for effective learning of its governing laws and accurate prediction of its future evolution behavior, and how to select these critical samples? In this work, we propose to explore this problem based on a design approach. Starting from a small initial set of samples, we adaptively discover critical samples to achieve increasingly accurate learning of the system evolution. We establish a multi-step reciprocal prediction network where forward and backward evolution networks are designed to learn the temporal evolution behavior in the forward and backward time directions, respectively. Very interestingly, we find that the desired network modeling error is highly correlated with the multi-step reciprocal prediction error, which can be directly computed from the current system state. This allows us to perform a dynamic selection of critical samples from regions with high network modeling errors for dynamical systems. Our extensive experimental results demonstrate that our proposed method is able to dramatically reduce the number of samples needed for effective learning and accurate prediction of evolution behaviors of unknown dynamical systems by up to hundreds of times.


# # Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

# tags:
#   - Source Themes
featured: true
share: false
# links:
#   - name: arXiv
#     url: 
url_pdf: https://openreview.net/pdf?id=ILW7Ckfej3
# url_code: '#'
# url_dataset: '#'
# url_poster: '#'
# url_project: ''
# url_slides: ''
# url_source: '#'
# url_video: '#'

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# image:
#   caption: 'Image credit: [**Unsplash**](https://unsplash.com/photos/pLCdAaMFLTE)'
#   focal_point: ''
#   preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
# projects:
#   - internal-project

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides:
---
<!-- 
{{% callout note %}}
Click the _Cite_ button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}

Supplementary notes can be added here, including [code and math](https://wowchemy.com/docs/content/writing-markdown-latex/). -->
