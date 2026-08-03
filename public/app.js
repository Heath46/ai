const task = document.querySelector("#task");
const submit = document.querySelector("#submit");
const result = document.querySelector("#result");
const status = document.querySelector("#status");
const copy = document.querySelector("#copy");

document.querySelector(".sample").addEventListener("click", (event) => {
  task.value = event.currentTarget.dataset.text;
  task.focus();
});

submit.addEventListener("click", async () => {
  const value = task.value.trim();
  if (!value) { status.textContent = "先写下你的需求，再开始生成。"; task.focus(); return; }
  submit.disabled = true;
  submit.textContent = "正在生成…";
  copy.disabled = true;
  result.style.display = "none";
  status.textContent = "AI 正在思考，请稍候。";
  try {
    const response = await fetch("/api/assist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ task: value, mode: document.querySelector("#mode").value, tone: document.querySelector("#tone").value }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "生成失败，请稍后重试。");
    result.textContent = data.text;
    result.style.display = "block";
    status.textContent = "完成。";
    copy.disabled = false;
  } catch (error) { status.textContent = `出错了：${error.message}`; }
  finally { submit.disabled = false; submit.textContent = "开始生成"; }
});

copy.addEventListener("click", async () => {
  await navigator.clipboard.writeText(result.textContent);
  copy.textContent = "已复制";
  setTimeout(() => { copy.textContent = "复制"; }, 1400);
});
