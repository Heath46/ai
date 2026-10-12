# Study Companion Safari Extension

一个仅用于正当学习支持的 Safari Web Extension。它不自动播放课程、不回答或提交题目、不伪造学习进度，所有笔记和复习卡仅保存在浏览器本机。

## 功能

- 当前页面私密笔记
- 专注计时与结束提醒
- 当前页面字号与高对比度阅读
- 本地复习卡（问题/答案）

## Safari 安装

Safari 扩展需要由 macOS app 签名运行：

1. 安装 Xcode。
2. 在此目录运行：
   ```sh
   xcrun safari-web-extension-converter . --project-location ./SafariBuild --app-name "Study Companion"
   ```
3. 在 Xcode 打开生成的项目，选择你的开发团队并运行。
4. Safari → 设置 → 扩展，启用 **Study Companion**。

首次使用时，Safari 会让你确认网站访问范围。