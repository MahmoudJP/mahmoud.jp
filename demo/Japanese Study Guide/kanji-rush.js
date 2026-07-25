const words = [
  { word: "会う", reading: "あう", jlpt: "N5" },
  { word: "青", reading: "あお", jlpt: "N5" },
  { word: "赤", reading: "あか", jlpt: "N5" },
  { word: "秋", reading: "あき", jlpt: "N5" },
  { word: "朝", reading: "あさ", jlpt: "N5" },
  { word: "足", reading: "あし", jlpt: "N5" },
  { word: "雨", reading: "あめ", jlpt: "N5" },
  { word: "家", reading: "いえ", jlpt: "N5" },
  { word: "今", reading: "いま", jlpt: "N5" },
  { word: "上", reading: "うえ", jlpt: "N5" },
  { word: "駅", reading: "えき", jlpt: "N5" },
  { word: "円", reading: "えん", jlpt: "N5" },
  { word: "大きい", reading: "おおきい", jlpt: "N5" },
  { word: "男", reading: "おとこ", jlpt: "N5" },
  { word: "女", reading: "おんな", jlpt: "N5" },
  { word: "学校", reading: "がっこう", jlpt: "N5" },
  { word: "学生", reading: "がくせい", jlpt: "N5" },
  { word: "火曜日", reading: "かようび", jlpt: "N5" },
  { word: "川", reading: "かわ", jlpt: "N5" },
  { word: "木", reading: "き", jlpt: "N5" },
  { word: "今日", reading: "きょう", jlpt: "N5" },
  { word: "車", reading: "くるま", jlpt: "N5" },
  { word: "月曜日", reading: "げつようび", jlpt: "N5" },
  { word: "子供", reading: "こども", jlpt: "N5" },
  { word: "魚", reading: "さかな", jlpt: "N5" },
  { word: "時間", reading: "じかん", jlpt: "N5" },
  { word: "下", reading: "した", jlpt: "N5" },
  { word: "先生", reading: "せんせい", jlpt: "N5" },
  { word: "空", reading: "そら", jlpt: "N5" },
  { word: "食べる", reading: "たべる", jlpt: "N5" },
  { word: "小さい", reading: "ちいさい", jlpt: "N5" },
  { word: "父", reading: "ちち", jlpt: "N5" },
  { word: "電車", reading: "でんしゃ", jlpt: "N5" },
  { word: "友達", reading: "ともだち", jlpt: "N5" },
  { word: "名前", reading: "なまえ", jlpt: "N5" },
  { word: "日本", reading: "にほん", jlpt: "N5" },
  { word: "母", reading: "はは", jlpt: "N5" },
  { word: "話す", reading: "はなす", jlpt: "N5" },
  { word: "人", reading: "ひと", jlpt: "N5" },
  { word: "本", reading: "ほん", jlpt: "N5" },
  { word: "水", reading: "みず", jlpt: "N5" },
  { word: "見る", reading: "みる", jlpt: "N5" },
  { word: "山", reading: "やま", jlpt: "N5" },
  { word: "読む", reading: "よむ", jlpt: "N5" },
  { word: "来る", reading: "くる", jlpt: "N5" },

  { word: "安心", reading: "あんしん", jlpt: "N4" },
  { word: "以外", reading: "いがい", jlpt: "N4" },
  { word: "医学", reading: "いがく", jlpt: "N4" },
  { word: "意見", reading: "いけん", jlpt: "N4" },
  { word: "急ぐ", reading: "いそぐ", jlpt: "N4" },
  { word: "受付", reading: "うけつけ", jlpt: "N4" },
  { word: "運転", reading: "うんてん", jlpt: "N4" },
  { word: "運動", reading: "うんどう", jlpt: "N4" },
  { word: "映画", reading: "えいが", jlpt: "N4" },
  { word: "お祝い", reading: "おいわい", jlpt: "N4" },
  { word: "会議", reading: "かいぎ", jlpt: "N4" },
  { word: "会場", reading: "かいじょう", jlpt: "N4" },
  { word: "会社", reading: "かいしゃ", jlpt: "N4" },
  { word: "帰り", reading: "かえり", jlpt: "N4" },
  { word: "確認", reading: "かくにん", jlpt: "N4" },
  { word: "飾る", reading: "かざる", jlpt: "N4" },
  { word: "ガス代", reading: "がすだい", jlpt: "N4" },
  { word: "関係", reading: "かんけい", jlpt: "N4" },
  { word: "漢字", reading: "かんじ", jlpt: "N4" },
  { word: "気分", reading: "きぶん", jlpt: "N4" },
  { word: "教育", reading: "きょういく", jlpt: "N4" },
  { word: "教会", reading: "きょうかい", jlpt: "N4" },
  { word: "経験", reading: "けいけん", jlpt: "N4" },
  { word: "警察", reading: "けいさつ", jlpt: "N4" },
  { word: "経済", reading: "けいざい", jlpt: "N4" },
  { word: "研究", reading: "けんきゅう", jlpt: "N4" },
  { word: "故障", reading: "こしょう", jlpt: "N4" },
  { word: "最近", reading: "さいきん", jlpt: "N4" },
  { word: "最後", reading: "さいご", jlpt: "N4" },
  { word: "最初", reading: "さいしょ", jlpt: "N4" },
  { word: "産業", reading: "さんぎょう", jlpt: "N4" },
  { word: "残念", reading: "ざんねん", jlpt: "N4" },
  { word: "試合", reading: "しあい", jlpt: "N4" },
  { word: "試験", reading: "しけん", jlpt: "N4" },
  { word: "事故", reading: "じこ", jlpt: "N4" },
  { word: "事務所", reading: "じむしょ", jlpt: "N4" },
  { word: "社長", reading: "しゃちょう", jlpt: "N4" },
  { word: "住所", reading: "じゅうしょ", jlpt: "N4" },
  { word: "自由", reading: "じゆう", jlpt: "N4" },
  { word: "習慣", reading: "しゅうかん", jlpt: "N4" },
  { word: "準備", reading: "じゅんび", jlpt: "N4" },
  { word: "紹介", reading: "しょうかい", jlpt: "N4" },
  { word: "将来", reading: "しょうらい", jlpt: "N4" },
  { word: "食料品", reading: "しょくりょうひん", jlpt: "N4" },
  { word: "親切", reading: "しんせつ", jlpt: "N4" },
  { word: "生活", reading: "せいかつ", jlpt: "N4" },
  { word: "説明", reading: "せつめい", jlpt: "N4" },
  { word: "卒業", reading: "そつぎょう", jlpt: "N4" },
  { word: "大学", reading: "だいがく", jlpt: "N4" },
  { word: "台風", reading: "たいふう", jlpt: "N4" },
  { word: "通訳", reading: "つうやく", jlpt: "N4" },
  { word: "都合", reading: "つごう", jlpt: "N4" },
  { word: "手伝う", reading: "てつだう", jlpt: "N4" },
  { word: "特別", reading: "とくべつ", jlpt: "N4" },
  { word: "図書館", reading: "としょかん", jlpt: "N4" },
  { word: "入院", reading: "にゅういん", jlpt: "N4" },
  { word: "必要", reading: "ひつよう", jlpt: "N4" },
  { word: "翻訳", reading: "ほんやく", jlpt: "N4" },
  { word: "無理", reading: "むり", jlpt: "N4" },
  { word: "約束", reading: "やくそく", jlpt: "N4" },
  { word: "予約", reading: "よやく", jlpt: "N4" },
  { word: "理由", reading: "りゆう", jlpt: "N4" },
  { word: "留学", reading: "りゅうがく", jlpt: "N4" },
  { word: "料理", reading: "りょうり", jlpt: "N4" },
  { word: "連絡", reading: "れんらく", jlpt: "N4" },
];

