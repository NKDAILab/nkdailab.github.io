# 南方科技大学人工智能实验室网站

本项目直接使用本地 `../scholar-lite` 的原页面、布局及成员/论文组件，以 Astro 构建。中文为 `/`，英文为 `/en/`。模板原仓库保持不变。

## 环境与运行

需要 Git 和 Node.js 22.19 以上版本，推荐使用 `.nvmrc` 中的 22.23.4。

本工作区已经在 `../.tools/node-v22.23.4-linux-x64/` 安装 Node.js，并安装好了项目依赖。当前终端不必修改系统环境变量，可以直接运行：

```bash
cd ~/labmainPage/nkdailab.github.io
./scripts/site.sh dev
```

浏览 `http://127.0.0.1:4321/`，英文版为 `http://127.0.0.1:4321/en/`。如果端口被占用，以终端输出为准。

安装了系统 Node.js 或使用 `nvm use` 后，也可以使用标准命令：

```bash
npm ci
npm run dev
```

检查并构建完整网站及搜索索引：

```bash
./scripts/site.sh check
./scripts/site.sh build
./scripts/site.sh verify
./scripts/site.sh preview
```

生产预览通常位于 `http://127.0.0.1:4321/`。全文搜索使用 Pagefind，需要先构建，再通过 `preview` 体验。

`info/intro.docx` 说明的是旧 Hugo 开发流程，包含 Windows 专用的 Chocolatey 安装方式。当前仓库只有其生成后的 HTML，没有 `content/en`、`content/zh` 或 Hugo 配置，无法按说明重建 Hugo 原站。改版采用指定的 Astro 模板，因此使用 Node.js，无须另外安装 Hugo、Dart Sass 或 Chocolatey。系统已有 Git 和 Go。

## 内容维护

主要内容在以下文件，修改时同步维护 `zh` 和 `en` 字段：

| 文件 | 用途 |
| --- | --- |
| `src/data/site.json` | 成员、论文、专利、研究方向、照片集与新闻 |
| `src/config.ts` | 实验室名称、联系邮箱、地址、首页图片 |
| `src/templates/` | 从 Scholar-Lite 原页面接入的首页、成员、论文、研究、新闻等模板 |
| `src/components/`、`src/layouts/` | 原模板的导航、成员卡片、论文条目及页面布局 |
| `src/lib/template.ts` | 将已审核的资料接入原模板的数据适配器 |
| `src/i18n/ui.ts` | 中英文界面文字，包括 Cite / 引用、Paper source / 论文来源 |
| `src/lib/publication-url.ts` | 清除论文链接的追踪参数，保留 OpenReview 等来源所需的标识参数 |
| `src/lib/site.ts` | 中英文字段、分组及兼容旧网址的路由 |
| `src/styles/global.css` | 与原模板逐字一致的全局样式 |
| `src/styles/content.css` | 导入正文的段落、列表、图片可读性样式 |
| `src/data/template-origin.json` | 原模板提交、文件对应关系与原始校验和 |
| `public/citations/` | 从旧站保留的五份 BibTeX 引用文件 |
| `public/patents/` | 12 份实际授权证书，文件与提供材料校验和一致 |
| `src/components/EmailContact.astro` | 个人页邮箱标签，复用 Outlook 与复制回退 |
| `src/components/SendEmail.astro` | 全站邮箱的 Outlook 网页版入口及复制回退，保留按钮、标签、文字和图标样式 |
| `src/templates/Gallery.astro` | 真实实验室照片集，中英文页面 |
| `public/images/team/` | 本次新增成员的原始照片 |
| `src/data/incoming-members.json` | 本次 Word 材料的人工核对记录 |
| `src/data/alumni-updates.json` | 本次提供的九位离站成员变更记录 |
| `src/data/migration-audit.json` | 迁移数量、材料排查说明与公司名称来源 |
| `docs/publication-review.json` | 新论文清单逐条对应、元数据依据与年份核对记录，不进入网页 |
| `docs/publication-link-check.md`、`.json` | 逐链接的实际访问结果，不进入网页 |
| `docs/materials-update-review.md`、`.json` | 新压缩包、专利统计与网站建议的核对及处理记录，不进入网页 |

全站邮箱入口共用 `src/components/SendEmail.astro`：成员卡片的邮件图标、邮箱文字及个人页邮箱标签均在新标签页打开 Outlook 网页版，预填对应成员邮箱；“加入我们”使用 `src/config.ts` 的 `SITE.email` 并额外预填申请主题。新标签被拦截或打开操作报错时自动尝试复制邮箱。复制成功仅显示两秒的小提示（中文“复制成功”，英文“Copied successfully”），邮箱和按钮文字保持原样，不展示 Outlook 打开失败说明；复制受限则显示可选中的邮箱及中性手动复制提示。同一成员卡片的两个入口共用状态，并可相互接续重试。

