import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";

const port = Number(process.env.PORT || 3000);
const apiKey = process.env.OPENAI_API_KEY;
const model = process.env.OPENAI_MODEL || "gpt-5.6";
const publicDir = new URL("./public/", import.meta.url).pathname;
const mimeTypes = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8" };

function send(res, status, body, contentType = "application/json; charset=utf-8") {
  res.writeHead(status, { "Content-Type": contentType });
  res.end(typeof body === "string" ? body : JSON.stringify(body));
}

async function getBody(req) {
  let body = "";
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 50_000) throw new Error("请求内容太长。");
  }
  return JSON.parse(body || "{}");
}

createServer(async (req, res) => {
  try {
    if (req.method === "POST" && req.url === "/api/assist") {
      if (!apiKey) return send(res, 500, { error: "服务器尚未配置 OPENAI_API_KEY。请按 README 设置后重新启动。" });
      const { task = "", mode = "通用助手", tone = "清晰友好" } = await getBody(req);
      if (!task.trim()) return send(res, 400, { error: "请先输入你的需求。" });

      const response = await fetch("https://api.openai.com/v1/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model,
          instructions: `你是中文 AI 辅助工具。任务类别：${mode}。表达风格：${tone}。请直接完成用户请求；内容要准确、实用、易读。若信息不足，先说明合理假设，再给可执行的结果。`,
          input: task,
          store: false
        })
      });
      const data = await response.json();
      if (!response.ok) return send(res, response.status, { error: data.error?.message || "AI 服务暂时无法响应。" });
      const text = data.output_text || data.output?.flatMap(item => item.content || []).filter(item => item.type === "output_text").map(item => item.text).join("\n") || "没有生成文字。";
      return send(res, 200, { text });
    }

    if (req.method === "GET") {
      const safePath = req.url === "/" ? "index.html" : req.url.replace(/^\//, "");
      if (safePath.includes("..")) return send(res, 403, "禁止访问", "text/plain; charset=utf-8");
      const file = await readFile(join(publicDir, safePath));
      return send(res, 200, file, mimeTypes[extname(safePath)] || "application/octet-stream");
    }
    send(res, 404, { error: "未找到页面。" });
  } catch (error) {
    console.error(error);
    send(res, 500, { error: error.message || "服务器发生错误。" });
  }
}).listen(port, () => console.log(`AI 助手已启动：http://localhost:${port}`));
