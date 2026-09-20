const questionList = document.querySelector("#question-list");
const solvedCount = document.querySelector("#solved-count");
const progressBar = document.querySelector("#progress-bar");
const resetButton = document.querySelector("#reset-button");
const toast = document.querySelector("#toast");

const solvedQuestions = new Set();
let toastTimer;

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeFlag(value) {
  return value.trim();
}

function renderQuestions() {
  questionList.innerHTML = quizConfig
    .map((question) => {
      const content = question.content
        ? `<p>${escapeHtml(question.content).replaceAll("\n", "<br>")}</p>`
        : '<p class="empty-content">题目内容待补充</p>';

      return `
        <article class="question-card" data-question-id="${question.id}">
          <div class="question-heading">
            <div>
              <span class="question-number">0${question.id}</span>
              <h2>${escapeHtml(question.title)}</h2>
            </div>
            <span class="question-status" data-status>未解答</span>
          </div>

          <div class="question-content">${content}</div>

          <form class="answer-form" data-answer-form novalidate>
            <label for="flag-${question.id}">提交 Flag</label>
            <div class="input-row">
              <input
                id="flag-${question.id}"
                name="flag"
                type="text"
                placeholder="请输入 flag"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
              >
              <button type="submit">提交</button>
            </div>
            <p class="feedback" data-feedback aria-live="polite"></p>
          </form>
        </article>
      `;
    })
    .join("");

  questionList.querySelectorAll("[data-answer-form]").forEach((form) => {
    form.addEventListener("submit", handleSubmit);
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const form = event.currentTarget;
  const card = form.closest(".question-card");
  const questionId = Number(card.dataset.questionId);
  const question = quizConfig.find((item) => item.id === questionId);
  const input = form.elements.flag;
  const feedback = form.querySelector("[data-feedback]");
  const submittedFlag = normalizeFlag(input.value);

  if (!submittedFlag) {
    showFeedback(feedback, "error", "请先输入 flag。");
    input.focus();
    return;
  }

  if (!question.flag) {
    showFeedback(feedback, "warning", "本题答案尚未配置，请联系管理员。");
    return;
  }

  if (submittedFlag === normalizeFlag(question.flag)) {
    markSolved(card, input, feedback);
    showToast(`第 ${question.id} 题回答正确！`);
    return;
  }

  showFeedback(feedback, "error", "回答错误，请再试一次。");
  input.select();
}

function markSolved(card, input, feedback) {
  const questionId = Number(card.dataset.questionId);

  if (!solvedQuestions.has(questionId)) {
    solvedQuestions.add(questionId);
    updateProgress();
  }

  card.classList.add("is-solved");
  card.querySelector("[data-status]").textContent = "已通过";
  input.disabled = true;
  card.querySelector('button[type="submit"]').disabled = true;
  showFeedback(feedback, "success", "回答正确，已通过本题！");
}

function updateProgress() {
  const total = quizConfig.length;
  solvedCount.textContent = String(solvedQuestions.size);
  progressBar.style.width = `${total ? (solvedQuestions.size / total) * 100 : 0}%`;
}

function showFeedback(element, type, message) {
  element.className = `feedback ${type}`;
  element.textContent = message;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2400);
}

function resetProgress() {
  solvedQuestions.clear();
  updateProgress();

  questionList.querySelectorAll(".question-card").forEach((card) => {
    card.classList.remove("is-solved");
    card.querySelector("[data-status]").textContent = "未解答";
    card.querySelector("[data-feedback]").textContent = "";
    card.querySelector("[data-feedback]").className = "feedback";

    const input = card.querySelector('input[name="flag"]');
    const button = card.querySelector('button[type="submit"]');
    input.disabled = false;
    input.value = "";
    button.disabled = false;
  });

  showToast("答题进度已重置");
}

renderQuestions();
updateProgress();
resetButton.addEventListener("click", resetProgress);
