const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const jobSearch = $("#jobSearch");
if (jobSearch) {
  jobSearch.addEventListener("input", () => {
    const query = jobSearch.value.trim().toLowerCase();
    $$("#jobList tbody tr, #jobList .resource-block").forEach((row) => {
      const haystack = `${row.textContent} ${row.dataset.search || ""}`.toLowerCase();
      row.classList.toggle("hidden", query && !haystack.includes(query));
    });
  });
}

const gameSets = {
  kana: {
    name: "الكانا",
    questions: [
      { q: "あ", a: "a", options: ["a", "i", "u", "e"] },
      { q: "き", a: "ki", options: ["ka", "ki", "ko", "ke"] },
      { q: "ソ", a: "so", options: ["n", "so", "ri", "shi"] },
      { q: "め", a: "me", options: ["nu", "me", "ne", "re"] },
      { q: "ツ", a: "tsu", options: ["shi", "su", "tsu", "n"] },
    ],
  },
  meaning: {
    name: "معنى الكلمة",
    questions: [
      { q: "水", a: "ماء", options: ["نار", "ماء", "شمس", "بيت"] },
      { q: "学校", a: "مدرسة", options: ["شركة", "مدرسة", "محطة", "مستشفى"] },
      { q: "仕事", a: "عمل", options: ["عمل", "راحة", "لغة", "طعام"] },
      { q: "友達", a: "صديق", options: ["أستاذ", "صديق", "طالب", "عميل"] },
    ],
  },
  particle: {
    name: "اختر الأداة",
    questions: [
      { q: "私__学生です。", a: "は", options: ["は", "を", "で", "に"] },
      { q: "水__飲みます。", a: "を", options: ["が", "を", "へ", "と"] },
      { q: "東京__行きます。", a: "へ", options: ["を", "で", "へ", "も"] },
      { q: "駅__会いましょう。", a: "で", options: ["で", "を", "は", "が"] },
    ],
  },
  kanji: {
    name: "كانجي",
    questions: [
      { q: "火", a: "نار", options: ["ماء", "نار", "أرض", "هواء"] },
      { q: "山", a: "جبل", options: ["نهر", "مدينة", "جبل", "شارع"] },
      { q: "先", a: "سابق / قبل", options: ["سابق / قبل", "بعد", "داخل", "خارج"] },
      { q: "語", a: "لغة", options: ["عمل", "لغة", "مال", "وقت"] },
    ],
  },
};

if ($("#gameQuestion")) {
  let activeGame = "kana";
  let score = 0;
  let attempts = 0;
  let currentQuestion = null;

  function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
  }

  function renderGameQuestion() {
    const set = gameSets[activeGame];
    currentQuestion = set.questions[Math.floor(Math.random() * set.questions.length)];
    $("#gameName").textContent = set.name;
    $("#gameScore").textContent = `${score} / ${attempts}`;
    $("#gameQuestion").textContent = currentQuestion.q;
    $("#gameFeedback").textContent = "";
    $("#gameOptions").innerHTML = shuffle(currentQuestion.options)
      .map((option) => `<button class="game-option" type="button">${option}</button>`)
      .join("");
  }

  $("#gameOptions").addEventListener("click", (event) => {
    const button = event.target.closest(".game-option");
    if (!button || button.disabled) return;
    const selected = button.textContent;
    attempts += 1;
    const correct = selected === currentQuestion.a;
    if (correct) score += 1;
    $$(".game-option").forEach((option) => {
      option.disabled = true;
      if (option.textContent === currentQuestion.a) option.classList.add("correct");
    });
    if (!correct) button.classList.add("wrong");
    $("#gameFeedback").textContent = correct ? "إجابة صحيحة. تابع." : `الإجابة الصحيحة: ${currentQuestion.a}`;
    $("#gameScore").textContent = `${score} / ${attempts}`;
  });

  $$(".game-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".game-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      activeGame = tab.dataset.game;
      score = 0;
      attempts = 0;
      renderGameQuestion();
    });
  });

  $("#nextGameQuestion").addEventListener("click", renderGameQuestion);
  renderGameQuestion();
}

const translatorDefaults = [
  {
    id: "t1",
    name: "Tokyo Arabic Studio",
    languages: "العربية، اليابانية، الإنجليزية",
    specialty: "نشر مكتبي ومطبوعات (DTP)",
    bio: "ترجمة وتنسيق كتيّبات وعروض وملفات الشركات متعدّدة اللغات.",
    ratings: [5, 5, 4],
  },
  {
    id: "t2",
    name: "Nihongo Legal Help",
    languages: "العربية، اليابانية",
    specialty: "قانوني وشؤون الإقامة",
    bio: "مراجعة نماذج الإقامة والبلدية، وترجمة مستندات قصيرة للمقيمين الجدد.",
    ratings: [4, 5],
  },
];

if ($("#translatorList")) {
  const storageKey = "nihonhub-translators";

  function getTranslators() {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || translatorDefaults;
    } catch {
      return translatorDefaults;
    }
  }

  function saveTranslators(items) {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function avg(ratings) {
    if (!ratings.length) return "بدون تقييم";
    return `${(ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)} / 5`;
  }

  function renderTranslators() {
    const query = ($("#translatorSearch").value || "").trim().toLowerCase();
    const items = getTranslators().filter((item) =>
      `${item.name} ${item.languages} ${item.specialty} ${item.bio}`.toLowerCase().includes(query),
    );
    $("#translatorList").innerHTML = items.map((item) => `
      <article class="translator-card" data-id="${item.id}">
        <div class="translator-card-head">
          <div>
            <h2>${item.name}</h2>
            <div class="tags"><span>${item.languages}</span><span>${item.specialty}</span></div>
          </div>
          <strong>${avg(item.ratings)}</strong>
        </div>
        <p>${item.bio || "لا توجد نبذة بعد."}</p>
        <div class="stars">
          <span>قيّم الترجمة:</span>
          ${[1, 2, 3, 4, 5].map((n) => `<button class="star-button" data-rating="${n}" type="button">${n}</button>`).join("")}
        </div>
      </article>
    `).join("");
  }

  if (!localStorage.getItem(storageKey)) saveTranslators(translatorDefaults);

  $("#translatorForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const items = getTranslators();
    items.unshift({
      id: globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now()),
      name: form.get("name").trim(),
      languages: form.get("languages").trim(),
      specialty: form.get("specialty"),
      bio: form.get("bio").trim(),
      ratings: [],
    });
    saveTranslators(items);
    event.currentTarget.reset();
    renderTranslators();
  });

  $("#translatorList").addEventListener("click", (event) => {
    const star = event.target.closest(".star-button");
    if (!star) return;
    const card = star.closest(".translator-card");
    const items = getTranslators();
    const item = items.find((translator) => translator.id === card.dataset.id);
    if (!item) return;
    item.ratings.push(Number(star.dataset.rating));
    saveTranslators(items);
    renderTranslators();
  });

  $("#translatorSearch").addEventListener("input", renderTranslators);
  $("#resetTranslators").addEventListener("click", () => {
    saveTranslators(translatorDefaults);
    $("#translatorSearch").value = "";
    renderTranslators();
  });

  renderTranslators();
}
