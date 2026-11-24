# 循句找歌 · 月亮

入口：`index.html`。桌面与手机实时预览：`previews.html`。直接双击即可打开，也可在本目录执行 `node serve.cjs`，访问 `http://localhost:4173`。无需构建或联网字体。

## 当前交付状态

已从项目内 xinan-caifenglu-20-scans.zip 合并原书70–79、151–160页，共20张完整本地PNG，保存在 assets/book/。首页使用从完整页生成的缩略图，旧参考图缩略图不再引用。素材包附带书影来源和页码核对说明，四张目标页已另作目视核对。

两个书签分别定位74–75、155–156页，两段独立翻阅，不跨段串页。首页布局、翻页、缩放和原有歌曲/音频配置保持。原有标注是空数组，本轮对照扫描件补齐：74页下栏最左两句、75页上栏最右两句；155页下栏共同起句、156页上栏最右三句。不圈邻歌。标注可隐藏，随整图缩放。

三首四句录音已接入，均为用户提供的 AI 谱曲与演唱；PPT未修改，网站未发布。

## 文件

- `index.html`、`styles.css`、`app.js`：首页和同一本阅读器。
- `data.js`：页码、PDF映射、范围、书签、歌句、标注和音频配置。
- `pages.generated.js`：本地PDF导入后补入的图片清单。
- `assets/images/market.jpeg`：PPT第3页市集图。
- `assets/book/`：完整本地扫描页。
- `assets/thumbs/`：首页缩略图；xinan-caifenglu-pXXX.jpg 来自完整扫描页，旧 reference- 文件仅留作对照，已不再引用。
- `assets/audio/`：待放真实音频。
- `tools/import-book.ps1`：从同版PDF提取20张候选书页和轻量缩略图。
- `previews.html`：同一网页的桌面1440×1000、手机390×844实时预览窗口，并非测试截图。

上一版代码保存在项目上一级 `.build/moon-v2/previous/`，不必部署。

## 补齐书页

把同版 NCL-004652747 PDF 放到本地，运行：

```powershell
powershell -ExecutionPolicy Bypass -File tools/import-book.ps1 -Pdf "C:/你的路径/西南采风录.pdf"
```

脚本使用 Poppler；也可用 `-Pdftoppm "C:/路径/pdftoppm.exe"` 指定程序。默认采用用户给定的“PDF页序＝原书印刷页码＋18”映射，所以74→92、75→93、155→173、156→174。**相邻页必须逐张检查纸上页码，不能仅凭偏移认定已核对。** 导入不自动将 `verified` 设为真。

也可以先仅放入四张文件：

```text
assets/book/xinan-caifenglu-p074.png
assets/book/xinan-caifenglu-p075.png
assets/book/xinan-caifenglu-p155.png
assets/book/xinan-caifenglu-p156.png
```

在 `data.js` 后面设置对应页的 `available=true`，把 `thumb` 改成该页缩略图路径，`thumbnailOnly=false`。填入图片 `width`、`height` 以保持比例。核对实际印刷页码后设 `verified=true`。不具备扫描件的页面继续显示缺页说明。

两段选页在 `segments` 中定义；页码不会跨段自动串联。`bookmarks` 指向每首歌的起页。传统竖排使用 `direction:'rtl'`，方向键左为下一页，右为上一页。桌面从左下角向右拖动翻向后页，从右下角向左拖动返回；手机可以横向滑动。

## 歌辞框选

在 `pages[页码].annotations` 内添加数组，例子仅说明格式，不是实际坐标：

```js
{song:'love303',x:0.12,y:0.2,w:0.08,h:0.31,lineIds:['love-second']}
```

坐标均以完整扫描图宽高归一化。逐张对照扫描件，只圈该首歌在这一页出现的竖排文字；分栏时使用多个框，不能圈进邻歌。原页整图与框一起放大。书影上的框由“歌辞标注”开关控制。未核对前保持空数组。

## 三首音频及入口

