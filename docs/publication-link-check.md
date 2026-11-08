# 论文来源与链接核验（本地记录）

本文件用于维护，不导入网页，不复制到 `dist/`。网页仅显示论文书目信息、已有资料提供的摘要、来源、PDF 与已有引用下载。

## 本次依据与冲突处理

最新依据为 `../info/实验室发表文章.rar`。按用户要求，发生冲突时采用包内实际论文 PDF，其次采用包内 Word 的明确引文；清单分组标题与文件名不能代替论文正文证据。

压缩包有 36 份 PDF，即 35 篇正文及 1 份 ACCV 补充材料。33 篇与原记录对应，另有 RASA 和一篇医学多模态期刊论文。以实际 PDF 替换误列的 IJCNN 条目后，当前为 **42 篇论文**；未仅因某篇没有包内 PDF 而删除原有论文，初次迁移的 13 篇全部保留。

关键更正：包内 Word 仍写旧的 Open-World，但实际 IJCNN PDF 为 **RASA: Reliability-Aware Selective Adaptation via Hybrid Reliability Threshold**，五位作者包括 Yijia Wang。已使用 RASA 自己的 IEEE 条目 `11729341` 与 DOI `10.1109/IJCNN69854.2026.11729341`，删除错误关联的 arXiv `2511.12607`。未声称二者是同一版本；旧条目完整保存在审计中，旧详情地址回到论文列表。

另新增 **Enhancing visual and semantic alignment of multimodal large models in medical images**，The Journal of Supercomputing (2025)，DOI `10.1007/s11227-025-07859-7`。

VCT、Unsupervised Action Recognition、Jointly-learnt networks、Contrastive Bayesian Analysis 按包内所给早期年份分别记为 2024、2024、2022、2022；只有年份时不补造月日。WACV 采用正文明确的 2024，Deeply-conditioned 与 Audio-Driven 采用正文/引文明确的 2026，未按清单分组错改年份。AAAI Conditional Latent Coding 的文件名保留旧草稿措辞，正文题名与原记录相符，未据文件名另造论文。

完整材料对照见 [materials-update-review.json](materials-update-review.json)，逐篇元数据及历史记录见 [publication-review.json](publication-review.json)。

## 主来源优先级

1. 对应会议的论文展示页或正式论文集条目；期刊使用出版社正式条目。
2. 找不到正式条目时再使用作者 arXiv 摘要页。
3. 两者均没有时，才使用其他经过核实的论文页面。

当前 **26 篇使用官方会议页/论文集，16 篇使用期刊出版社**，无 arXiv 或其他网站主来源。每篇只显示一个主来源，PDF 与已有 BibTeX 下载独立保留。正式条目身份和实时访问情况分开记录；遇访问验证时不会假称成功打开。BMVC 官方展示页本次连接失败，其 PDF 下载保留可访问的作者 arXiv 文件。

## 逐篇首选来源