`site.json` 是日常维护的内容来源。修改后运行检查、构建和验证即可，不需要重新导入 Word。

本次数据整理：

- 从旧成员总览导入 40 位成员，论文合作者不计入实验室成员。
- 根据各自 Word 材料新增孙杨洋、练家琪、吕子轩、裘成虎、黄子豪、周子善六位 2026 级硕士。
- 根据 `../info/岳东旭.docx` 新增岳东旭（Dongxu Yue），标签为“2025级清华大学联培博士”。中英文简介保留袁春教授、何志海教授的指导关系，补入两段教育经历、四个研究方向、邮箱和原始照片，并关联已收录的 OmniPortrait 论文。工作、荣誉、活动和项目栏中的模板例子全部排除。
- 陈冠霖归入本科生，按用户最新补充标为 2024 级，教育经历同步起始年份。
- 朱旨函按 `../info/网页个人页模板朱旨函(1).docx` 更新邮箱、个人主页及生成式模型、多模态学习、大语言模型智能体三个研究方向，中英文同步；保留 2023 级本科生身份、原有已核实奖学金记录与原图。新文档照片与现有头像逐字节一致，未重复复制；空栏目与填写提示未导入。
- 根据 `../info/本科生(1).rar` 新增单国羿、张玮祎、张陈亦可、陶柏睿四位本科生。只整理格式或用同一文档中明确的信息补全片段，奖项级别、年份、活动职务和院系不改写。英文姓名按现有成员的拼音格式（名在前、姓在后）显示为 Guoyi Shan、Weiyi Zhang、Chenyike Zhang、Bairui Tao；其余内容忠实翻译。逐条核对见 [undergraduate-materials-review.json](docs/undergraduate-materials-review.json)。
- 根据 `../info/石毅东网页(1).docx` 新增石毅东（Yidong Shi），按文档中的 2023 年入学时间归入本科生。保留原英文姓名、简介、三项研究方向、教育经历、邮箱、2023–2024 年度优秀学生三等奖学金与原始照片，中文忠实翻译；不补入未提供的具体专业、毕业年份或主页链接。照片上传提示已省略，空栏目隐藏。逐条来源和原图校验和见 [yidong-shi-materials-review.json](docs/yidong-shi-materials-review.json)。
- 刘启凡、刘思怡、刘紫琼、尚阳星、刘夕媛、钱伟烨、王一嘉、徐婧珺、范昕华移入统一的“毕业与离站成员”栏目，并补充去向。
- 尚阳星标记“已结业”，刘启凡标记“已出站”，其余本次变更按提供的信息标记“已毕业”。未虚构毕业或出站年份。
- 原有毕业生与其已知去向保留；没有提供的去向不作推断。现有 29 位在组成员、24 位毕业及离站成员，共 53 人，其中在读本科生 7 人。
- 初次迁移保留 13 篇论文、3 条新闻、个人研究经历、照片与中英文原文。论文按新压缩包核对后现有 42 篇，原有 13 篇均保留；没有仅因缺少压缩包 PDF 而删除旧论文。
- 周子善与周子皓是不同的人；已依据新补充的 `../info/周子善.docx` 独立加入周子善的中英文卡片、个人页、原始照片和邮箱，标签为“2026级卓越工程师项目硕士”。周子皓原资料保持不变。
- 何志海的头衔和简介、研究方向、在读年级及联培备注、访问学生院系身份均按修改建议同步中英文；导师卡片居中，照片顶部对齐，毕业去向加明确前缀。
- Word 中的空栏目、“暂无”、填写提示、照片提示和毕业去向提示均未作为履历内容导入。标有“例”的职称、荣誉、活动和项目均不作为真实经历。
- 模板虚构的成员、论文、荣誉、项目、活动和示例配图均未进入新站。原模板的页面结构和样式保留，文字、图片和数据替换为实验室资料。

