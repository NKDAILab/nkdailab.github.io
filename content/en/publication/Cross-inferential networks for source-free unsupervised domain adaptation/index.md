---
title: 'Cross-inferential networks for source-free unsupervised domain adaptation'
authors:
  - Yushun Tang
  - Qinghai Guo
  - Zhihai He

date: '2023-10-08T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-10-08T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *IEEE International Conference on Image Processing*
publication_short: In *ICIP*

abstract: One central challenge in source-free unsupervised domain adaptation (UDA) is the lack of an effective approach to evaluate the prediction results of the adapted network model in the target domain. To address this challenge, we propose to explore a new method called cross-inferential networks (CIN). Our main idea is that, when we adapt the network model to predict the sample labels from encoded features, we use these prediction results to construct new training samples with derived labels to learn a new examiner network that performs a different but compatible task in the target domain. Specifically, in this work, the base network model is performing image classification while the examiner network is tasked to perform relative ordering of triplets of samples whose training labels are carefully constructed from the prediction results of the base network model. Two similarity measures, cross-network correlation matrix similarity and attention consistency, are then developed to provide important guidance for the UDA process. Our experimental results on benchmark datasets demonstrate that our proposed CIN approach can significantly improve the performance of source-free UDA.


# # Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

tags:
  - Training
  - Adaptation models
  - Correlation
  - Image processing
  - Predictive models
  - Benchmark testing
  - Task analysis

featured: true
share: false
# links:
#   - name: arXiv
#     url: https://arxiv.org/abs/2303.11180
url_pdf: https://arxiv.org/pdf/2306.16957.pdf
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