| 编号 | 题名 / 首选来源 | 来源类型 | 当前年份 | 会议或期刊 |
| --- | --- | --- | --- | --- |
| 1 | [OmniCVR: A benchmark for omni-composed video retrieval with vision, audio, and text](https://proceedings.iclr.cc/paper_files/paper/2026/hash/b6c0e8e7cc029eed4253e3fda4ea958f-Abstract-Conference.html) | 官方会议页/论文集 | 2026 | International Conference on Learning Representations (ICLR 2026) |
| 2 | [OmniPortrait: Fine-Grained Personalized Portrait Synthesis via Pivotal Optimization](https://proceedings.iclr.cc/paper_files/paper/2026/hash/64f4014a46a58a23bcfd9988e8204a12-Abstract-Conference.html) | 官方会议页/论文集 | 2026 | International Conference on Learning Representations (ICLR 2026) |
| 3 | [Training-Free Dual Hyperbolic Adapters for Better Cross-Modal Reasoning](https://doi.org/10.1109/TMM.2026.3664982) | 期刊出版社 | 2026 | IEEE Transactions on Multimedia |
| 4 | [RASA: Reliability-Aware Selective Adaptation via Hybrid Reliability Threshold](https://ieeexplore.ieee.org/document/11729341) | 官方会议页/论文集 | 2026 | International Joint Conference on Neural Networks (IJCNN 2026) |
| 5 | [CausalLens: Sensitivity-Guided Multi-Head Causal Intervention for Hallucination Mitigation in Large Vision-Language Models](https://openaccess.thecvf.com/content/CVPR2026/html/Ji_CausalLens_Sensitivity-Guided_Multi-Head_Causal_Intervention_for_Hallucination_Mitigation_in_Large_CVPR_2026_paper.html) | 官方会议页/论文集 | 2026 | IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR 2026) |
| 6 | [Controllable Generative Reference for Stereo Image Compression via Reliability-Aware Gating](https://eccv.ecva.net/virtual/2026/poster/5305) | 官方会议页/论文集 | 2026 | European Conference on Computer Vision (ECCV 2026) |
| 7 | [Cross-Modal Few-Shot Learning with Second-Order Neural Ordinary Differential Equations](https://ojs.aaai.org/index.php/AAAI/article/view/33118) | 官方会议页/论文集 | 2025 | AAAI 2025 |
| 8 | [Conditional Latent Coding with Learnable Synthesized Reference for Deep Image Compression](https://ojs.aaai.org/index.php/AAAI/article/view/33403) | 官方会议页/论文集 | 2025 | AAAI 2025 |
| 9 | [Open-Vocabulary Multi-Label Classification Based on Cross-Modal Feature Reconstruction Learning](https://ieeexplore.ieee.org/document/11192886/) | 官方会议页/论文集 | 2025 | CCRIS 2025 |
| 10 | [LatentEdit: Adaptive Latent Control for Consistent Semantic Editing](https://link.springer.com/chapter/10.1007/978-981-95-5679-3_7) | 官方会议页/论文集 | 2025 | PRCV 2025 |
| 11 | [Deeply-conditioned image compression via self-generated priors](https://www.sciencedirect.com/science/article/pii/S0925231225031005) | 期刊出版社 | 2026 | Neurocomputing |
| 12 | [Audio-Driven Multi-Modal Unobtrusive Health Monitoring and Inference for Smart Eldercare at Home](https://ieeexplore.ieee.org/document/11339893/) | 期刊出版社 | 2026 | IEEE Journal of Biomedical and Health Informatics |
| 13 | [Concept-Guided Prompt Learning for Generalization in Vision-Language Models](https://ojs.aaai.org/index.php/AAAI/article/view/28568) | 官方会议页/论文集 | 2024 | AAAI 2024 |
| 14 | [Cross-Constrained Progressive Inference for 3D Hand Pose Estimation with Dynamic Observer-Decision-Adjuster Networks](https://ojs.aaai.org/index.php/AAAI/article/view/28048) | 官方会议页/论文集 | 2024 | AAAI 2024 |
| 15 | [Cross-modal concept learning and inference for vision-language models](https://www.sciencedirect.com/science/article/pii/S0925231224003011) | 期刊出版社 | 2024 | Neurocomputing |
| 16 | [Learning Inference-Time Drift Sensor-Actuator for Domain Generalization](https://cmsworkshops.com/ICASSP2024/view_paper.php?PaperNum=1438) | 官方会议页/论文集 | 2024 | ICASSP 2024 |
| 17 | [Full-coverage unobtrusive health monitoring of elders at homes](https://www.sciencedirect.com/science/article/pii/S2542660524001239) | 期刊出版社 | 2024 | Internet of Things |
| 18 | [Learning Visual Conditioning Tokens to Correct Domain Shift for Fully Test-time Adaptation](https://ieeexplore.ieee.org/document/10636806/) | 期刊出版社 | 2024 | IEEE Transactions on Multimedia |
| 19 | [Conceptual Codebook Learning for Vision-Language Models](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/9905_ECCV_2024_paper.php) | 官方会议页/论文集 | 2024 | European Conference on Computer Vision (ECCV) |
| 20 | [Dual-Path Adversarial Lifting for Domain Shift Correction in Online Test-time Adaptation](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/8443_ECCV_2024_paper.php) | 官方会议页/论文集 | 2024 | European Conference on Computer Vision (ECCV) |
| 21 | [Training-Free Feature Reconstruction with Sparse Optimization for Vision-Language Models](https://dl.acm.org/doi/10.1145/3664647.3680710) | 官方会议页/论文集 | 2024 | ACM International Conference on Multimedia (ACM MM) |
| 22 | [Domain-Conditioned Transformer for Fully Test-time Adaptation](https://dl.acm.org/doi/10.1145/3664647.3680678) | 官方会议页/论文集 | 2024 | ACM International Conference on Multimedia (ACM MM) |
| 23 | [Window-based Channel Attention for Wavelet-enhanced Learned Image Compression](https://openaccess.thecvf.com/content/ACCV2024/html/Xu_Window-based_Channel_Attention_for_Wavelet-enhanced_Learned_Image_Compression_ACCV_2024_paper.html) | 官方会议页/论文集 | 2024 | Asian Conference on Computer Vision (ACCV) |
| 24 | [Unsupervised Action Recognition using Spatiotemporal, Adaptive, and Attention-guided Refining-Network](https://doi.org/10.1109/TAI.2024.3430257) | 期刊出版社 | 2024 | IEEE Transactions on Artificial Intelligence |
| 25 | [Hierarchical Spatial-temporal Masked Contrast for skeleton action recognition](https://ieeexplore.ieee.org/document/10601523) | 期刊出版社 | 2024 | IEEE Transactions on Artificial Intelligence |
| 26 | [Neuro-Modulated Hebbian Learning for Fully Test-Time Adaptation](https://openaccess.thecvf.com/content/CVPR2023/html/Tang_Neuro-Modulated_Hebbian_Learning_for_Fully_Test-Time_Adaptation_CVPR_2023_paper.html) | 官方会议页/论文集 | 2023 | IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) |
| 27 | [Self-Correctable and Adaptable Inference for Generalizable Human Pose Estimation](https://openaccess.thecvf.com/content/CVPR2023/html/Kan_Self-Correctable_and_Adaptable_Inference_for_Generalizable_Human_Pose_Estimation_CVPR_2023_paper.html) | 官方会议页/论文集 | 2023 | IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR) |
| 28 | [Cycle optimization metric learning for few-shot classification](https://www.sciencedirect.com/science/article/abs/pii/S0031320323001681) | 期刊出版社 | 2023 | Pattern Recognition |
| 29 | [Unsupervised prototype adapter for vision-language models](https://link.springer.com/chapter/10.1007/978-981-99-8429-9_16) | 官方会议页/论文集 | 2023 | Chinese Conference on Pattern Recognition and Computer Vision (PRCV) |
| 30 | [BDC-Adapter: Brownian Distance Covariance for Better Vision-Language Reasoning](https://proceedings.bmvc2023.org/182/) | 官方会议页/论文集 | 2023 | British Machine Vision Conference (BMVC) |
| 31 | [Cross-inferential networks for source-free unsupervised domain adaptation](https://cmsworkshops.com/ICIP2023/view_paper.php?PaperNum=1125) | 官方会议页/论文集 | 2023 | IEEE International Conference on Image Processing (ICIP) |
| 32 | [Learning to Adapt CLIP for Few-Shot Monocular Depth Estimation](https://openaccess.thecvf.com/content/WACV2024/html/Hu_Learning_To_Adapt_CLIP_for_Few-Shot_Monocular_Depth_Estimation_WACV_2024_paper.html) | 官方会议页/论文集 | 2024 | 2024 IEEE/CVF Winter Conference on Applications of Computer Vision (WACV) |
| 33 | [Critical Sampling for Data-Driven Modeling of Unknown Dynamical Systems](https://openreview.net/forum?id=ILW7Ckfej3) | 官方会议页/论文集 | 2023 | First Workshop on Out-of-Distribution Generalization in Robotics at CoRL 2023 |
| 34 | [Self-guided information for few-shot classification](https://doi.org/10.1016/j.patcog.2022.108880) | 期刊出版社 | 2022 | Pattern Recognition, 131, 108880 |
| 35 | [Self-Constrained Inference Optimization on Structural Groups for Human Pose Estimation](https://www.ecva.net/papers/eccv_2022/papers_ECCV/html/3985_ECCV_2022_paper.php) | 官方会议页/论文集 | 2022 | Computer Vision – ECCV 2022, LNCS 13665, pp. 729–745 |
| 36 | [Jointly-learnt networks for future action anticipation via self-knowledge distillation and cycle consistency](https://doi.org/10.1109/TCSVT.2022.3232021) | 期刊出版社 | 2022 | IEEE Transactions on Circuits and Systems for Video Technology |
| 37 | [Coded residual transform for generalizable deep metric learning](https://papers.neurips.cc/paper_files/paper/2022/hash/b74a8de47d2b3c928360e0a011f48351-Abstract-Conference.html) | 官方会议页/论文集 | 2022 | Advances in Neural Information Processing Systems 35 (NeurIPS 2022), pp. 28601–28615 |
| 38 | [Contrastive bayesian analysis for deep metric learning](https://doi.org/10.1109/TPAMI.2022.3221486) | 期刊出版社 | 2022 | IEEE Transactions on Pattern Analysis and Machine Intelligence |
| 39 | [Geometric machine learning: research and applications](https://link.springer.com/article/10.1007/s11042-022-12683-9) | 期刊出版社 | 2022 | Multimedia Tools and Applications, 81, pp. 30545–30597 |
| 40 | [Local semantic correlation modeling over graph neural networks for deep feature embedding and image retrieval](https://doi.org/10.1109/TIP.2022.3163571) | 期刊出版社 | 2022 | IEEE Transactions on Image Processing, 31, pp. 2988–3003 |
| 41 | [Critical Sampling for Robust Evolution Operator Learning of Unknown Dynamical Systems](https://doi.org/10.1109/TAI.2023.3327676) | 期刊出版社 | 2024 | IEEE Transactions on Artificial Intelligence, 5(6), pp. 2856–2871 |
| 42 | [Enhancing visual and semantic alignment of multimodal large models in medical images](https://link.springer.com/article/10.1007/s11227-025-07859-7) | 期刊出版社 | 2025 | The Journal of Supercomputing, 81, article 1374 |

## 当前链接的实际访问结果

本次记录合并于（UTC）2026-11-07T09:01:44+00:00，浏览器复查完成于（UTC）2026-11-07T09:02:05.640Z。未变更的 69 条网址沿用此前实际请求记录，新增/替换的 2 条正式来源重新请求并作浏览器复查；每条时间见 JSON。

当前 **71 条外部论文链接均已尝试**：43 条确认打开，15 条访问验证/受限，12 条未确认论文内容，1 条连接失败。HTTP 直接确认 40 条，另有 3 条由浏览器显示准确题名后确认。当前发布链接未返回明确的 404/410。

确认落地页不等于可读取订阅全文；验证页、空响应和跳转中转页不算论文内容。PDF 请求检查了 `%PDF-` 标识。所有发布链接均去除追踪参数，保留 OpenReview `id`、ICASSP/ICIP `PaperNum` 等必要标识。旧链接请求在 JSON 的 `supersededResults` 中保留，不计入当前总数。

五份本地 BibTeX 下载、12 份原始专利证书另由构建和本地浏览器下载验证，不计入 71 条外部论文链接。

| 论文编号 | 纯净链接 | HTTP | 浏览器复查 | 结果 |
| --- | --- | --- | --- | --- |
| 38 | [来源](https://arxiv.org/pdf/2210.04402) | 206 | HTTP 已确认 | 确认打开 |
| 41 | [来源](https://arxiv.org/pdf/2304.07485) | 206 | HTTP 已确认 | 确认打开 |
| 31 | [来源](https://arxiv.org/pdf/2306.16957) | 206 | HTTP 已确认 | 确认打开 |
| 15 | [来源](https://arxiv.org/pdf/2307.15460) | 206 | HTTP 已确认 | 确认打开 |
| 29 | [来源](https://arxiv.org/pdf/2308.11507) | 206 | HTTP 已确认 | 确认打开 |
| 30 | [来源](https://arxiv.org/pdf/2309.01256) | 206 | HTTP 已确认 | 确认打开 |
| 13 | [来源](https://arxiv.org/pdf/2401.07457) | 206 | HTTP 已确认 | 确认打开 |
| 18 | [来源](https://arxiv.org/pdf/2406.19341) | 206 | HTTP 已确认 | 确认打开 |
| 22 | [来源](https://arxiv.org/pdf/2410.10442) | 206 | HTTP 已确认 | 确认打开 |
| 7 | [来源](https://arxiv.org/pdf/2412.15813) | 206 | HTTP 已确认 | 确认打开 |
| 8 | [来源](https://arxiv.org/pdf/2502.09971) | 206 | HTTP 已确认 | 确认打开 |
| 10 | [来源](https://arxiv.org/pdf/2509.00541) | 206 | HTTP 已确认 | 确认打开 |
| 11 | [来源](https://arxiv.org/pdf/2510.24437) | 206 | HTTP 已确认 | 确认打开 |
| 3 | [来源](https://arxiv.org/pdf/2512.08820) | 206 | HTTP 已确认 | 确认打开 |
| 16 | [来源](https://cmsworkshops.com/ICASSP2024/view_paper.php?PaperNum=1438) | 200 | HTTP 已确认 | 确认打开 |
| 31 | [来源](https://cmsworkshops.com/ICIP2023/view_paper.php?PaperNum=1125) | 200 | HTTP 已确认 | 确认打开 |
| 22 | [来源](https://dl.acm.org/doi/10.1145/3664647.3680678) | 403 | 访问验证/受限 | 访问验证/受限 |
| 21 | [来源](https://dl.acm.org/doi/10.1145/3664647.3680710) | 403 | 访问验证/受限 | 访问验证/受限 |
| 34 | [来源](https://doi.org/10.1016/j.patcog.2022.108880) | 200 | 未确认论文内容 | 未确认论文内容 |
| 41 | [来源](https://doi.org/10.1109/TAI.2023.3327676) | 202 | 未确认论文内容 | 未确认论文内容 |
| 24 | [来源](https://doi.org/10.1109/TAI.2024.3430257) | 202 | 未确认论文内容 | 未确认论文内容 |
| 36 | [来源](https://doi.org/10.1109/TCSVT.2022.3232021) | 202 | 未确认论文内容 | 未确认论文内容 |
| 40 | [来源](https://doi.org/10.1109/TIP.2022.3163571) | 202 | 未确认论文内容 | 未确认论文内容 |
| 3 | [来源](https://doi.org/10.1109/TMM.2026.3664982) | 202 | 未确认论文内容 | 未确认论文内容 |
| 38 | [来源](https://doi.org/10.1109/TPAMI.2022.3221486) | 202 | 未确认论文内容 | 未确认论文内容 |
| 6 | [来源](https://eccv.ecva.net/virtual/2026/poster/5305) | 200 | HTTP 已确认 | 确认打开 |
| 25 | [来源](https://ieeexplore.ieee.org/document/10601523) | 202 | 未确认论文内容 | 未确认论文内容 |
| 18 | [来源](https://ieeexplore.ieee.org/document/10636806/) | 202 | 未确认论文内容 | 未确认论文内容 |
| 9 | [来源](https://ieeexplore.ieee.org/document/11192886/) | 202 | 未确认论文内容 | 未确认论文内容 |
| 12 | [来源](https://ieeexplore.ieee.org/document/11339893/) | 202 | 未确认论文内容 | 未确认论文内容 |
| 4 | [来源](https://ieeexplore.ieee.org/document/11729341) | 202 | 未确认论文内容 | 未确认论文内容 |
| 39 | [来源](https://link.springer.com/article/10.1007/s11042-022-12683-9) | 200 | 未确认论文内容 | 访问验证/受限 |
| 42 | [来源](https://link.springer.com/article/10.1007/s11227-025-07859-7) | 200 | 确认打开 | 确认打开 |
| 10 | [来源](https://link.springer.com/chapter/10.1007/978-981-95-5679-3_7) | 200 | 确认打开 | 确认打开 |
| 29 | [来源](https://link.springer.com/chapter/10.1007/978-981-99-8429-9_16) | 200 | 确认打开 | 确认打开 |
| 6 | [来源](https://media.eventhosts.cc/Conferences/ECCV2026/pdfs/9864.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 14 | [来源](https://ojs.aaai.org/index.php/AAAI/article/view/28048) | 200 | 访问验证/受限 | 访问验证/受限 |
| 14 | [来源](https://ojs.aaai.org/index.php/AAAI/article/view/28048/28106) | 200 | 访问验证/受限 | 访问验证/受限 |
| 13 | [来源](https://ojs.aaai.org/index.php/AAAI/article/view/28568) | 200 | 访问验证/受限 | 访问验证/受限 |
| 7 | [来源](https://ojs.aaai.org/index.php/AAAI/article/view/33118) | 200 | 访问验证/受限 | 访问验证/受限 |
| 8 | [来源](https://ojs.aaai.org/index.php/AAAI/article/view/33403) | 200 | 访问验证/受限 | 访问验证/受限 |
| 23 | [来源](https://openaccess.thecvf.com/content/ACCV2024/html/Xu_Window-based_Channel_Attention_for_Wavelet-enhanced_Learned_Image_Compression_ACCV_2024_paper.html) | 206 | HTTP 已确认 | 确认打开 |
| 23 | [来源](https://openaccess.thecvf.com/content/ACCV2024/papers/Xu_Window-based_Channel_Attention_for_Wavelet-enhanced_Learned_Image_Compression_ACCV_2024_paper.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 27 | [来源](https://openaccess.thecvf.com/content/CVPR2023/html/Kan_Self-Correctable_and_Adaptable_Inference_for_Generalizable_Human_Pose_Estimation_CVPR_2023_paper.html) | 206 | HTTP 已确认 | 确认打开 |
| 26 | [来源](https://openaccess.thecvf.com/content/CVPR2023/html/Tang_Neuro-Modulated_Hebbian_Learning_for_Fully_Test-Time_Adaptation_CVPR_2023_paper.html) | 206 | HTTP 已确认 | 确认打开 |
| 27 | [来源](https://openaccess.thecvf.com/content/CVPR2023/papers/Kan_Self-Correctable_and_Adaptable_Inference_for_Generalizable_Human_Pose_Estimation_CVPR_2023_paper.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 26 | [来源](https://openaccess.thecvf.com/content/CVPR2023/papers/Tang_Neuro-Modulated_Hebbian_Learning_for_Fully_Test-Time_Adaptation_CVPR_2023_paper.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 5 | [来源](https://openaccess.thecvf.com/content/CVPR2026/html/Ji_CausalLens_Sensitivity-Guided_Multi-Head_Causal_Intervention_for_Hallucination_Mitigation_in_Large_CVPR_2026_paper.html) | 206 | HTTP 已确认 | 确认打开 |
| 5 | [来源](https://openaccess.thecvf.com/content/CVPR2026/papers/Ji_CausalLens_Sensitivity-Guided_Multi-Head_Causal_Intervention_for_Hallucination_Mitigation_in_Large_CVPR_2026_paper.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 32 | [来源](https://openaccess.thecvf.com/content/WACV2024/html/Hu_Learning_To_Adapt_CLIP_for_Few-Shot_Monocular_Depth_Estimation_WACV_2024_paper.html) | 206 | HTTP 已确认 | 确认打开 |
| 32 | [来源](https://openaccess.thecvf.com/content/WACV2024/papers/Hu_Learning_To_Adapt_CLIP_for_Few-Shot_Monocular_Depth_Estimation_WACV_2024_paper.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 33 | [来源](https://openreview.net/forum?id=ILW7Ckfej3) | 200 | 访问验证/受限 | 访问验证/受限 |
| 33 | [来源](https://openreview.net/pdf?id=ILW7Ckfej3) | 200 | 访问验证/受限 | 访问验证/受限 |
| 21 | [来源](https://openreview.net/pdf?id=bXhz5c12Ee) | 200 | 访问验证/受限 | 访问验证/受限 |
| 37 | [来源](https://papers.neurips.cc/paper_files/paper/2022/file/b74a8de47d2b3c928360e0a011f48351-Paper-Conference.pdf) | 200 | HTTP 已确认 | 确认打开 |
| 37 | [来源](https://papers.neurips.cc/paper_files/paper/2022/hash/b74a8de47d2b3c928360e0a011f48351-Abstract-Conference.html) | 200 | HTTP 已确认 | 确认打开 |
| 30 | [来源](https://proceedings.bmvc2023.org/182/) | 连接失败 | 未确认论文内容 | 连接失败 |
| 2 | [来源](https://proceedings.iclr.cc/paper_files/paper/2026/file/64f4014a46a58a23bcfd9988e8204a12-Paper-Conference.pdf) | 200 | HTTP 已确认 | 确认打开 |
| 1 | [来源](https://proceedings.iclr.cc/paper_files/paper/2026/file/b6c0e8e7cc029eed4253e3fda4ea958f-Paper-Conference.pdf) | 200 | HTTP 已确认 | 确认打开 |
| 2 | [来源](https://proceedings.iclr.cc/paper_files/paper/2026/hash/64f4014a46a58a23bcfd9988e8204a12-Abstract-Conference.html) | 200 | HTTP 已确认 | 确认打开 |
| 1 | [来源](https://proceedings.iclr.cc/paper_files/paper/2026/hash/b6c0e8e7cc029eed4253e3fda4ea958f-Abstract-Conference.html) | 200 | HTTP 已确认 | 确认打开 |
| 35 | [来源](https://www.ecva.net/papers/eccv_2022/papers_ECCV/html/3985_ECCV_2022_paper.php) | 206 | HTTP 已确认 | 确认打开 |
| 35 | [来源](https://www.ecva.net/papers/eccv_2022/papers_ECCV/papers/136650718.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 20 | [来源](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/8443_ECCV_2024_paper.php) | 206 | HTTP 已确认 | 确认打开 |
| 19 | [来源](https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/9905_ECCV_2024_paper.php) | 206 | HTTP 已确认 | 确认打开 |
| 20 | [来源](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/08443.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 19 | [来源](https://www.ecva.net/papers/eccv_2024/papers_ECCV/papers/09905.pdf) | 206 | HTTP 已确认 | 确认打开 |
| 28 | [来源](https://www.sciencedirect.com/science/article/abs/pii/S0031320323001681) | 403 | 未确认论文内容 | 访问验证/受限 |
| 15 | [来源](https://www.sciencedirect.com/science/article/pii/S0925231224003011) | 403 | 未确认论文内容 | 访问验证/受限 |
| 11 | [来源](https://www.sciencedirect.com/science/article/pii/S0925231225031005) | 403 | 未确认论文内容 | 访问验证/受限 |
| 17 | [来源](https://www.sciencedirect.com/science/article/pii/S2542660524001239) | 403 | 未确认论文内容 | 访问验证/受限 |

## 站点验证

Astro 检查、生产构建与站点验证通过，当前 931 个 HTML 和 463 个 XML；双语论文、46 位成员、12 项 NKD 专利、全部 12 份证书下载、2 项软著、邮箱链接与 Scholar 姓名文字、RASA 搜索、照片集及响应式导航均检查。原模板全局样式保持不变，核验资料不进入网页。未提交、未推送。