| 曲目 | 原始文件（保留） | 发布目录中的相对路径 | 实际格式 / 时长 |
| --- | --- | --- | --- |
| 寻郎 · 情歌303 | xunlang-four-lines.mp3 | assets/audio/xunlang.mp3 | MP3 / 25.580秒 |
| 送郎 · 抗日歌谣14 | songlang-dao-zhanchang.mp3 | assets/audio/songlang.mp3 | MP3 / 24.300秒 |
| 替他缝件棉背心 · 抗日歌谣2 | 棉背心MP3.m4a | assets/audio/mianbeixin.m4a | AAC/M4A / 25.728秒 |

素材按用户给定的曲目对应关系接入。没有把M4A改名冒充MP3，没有剪裁原音频。三首均用完整四句播放，不自动播放。统一署名：歌辞据刘兆吉《西南采风录》 · AI 谱曲与演唱。

在 data.js 的 songs 数组中维护 recording.src、label、credit、version。前两首仍为首页对读卡和阅读器的同一曲目；第三首 id 为 huangping2、homeSection 为 huangping，不加入原书页码或书签。首页区块 #huangping 位于两张对读卡下方，部署后链接为 https://你的站点地址/#huangping，可用于PPT第9页。

一个共享 Audio 管理三个入口及阅读器：点播放四句开始，再点暂停；继续播放沿原位置；切换曲目从0开始；播完恢复播放四句。读同歌的续页不断播，另一书签会停止旧曲，等待点击新曲。

尚未核准逐句时间点，所有 lines[].audio 保持 null，仅显示整段播放状态。以后核准时间点后，可填 audio:{start:12.4,end:17.8}（秒），或为独立片段填 src；不对应的词句不设高亮时间。AI同时生成旋律和演唱时标签用 AI 谱曲与演唱；采用当代旋律、仅AI演唱时改为 当代编曲 · AI 演唱。

## 测试记录

本地服务：http://localhost:4173；黄平直达：http://localhost:4173/#huangping。moon 目录即完整静态部署目录。

本轮通过：

- 三份原始素材与发布副本的SHA-256一致；ffprobe确认MP3/MP3/AAC格式，FFmpeg完整解码均无错误。
- 开发服务和 /published/road-song/ 静态子目录下三个音频地址均返回200，MIME为audio/mpeg或audio/mp4，完整内容哈希一致；开发服务Range请求返回206。
- 桌面/手机模式模拟DOM/Audio回归：一个播放器、三个试听入口、无自动播放、试听不打开阅读器、暂停续播、寻郎首页播放进入同书签不断播、手机版翻到75页不断播、切送郎书签停止、切新曲从0、播完按钮恢复、无虚构逐句高亮。
- #huangping 是正文中实际存在的锚点，位于双卡下方；加载和hash变化均有定位逻辑，模拟滚动测试通过。
- 书影原有20张PNG及相对路径、两段范围和两个书签保留。

尚未完成：真正浏览器的桌面/手机播放、浏览器媒体解码、实际滚动与视觉验收。Chromium启动后20秒仍无法创建可渲染页面，已记录为未验证。FFmpeg解码和模拟交互不等同于浏览器播放实测，未据此声称实际浏览器验收通过。

检查文件位于上一级 .build/moon-audio/results.txt、browser-results.txt；脚本为 test.cjs、browser.cjs。音频时间点尚未听辨核准，未添加逐句高亮。

## 部署与 PPT 链接

将整个 `moon` 目录上传静态托管，保留相对路径。若使用 GitHub Pages：把本目录内容上传到仓库根目录，进入 Settings → Pages，选择从主分支根目录发布；发布完成后通常得到 `https://用户名.github.io/仓库名/`。也可上传为现有静态站下的 `/moon/`。

把最终公开 HTTPS 地址填入 PPT 第3页“读原书 · 听歌谣”的超链接。若仅在本地放映，使用本地 `index.html`，但移动文件时必须同时移动整个目录。当前没有创建或部署公开站点，因此尚无可交付的公网链接。

书影与音频只从本地相对资源加载；外部影印本只作补充入口。扫描页补齐后，即使该外链失败，本地书影仍能阅读。
