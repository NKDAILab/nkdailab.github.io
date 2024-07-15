---
title: 'Test-Time Distribution Learning Adapter for Cross-Modal Visual Reasoning'
authors:
  - Yi Zhang
  - Ce Zhang

author_notes:
  - 'Equal contribution'

date: '2024-03-18T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-09-03T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *2024 IEEE International Conference on Acoustics, Speech and Signal Processing*
publication_short: In *ICASSP*

abstract:Vision-Language Pre-Trained (VLP) models, such as CLIP, have demonstrated remarkable effectiveness in learning generic visual representations. Several approaches aim to efficiently adapt VLP models to downstream tasks with limited supervision, aiming to leverage the acquired knowledge from VLP models. However, these methods suffer from either introducing biased representations or requiring high computational complexity, which hinders their effectiveness in fine-tuning the CLIP model. Moreover, when a model is trained on data specific to a particular domain, its ability to generalize to uncharted domains diminishes. In this work, we propose Test-Time Distribution LearNing Adapter (TT-DNA) which directly works during the testing period. Specifically, we estimate Gaussian distributions to model visual features of the few-shot support images to capture the knowledge from the support set. The cosine similarity between query image and the feature distribution of support images is used as the prediction of visual adapter. Subsequently, the visual adapter’s prediction merges with the original CLIP prediction via a residual connection, resulting in the final prediction. Our extensive experimental results on visual reasoning for human object interaction demonstrate that our proposed TT-DNA outperforms existing state-of-the-art methods by large margins.

# # Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

# tags:
#   - Source Themes
featured: true
share: false
links:
url_pdf: https://arxiv.org/pdf/2403.06059
# url_code: '#'
# url_dataset: '#'
# url_poster: '#'
# url_project: ''
# url_slides: ''
# url_source: '#'


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
