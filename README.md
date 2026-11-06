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
| `src/data/site.json` | 网站实际读取的成员、论文、新闻和原研究介绍 |
| `src/config.ts` | 实验室名称、联系邮箱、地址、首页图片 |
| `src/templates/` | 从 Scholar-Lite 原页面接入的首页、成员、论文、研究、新闻等模板 |
| `src/components/`、`src/layouts/` | 原模板的导航、成员卡片、论文条目及页面布局 |
| `src/lib/template.ts` | 将已审核的资料接入原模板的数据适配器 |
| `src/i18n/ui.ts` | 中英文界面文字，包括 Cite / 引用、Video / 视频 |
| `src/lib/site.ts` | 中英文字段、分组及兼容旧网址的路由 |
| `src/styles/global.css` | 与原模板逐字一致的全局样式 |
| `src/styles/content.css` | 导入正文的段落、列表、图片可读性样式 |
| `src/data/template-origin.json` | 原模板提交、文件对应关系与原始校验和 |
| `public/citations/` | 从旧站保留的五份 BibTeX 引用文件 |
| `public/images/team/` | 本次新增成员的原始照片 |
| `src/data/incoming-members.json` | 本次 Word 材料的人工核对记录 |
| `src/data/alumni-updates.json` | 本次提供的九位离站成员变更记录 |
| `src/data/migration-audit.json` | 迁移数量、材料排查说明与公司名称来源 |

`site.json` 是日常维护的内容来源。修改后运行检查、构建和验证即可，不需要重新导入 Word。

本次数据整理：

- 从旧成员总览导入 40 位成员，论文合作者不计入实验室成员。
- 新增孙杨洋、练家琪、吕子轩、裘成虎、黄子豪五位 2026 级硕士。
- 陈冠霖的材料写明本科在读，且已由用户确认，因此归入本科生；未推断其入学年份。
- 刘启凡、刘思怡、刘紫琼、尚阳星、刘夕媛、钱伟烨、王一嘉、徐婧珺、范昕华移入统一的“毕业与离站成员”栏目，并补充去向。
- 尚阳星标记“已结业”，刘启凡标记“已出站”，其余本次变更按提供的信息标记“已毕业”。未虚构毕业或出站年份。
- 原有毕业生与其已知去向保留；没有提供的去向不作推断。现有 22 位在组成员、24 位毕业及离站成员，共 46 人。
- 保留 13 篇论文、3 条新闻、个人研究经历、照片与中英文原文。旧研究简介中与实际名册不一致的固定人数已去除。
- Word 中的空栏目、“暂无”、填写提示、照片提示和毕业去向提示均未作为履历内容导入。未发现需要当作真实履历保留的示例段落。
- 模板虚构的成员、论文、荣誉、项目、活动和示例配图均未进入新站。原模板的页面结构和样式保留，文字、图片和数据替换为实验室资料。

桥介数物的全称已核对为 **桥介数物（深圳）科技有限公司**：参见[公司官网](https://www.bridgedp.com/articles/financing)及[尚阳星个人主页](https://lovethinkinghard.github.io/)。英文页保留其中文注册全称，并使用品牌名 BridgeDP。

## 旧资料与网址

仓库原有根目录下的 `author/`、`people/`、`publication/`、`post/`、`en/`、`zh/` 等文件是旧 Hugo 生成结果，保留用于核对。Astro 只从 `src/` 和 `public/` 构建，不会把这些旧页面作为新站发布。请勿继续通过直接编辑旧 HTML 维护新站。

旧成员页 `/author/姓名/`、旧 `/people/`、`/event/`、`/publication/`、`/post/`、`/authors/page/1/` 以及相应中英文地址会转到新页面。论文合作者的旧作者地址保留相关论文列表，不作为成员显示。

首页、论文、新闻与成员旧作者地址下的 `index.xml` 会生成新的 RSS 内容，成员 RSS 同步当前状态和去向。

`scripts/migrate-legacy.py` 是本次迁移的可重现导入工具，依赖 `beautifulsoup4`，输入为保留的旧 HTML、本目录下的两份变更记录和 `../info/` 中的个人 Word 文档。**再次运行会重写 `site.json`，请先保存日常维护中的修改。** 正常构建不运行该脚本，不依赖 Python 或 Word 文件，也不会复制 `intro.docx` 中的账号信息。

## GitHub Pages

`.github/workflows/pages.yml` 已配置检查、构建、内容及链接验证和 GitHub Pages 发布，发布目录为 `dist/`。

需要在 GitHub 仓库的 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**。之后推送到 `main` 或手动触发 workflow 即可发布。本次仅完成本地改版与验证，没有提交、推送或修改远端配置。

发布流程参考 [GitHub Pages 官方文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)。

模板代码遵循仓库 `LICENSE` 中的 MIT 许可；原实验室内容及图片保留原有权利归属。

## 原模板与必要适配

`src/templates/Home.astro` 来自原模板 `src/pages/index.astro`；`Team.astro`、`Member.astro`、`Publications.astro` 等保留对应原页面的布局及 Tailwind 类。`Header.astro`、`TeamCard.astro`、`PublicationItem.astro` 和 `Layout.astro` 直接以原组件为基础接入数据。详细文件对应与源提交见 `src/data/template-origin.json`，`src/styles/global.css` 与原模板完全一致。

必要适配包括：按网址在服务器渲染中英文正文与界面；访问学生分组；毕业、结业、出站成员仍使用原成员卡片，照片与姓名均可点击，详情页显示状态与去向；英文论文按钮显示 `Cite`、`Video`，中文显示“引用”“视频”。引用按钮下载原站实际存在的 BibTeX 文件，不再跳回论文页面。

新站只使用已核实的资料。没有单独结构化资料的著作、软著、专利、荣誉栏目保留原模板空状态，相关个人记录和原研究介绍仍保留。

## 本次验证

- Astro 类型检查无错误或警告；生产构建及 Pagefind 中英文索引生成成功。
- 自动校验 616 个 HTML 页面、本地链接、图片、24 位毕业与离站成员的照片及姓名入口、双语引用/视频文字、五份原始 BibTeX 文件，以及旧作者 RSS；331 个 XML 文件均解析成功。
- Chromium 实际检查 18 个桌面页面与 11 个手机页面，以及平板宽度；中英文全文搜索、语言切换、移动导航、毕业及出站个人页、引用文件下载和旧链接跳转均通过，无页面异常或资源请求失败。
