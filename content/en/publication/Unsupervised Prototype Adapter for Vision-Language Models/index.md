---
title: 'Unsupervised Prototype Adapter for Vision-Language Models'
authors:
  - Yi Zhang
  - Ce Zhang
  - Xueting Hu
  - Zhihai He

date: '2023-08-22T00:00:00Z'
doi: ''

# Schedule page publish date (NOT publication's date).
publishDate: '2023-08-22T00:00:00Z'

# Publication type.
# Legend: 0 = Uncategorized; 1 = Conference paper; 2 = Journal article;
# 3 = Preprint / Working Paper; 4 = Report; 5 = Book; 6 = Book section;
# 7 = Thesis; 8 = Patent
publication_types: ['1']

# Publication name and optional abbreviated publication name.
publication: In *IEEE/CVF Conference on Computer Vision and Pattern Recognition*
publication_short: In *CVPR*

abstract: Recently, large-scale pre-trained vision-language models (e.g. CLIP and ALIGN) have demonstrated remarkable effectiveness in acquiring transferable visual representations. To leverage the valuable knowledge encoded within these models for downstream tasks, several fine-tuning approaches, including prompt tuning methods and adapter-based methods, have been developed to adapt vision-language models effectively with supervision. However, these methods rely on the availability of annotated samples, which can be labor-intensive and time-consuming to acquire, thus limiting scalability. To address this issue, in this work, we design an unsupervised fine-tuning approach for vision-language models called Unsupervised Prototype Adapter (UP-Adapter). Specifically, for the unannotated target datasets, we leverage the text-image aligning capability of CLIP to automatically select the most confident samples for each class. Utilizing these selected samples, we generate class prototypes, which serve as the initialization for the learnable prototype model. After fine-tuning, the prototype model prediction is combined with the original CLIP's prediction by a residual connection to perform downstream recognition tasks. Our extensive experimental results on image recognition and domain generalization show that the proposed unsupervised method outperforms 8-shot CoOp, 8-shot Tip-Adapter, and also the state-of-the-art UPL method by large margins.


# # Summary. An optional shortened abstract.
# summary: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere tellus ac convallis placerat. Proin tincidunt magna sed ex sollicitudin condimentum.

# tags:
#   - Source Themes
featured: true
share: false
# links:
#   - name: arXiv
#     url: https://arxiv.org/abs/2303.11180
url_pdf: https://arxiv.org/pdf/2308.11507.pdf
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