桥介数物的全称已核对为 **桥介数物（深圳）科技有限公司**：参见[公司官网](https://www.bridgedp.com/articles/financing)及[尚阳星个人主页](https://lovethinkinghard.github.io/)。英文页保留其中文注册全称，并使用品牌名 BridgeDP。

## 论文与来源维护

最新论文输入为 `../info/实验室发表文章.rar`，发生冲突时实际论文 PDF 优先，其次采用包内 Word 的明确引文。原先的 `../info/2022-2026年论文清单_完整版(1).docx` 保留为早期核对记录。逐条核对记录见 [publication-review.json](docs/publication-review.json)，访问结果见 [publication-link-check.md](docs/publication-link-check.md)。网页沿用原模板，只展示论文书目信息、原文摘要以及论文来源、PDF 和已有引用下载；代码、项目、视频和核验过程均不展示。

42 篇详情页均展示摘要，不再在摘要后重复完整论文条目。保留原有 15 篇摘要，从提供的 PDF 补入 20 篇，从论文链接页面补入 3 篇；另 4 篇 IEEE 页面访问受限，采用同 DOI、同题名核对的公开索引原文摘要。未使用生成式概述代替摘要，论文来源、PDF 和已有引用按钮保持原链接。逐篇来源与原始文件校验和见 [publication-abstract-review.json](docs/publication-abstract-review.json)。

每篇论文只展示一个主来源：会议论文优先使用对应会议的论文展示页或正式论文集条目，未找到时依次使用 arXiv、其他已核实的论文页面；期刊论文优先使用出版社正式条目。PDF 和已有 BibTeX 下载单独保留。官方来源存在但需要访问验证时，仍优先保留其正式页面，并在本地报告中记录访问限制。当前 26 篇使用官方会议页面或论文集、16 篇使用期刊出版社页面，全部具有已核实的正式条目；PDF 下载可保留作者预印本。

出版元数据通过出版社提交的 Crossref 记录交叉核对。年份冲突遵循本次压缩包优先的要求：明确提供早期发表年份的记录使用所给版本年份，不能仅凭清单分组标题改年；只知道年份时不补造月日。实际 IJCNN PDF 为 `RASA: Reliability-Aware Selective Adaptation via Hybrid Reliability Threshold`，已采用其五位作者和专属 IEEE 条目，撤下原清单中误列为 IJCNN 的 Open-World 条目，未将两个不同作品混为同一稿件。旧记录完整留在本地审计，旧详情地址转回论文列表。

每个外部论文链接均已实际请求，并对未确认的响应进行了浏览器复查。HTTP 200 的验证页、空响应和中转跳转页不计作成功打开论文。出版社的访问限制不等于失效链接；能够打开论文落地页也不代表可下载订阅全文。清理链接时去除 `utm_*` 等追踪参数，保留 `id`、`PaperNum` 等必要参数。

需要重新检查外部链接时，使用安装了 `requests` 的 Python 环境运行：

```bash
python3 scripts/check-publication-links.py --output /tmp/publication-link-check.json
```

该命令执行带重定向的 GET 请求并检查 PDF 文件标识和常见验证页，输出本次 HTTP 结果，不修改网站数据。外链检查按需执行，不放入 CI，以免出版社临时限流阻断发布；浏览器复查记录保存在本次本地报告中。

## 专利与照片维护

专利列表仅展示 `专利统计.xlsx` 的 **NKD 工作表中且有本次授权证书的 12 项记录**。中文状态逐字使用 I 列原文“维持”；英文对应显示 `In force`，采用 WIPO 的专利用语，原始数据保持不变。KYYS 工作表及没有证书的记录不进入专利列表。12 份证书与对应统计逐字段一致。卡片同时标明专利权人/申请人、发明人、申请日及已知授权公告日。

按最新要求，科研成果页面已移除软件著作权栏目、导航及两项展示数据。原始表格核对记录仅保存在本地审计文件。4 项商标也只留审计记录，不计入发明专利。仅序号空行和 `/` 占位值未导入。

相册以 `../info/相册2.0.rar` 中用户已压缩的 53 张照片为当前来源，保留原有合影，共 54 张。包内照片按原文件直接保存到 `public/images/gallery/`，网站不进行二次压缩、缩放或转码；中英文共用同一文件，保持原顺序和照片标识。53 张包内图片共 54,374,443 字节（约 51.9 MiB），对应旧大图已从发布资源目录移除。逐张包内路径、新旧文件关系和 SHA-256 见 [gallery-import-review.json](docs/gallery-import-review.json)。建议文档的六张标注截图未作为照片使用。

相册滚动接近底部时自动追加 6 张照片，无需点击加载按钮；尚未显示的图片不会预先设置图片地址。桌面和平板使用双列瀑布流，图片保持原比例，两列各自排列；手机使用单列。相册图片不显示下方说明栏，原说明保留为图片和链接的无障碍描述。追加照片不会重新平衡已显示的两列，窗口宽度改变时自动重新排版。关闭 JavaScript 时提供其余图片的直接链接。首页保留一张合影预览和相册入口。新增照片时，在 `site.json.gallery` 中填写 `image` 和 `original` 为同一个 `/images/gallery/...jpg` 路径，以及图片显示宽高和中英文说明；文件放入 `public/images/gallery/`。原有 `src/assets/` 图片仍支持 Astro 图片组件。

## 旧资料与网址

仓库原有根目录下的 `author/`、`people/`、`publication/`、`post/`、`en/`、`zh/` 等文件是旧 Hugo 生成结果，保留用于核对。Astro 只从 `src/` 和 `public/` 构建，不会把这些旧页面作为新站发布。请勿继续通过直接编辑旧 HTML 维护新站。

旧成员页 `/author/姓名/`、旧 `/people/`、`/event/`、`/publication/`、`/post/`、`/authors/page/1/` 以及相应中英文地址会转到新页面。论文合作者的旧作者地址保留相关论文列表，不作为成员显示。

首页、论文、新闻与成员旧作者地址下的 `index.xml` 会生成新的 RSS 内容，成员 RSS 同步当前状态和去向。

`scripts/migrate-legacy.py` 是本次迁移的可重现导入工具，依赖 `beautifulsoup4`，输入为保留的旧 HTML、本目录下的两份变更记录和 `../info/` 中的个人 Word 文档。**再次运行会重写 `site.json`，请先保存日常维护中的修改。** 正常构建不运行该脚本，不依赖 Python 或 Word 文件，也不会复制 `intro.docx` 中的账号信息。

## GitHub Pages

`.github/workflows/pages.yml` 已配置检查、构建、内容及链接验证和 GitHub Pages 发布，发布目录为 `dist/`。

需要在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。当前工作流监听 `main-v2`，推送到该分支或手动触发 workflow 即可发布；`github-pages` 环境的分支保护规则也需允许 `main-v2`。本次仅完成本地改版与验证，没有提交、推送或修改远端配置。

发布流程参考 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

模板代码遵循仓库 `LICENSE` 中的 MIT 许可；原实验室内容及图片保留原有权利归属。

## 原模板与必要适配

`src/templates/Home.astro` 来自原模板 `src/pages/index.astro`；`Team.astro`、`Member.astro`、`Publications.astro` 等保留对应原页面的布局及 Tailwind 类。`Header.astro`、`TeamCard.astro`、`PublicationItem.astro` 和 `Layout.astro` 直接以原组件为基础接入数据。详细文件对应与源提交见 `src/data/template-origin.json`，`src/styles/global.css` 与原模板完全一致。

必要适配包括：按网址在服务器渲染中英文正文与界面；访问学生分组；毕业、结业、出站成员仍使用原成员卡片，照片与姓名均可点击，详情页显示状态与去向；英文论文按钮显示 `Cite`、`Paper source`，中文显示“引用”“论文来源”。引用按钮下载原站实际存在的 BibTeX 文件，不再跳回论文页面。

新站只使用已核实的资料。没有单独结构化资料的著作、荣誉栏目保留原模板空状态，相关个人记录和原研究介绍仍保留。

## 本次验证

- Astro 类型检查无错误或警告；生产构建及 Pagefind 中英文索引生成成功。
- 当前构建自动校验 991 个 HTML 页面、42 篇论文及新压缩包覆盖、本地链接、图片、24 位毕业与离站成员的照片及姓名入口、双语论文来源/引用文字、五份原始 BibTeX 文件，以及旧作者 RSS；502 个 XML 文件均解析成功。
- Chromium 实际检查 18 个桌面页面与 11 个手机页面，以及平板宽度；中英文全文搜索、语言切换、移动导航、毕业及出站个人页、引用文件下载和旧链接跳转均通过，无页面异常或资源请求失败。
- 此前更新另行验证中英文 47 位成员、42 篇论文、12 项 NKD 专利、全部 12 份证书下载、邮箱链接与 Scholar 姓名文字、RASA 检索、照片集及平板/手机导航；软件著作权栏目已移除，核验说明不进入网页。

- 2026-11-11 新增石毅东后，当前 53 位成员（29 位在组、24 位毕业及离站，含 7 位在读本科生）的构建与全站校验通过；110 项简历检查通过。新成员中英文卡片、年级排序、教育经历／研究方向／个人荣誉顺序、原图 SHA-256、邮箱收件人、作者别名、两份 Pagefind 索引片段和六份作者 RSS 已核对，详见 [yidong-shi-materials-review.json](docs/yidong-shi-materials-review.json)。
