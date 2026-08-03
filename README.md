[README.md](https://github.com/user-attachments/files/30651839/README.md)
# 小帮手 AI

一个中文网页 AI 助手。用户选择任务类型、输入需求后，页面会调用后端生成内容。

## 重要：上传 GitHub 前先知道

你可以直接把整个 `ai-helper` 文件夹上传到 GitHub。**不要上传 API Key。** 项目已经用 `.gitignore` 忽略了 `.env` 文件。

只上传 GitHub 不会让网页自动运行；GitHub 只负责保存代码。要让其他人访问这个工具，还需要把它部署到支持 Node.js 的平台，例如 Render、Railway 或 Vercel。

## 在电脑上运行

1. 安装 [Node.js 18 或更新版本](https://nodejs.org/)。
2. 在终端进入这个项目文件夹。
3. 设置 API Key（将 `你的密钥` 替换为你自己的）：

   macOS：
   ```bash
   export OPENAI_API_KEY="你的密钥"
   npm start
   ```

   Windows PowerShell：
   ```powershell
   $env:OPENAI_API_KEY="你的密钥"
   npm start
   ```

4. 浏览器打开 `http://localhost:3000`。

可选：如果你有不同的模型名，可以在启动前设置 `OPENAI_MODEL`。默认是 `gpt-5.6`。

## 上传到 GitHub（不用命令行）

1. 打开你的 GitHub 仓库 `Heath46/ai`。
2. 点击 **Add file** → **Upload files**。
3. 打开此文件夹，把里面全部文件和 `public` 文件夹拖入网页。
4. 点击 **Commit changes**。

上传后，仓库里应有：`package.json`、`server.mjs`、`.gitignore`、`README.md` 和 `public/`。

## 安全提示

- API Key 只能放在部署平台的“环境变量”设置里，不能写进 `server.mjs`、网页或 GitHub。
- 一旦不小心公开 API Key，请立即在 API 控制台撤销并创建新密钥。