const arena = document.querySelector("#rushArena");
const readingOptions = document.querySelector("#readingOptions");
const scoreEl = document.querySelector("#rushScore");
const comboEl = document.querySelector("#rushCombo");
const levelEl = document.querySelector("#rushLevel");
const livesEl = document.querySelector("#rushLives");
const messageEl = document.querySelector("#rushMessage");
const overlay = document.querySelector("#rushOverlay");
const lastCleared = document.querySelector("#lastCleared");
const speedSetting = document.querySelector("#speedSetting");
const speedValue = document.querySelector("#speedValue");
const levelCheckboxes = [...document.querySelectorAll(".jlpt-level")];

let activeWords = [];
let optionReadings = [];
let score = 0;
let combo = 0;
let level = 1;
let lives = 5;
let running = false;
let paused = false;
let lastFrame = 0;
let spawnTimer = 0;
let wordId = 0;
let rafId = null;
let dragState = null;

function speedMultiplier() {
  return Number(speedSetting.value) / 100;
}

function selectedLevels() {
  const selected = levelCheckboxes.filter((box) => box.checked).map((box) => box.value);
  if (selected.length) return selected;
  levelCheckboxes[0].checked = true;
  return [levelCheckboxes[0].value];
}

function updateSpeedLabel() {
  speedValue.textContent = `${speedSetting.value}%`;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function updateHud() {
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  levelEl.textContent = level;
  livesEl.textContent = lives;
}

function availableWords() {
  const selected = selectedLevels();
  return words.filter((item) => selected.includes(item.jlpt));
}

function pool() {
  const available = availableWords();
  return available[Math.floor(Math.random() * available.length)];
}

function seedReadingChoices() {
  optionReadings = [];
  const poolReadings = shuffle([...new Set(availableWords().map((item) => item.reading))]);
  poolReadings.slice(0, 8).forEach((reading) => addReadingChoice(reading, false));
  renderReadingChoices();
}

function addReadingChoice(reading, render = true) {
  if (!reading || optionReadings.includes(reading)) return;
  optionReadings.push(reading);
  if (render) renderReadingChoices();
}

function renderReadingChoices() {
  readingOptions.innerHTML = optionReadings
    .map((reading) => `<button class="reading-tile" type="button" data-reading="${reading}">${reading}</button>`)
    .join("");
}

function spawnWord() {
  const data = pool();
  if (!data) return;
  const chip = document.createElement("div");
  const lane = Math.floor(Math.random() * 5);
  chip.className = "rush-chip";
  chip.style.left = `calc(${lane * 20}% + 10%)`;
  chip.dataset.reading = data.reading;
  chip.innerHTML = `<strong>${data.word}</strong><span>${data.jlpt}</span>`;
  arena.appendChild(chip);
  activeWords.push({
    id: ++wordId,
    ...data,
    y: -70,
    lane,
    speed: (34 + level * 5 + Math.random() * 12) * speedMultiplier(),
    element: chip,
  });
  addReadingChoice(data.reading);
}

function removeWord(target, cleared) {
  target.element.style.setProperty("--chip-y", `${target.y}px`);
  target.element.classList.add(cleared ? "cleared" : "missed");
  window.setTimeout(() => target.element.remove(), 180);
  activeWords = activeWords.filter((item) => item.id !== target.id);
}

function wordAtPoint(x, y) {
  return activeWords
    .filter((item) => {
      const rect = item.element.getBoundingClientRect();
      return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
    })
    .sort((a, b) => b.y - a.y)[0] || null;
}

function resolveDrop(reading, x, y) {
  const target = wordAtPoint(x, y);
  if (!target) {
    messageEl.textContent = "ارمي القراءة على كلمة كانجي.";
    return;
  }

  if (target.reading !== reading) {
    combo = 0;
    target.element.classList.add("shake");
    window.setTimeout(() => target.element.classList.remove("shake"), 240);
    messageEl.textContent = `غلط: ${target.word} ليست ${reading}`;
    updateHud();
    return;
  }

  combo += 1;
  const dangerBonus = Math.max(0, Math.round(target.y / 10));
  score += 120 + combo * 15 + dangerBonus;
  level = Math.min(9, 1 + Math.floor(score / 900));
  lastCleared.textContent = `${target.word} / ${target.reading}`;
  messageEl.textContent = combo % 5 === 0 ? `Combo ${combo}. جامد.` : "ضربة صحيحة.";
  removeWord(target, true);
  updateHud();
}

function startDrag(tile, event) {
  if (!running || paused) {
    messageEl.textContent = "اضغط ابدأ الأول.";
    return;
  }

  event.preventDefault();
  const rect = tile.getBoundingClientRect();
  const ghost = tile.cloneNode(true);
  ghost.classList.add("drag-ghost");
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  document.body.appendChild(ghost);

  dragState = {
    reading: tile.dataset.reading,
    ghost,
    source: tile,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
  };
  tile.classList.add("drag-source");
  moveGhost(event.clientX, event.clientY);
}

function moveGhost(x, y) {
  if (!dragState) return;
  dragState.ghost.style.left = `${x - dragState.offsetX}px`;
  dragState.ghost.style.top = `${y - dragState.offsetY}px`;
}

function endDrag(event) {
  if (!dragState) return;
  const { reading, ghost, source } = dragState;
  ghost.remove();
  source.classList.remove("drag-source");
  dragState = null;
  resolveDrop(reading, event.clientX, event.clientY);
}

readingOptions.addEventListener("pointerdown", (event) => {
  const tile = event.target.closest(".reading-tile");
  if (!tile) return;
  startDrag(tile, event);
});

document.addEventListener("pointermove", (event) => {
  if (!dragState) return;
  moveGhost(event.clientX, event.clientY);
});

document.addEventListener("pointerup", (event) => {
  if (!dragState) return;
  endDrag(event);
});

document.addEventListener("pointercancel", () => {
  if (!dragState) return;
  const { ghost, source } = dragState;
  ghost.remove();
  source.classList.remove("drag-source");
  dragState = null;
});

function tick(timestamp) {
  if (!running || paused) return;
  const delta = Math.min((timestamp - lastFrame) / 1000, 0.04) || 0;
  lastFrame = timestamp;
  spawnTimer -= delta;

  if (spawnTimer <= 0) {
    spawnWord();
    spawnTimer = Math.max(0.95, (2.45 - level * 0.16 - combo * 0.008) / speedMultiplier());
  }

  activeWords.forEach((item) => {
    item.y += item.speed * delta;
    item.element.style.transform = `translate(-50%, ${item.y}px)`;
    item.element.classList.toggle("danger", item.y > arena.clientHeight - 190);
  });

  const escaped = activeWords.filter((item) => item.y > arena.clientHeight - 82);
  escaped.forEach((item) => {
    lives -= 1;
    combo = 0;
    messageEl.textContent = `فاتت: ${item.word} = ${item.reading}`;
    removeWord(item, false);
  });

  if (lives <= 0) {
    endGame();
    return;
  }

  updateHud();
  rafId = requestAnimationFrame(tick);
}

function startGame() {
  if (running && paused) {
    paused = false;
    lastFrame = performance.now();
    overlay.classList.add("hidden");
    rafId = requestAnimationFrame(tick);
    return;
  }

  if (!activeWords.length) seedReadingChoices();
  running = true;
  paused = false;
  overlay.classList.add("hidden");
  lastFrame = performance.now();
  spawnTimer = 0.2;
  messageEl.textContent = "اسحب القراءة وارميها على الكلمة الصح.";
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(tick);
}

function pauseGame() {
  if (!running) return;
  paused = !paused;
  overlay.classList.toggle("hidden", !paused);
  overlay.querySelector("strong").textContent = paused ? "Paused" : "Kanji Rush";
  overlay.querySelector("span").textContent = paused ? "اضغط ابدأ عشان تكمل" : "اضغط ابدأ واسحب القراءة على الكانجي";
  if (!paused) startGame();
}

function resetGame() {
  cancelAnimationFrame(rafId);
  activeWords.forEach((item) => item.element.remove());
  activeWords = [];
  score = 0;
  combo = 0;
  level = 1;
  lives = 5;
  running = false;
  paused = false;
  lastCleared.textContent = "جاهز؟";
  messageEl.textContent = "ابدأ بهدوء. السرعة هتعلى مع كل مستوى.";
  overlay.classList.remove("hidden");
  overlay.querySelector("strong").textContent = "Kanji Rush";
  overlay.querySelector("span").textContent = "اضغط ابدأ واسحب القراءة على الكانجي";
  seedReadingChoices();
  updateHud();
}

function endGame() {
  running = false;
  paused = false;
  cancelAnimationFrame(rafId);
  overlay.classList.remove("hidden");
  overlay.querySelector("strong").textContent = "Game Over";
  overlay.querySelector("span").textContent = `Score ${score}. اضغط إعادة وحاول تكسر الرقم.`;
  messageEl.textContent = "خلصت الدرع. راجع الكلمات اللي فاتت وحاول تاني.";
  updateHud();
}

speedSetting.addEventListener("input", updateSpeedLabel);

levelCheckboxes.forEach((box) => {
  box.addEventListener("change", () => {
    if (!selectedLevels().length) box.checked = true;
    resetGame();
  });
});

document.querySelector("#startRush").addEventListener("click", startGame);
document.querySelector("#pauseRush").addEventListener("click", pauseGame);
document.querySelector("#resetRush").addEventListener("click", resetGame);

updateSpeedLabel();
seedReadingChoices();
updateHud();
