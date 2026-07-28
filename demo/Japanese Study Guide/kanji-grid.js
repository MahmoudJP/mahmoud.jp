const matchWords = [
  { word: "会う", reading: "あう", jlpt: "N5" },
  { word: "青", reading: "あお", jlpt: "N5" },
  { word: "赤", reading: "あか", jlpt: "N5" },
  { word: "秋", reading: "あき", jlpt: "N5" },
  { word: "朝", reading: "あさ", jlpt: "N5" },
  { word: "雨", reading: "あめ", jlpt: "N5" },
  { word: "家", reading: "いえ", jlpt: "N5" },
  { word: "今", reading: "いま", jlpt: "N5" },
  { word: "駅", reading: "えき", jlpt: "N5" },
  { word: "学校", reading: "がっこう", jlpt: "N5" },
  { word: "学生", reading: "がくせい", jlpt: "N5" },
  { word: "今日", reading: "きょう", jlpt: "N5" },
  { word: "車", reading: "くるま", jlpt: "N5" },
  { word: "時間", reading: "じかん", jlpt: "N5" },
  { word: "先生", reading: "せんせい", jlpt: "N5" },
  { word: "電車", reading: "でんしゃ", jlpt: "N5" },
  { word: "友達", reading: "ともだち", jlpt: "N5" },
  { word: "日本", reading: "にほん", jlpt: "N5" },
  { word: "話す", reading: "はなす", jlpt: "N5" },
  { word: "見る", reading: "みる", jlpt: "N5" },
  { word: "読む", reading: "よむ", jlpt: "N5" },
  { word: "漢字", reading: "かんじ", jlpt: "N4" },
  { word: "会社", reading: "かいしゃ", jlpt: "N4" },
  { word: "会議", reading: "かいぎ", jlpt: "N4" },
  { word: "確認", reading: "かくにん", jlpt: "N4" },
  { word: "関係", reading: "かんけい", jlpt: "N4" },
  { word: "気分", reading: "きぶん", jlpt: "N4" },
  { word: "経験", reading: "けいけん", jlpt: "N4" },
  { word: "研究", reading: "けんきゅう", jlpt: "N4" },
  { word: "試験", reading: "しけん", jlpt: "N4" },
  { word: "住所", reading: "じゅうしょ", jlpt: "N4" },
  { word: "準備", reading: "じゅんび", jlpt: "N4" },
  { word: "説明", reading: "せつめい", jlpt: "N4" },
  { word: "大学", reading: "だいがく", jlpt: "N4" },
  { word: "通訳", reading: "つうやく", jlpt: "N4" },
  { word: "図書館", reading: "としょかん", jlpt: "N4" },
  { word: "必要", reading: "ひつよう", jlpt: "N4" },
  { word: "翻訳", reading: "ほんやく", jlpt: "N4" },
  { word: "予約", reading: "よやく", jlpt: "N4" },
  { word: "料理", reading: "りょうり", jlpt: "N4" },
  { word: "連絡", reading: "れんらく", jlpt: "N4" },
];

const board = document.querySelector("#matchBoard");
const options = document.querySelector("#matchOptions");
const spawnLayer = document.querySelector("#matchSpawn");
const scoreEl = document.querySelector("#gridScore");
const comboEl = document.querySelector("#gridCombo");
const matchedEl = document.querySelector("#gridMatched");
const messageEl = document.querySelector("#matchMessage");

const size = 6;
let cells = [];
let score = 0;
let combo = 0;
let matched = 0;
let drag = null;

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function randomWord(exclude = new Set()) {
  const pool = matchWords.filter((item) => !exclude.has(item.word));
  return pool[Math.floor(Math.random() * pool.length)] || matchWords[Math.floor(Math.random() * matchWords.length)];
}

function updateHud() {
  scoreEl.textContent = score;
  comboEl.textContent = combo;
  matchedEl.textContent = matched;
}

function renderBoard() {
  board.innerHTML = "";
  cells.forEach((item, index) => {
    const cell = document.createElement("button");
    cell.className = "match-cell";
    cell.type = "button";
    cell.dataset.index = index;
    cell.dataset.reading = item.reading;
    cell.innerHTML = `<strong>${item.word}</strong><span>${item.jlpt}</span>`;
    board.appendChild(cell);
  });
}

function renderOptions(extraReading = null) {
  const readings = new Set(cells.map((item) => item.reading));
  if (extraReading) readings.add(extraReading);
  while (readings.size < 10) readings.add(randomWord().reading);

  options.innerHTML = [...readings]
    .slice(0, 12)
    .map((reading) => `<button class="match-reading" type="button" data-reading="${reading}">${reading}</button>`)
    .join("");
}

function newGrid() {
  const used = new Set();
  cells = Array.from({ length: size * size }, () => {
    const word = randomWord(used);
    used.add(word.word);
    return word;
  });
  score = 0;
  combo = 0;
  matched = 0;
  renderBoard();
  renderOptions();
  updateHud();
  messageEl.textContent = "اسحب قراءة من تحت على الكانجي الصح.";
}

function tileAtPoint(x, y) {
  const element = document.elementFromPoint(x, y)?.closest(".match-cell");
  if (!element) return null;
  return { element, index: Number(element.dataset.index) };
}

function makeGhost(source, x, y, kind) {
  const rect = source.getBoundingClientRect();
  const ghost = source.cloneNode(true);
  ghost.classList.add(kind === "cell" ? "match-cell-ghost" : "drag-ghost");
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  document.body.appendChild(ghost);
  return {
    ghost,
    offsetX: x - rect.left,
    offsetY: y - rect.top,
  };
}

function moveGhost(x, y) {
  if (!drag) return;
  drag.ghost.style.left = `${x - drag.offsetX}px`;
  drag.ghost.style.top = `${y - drag.offsetY}px`;
}

function startReadingDrag(tile, event) {
  event.preventDefault();
  const ghostData = makeGhost(tile, event.clientX, event.clientY, "reading");
  drag = { type: "reading", reading: tile.dataset.reading, source: tile, ...ghostData };
  tile.classList.add("drag-source");
  moveGhost(event.clientX, event.clientY);
}

function startCellDrag(cell, event) {
  event.preventDefault();
  const ghostData = makeGhost(cell, event.clientX, event.clientY, "cell");
  drag = { type: "cell", fromIndex: Number(cell.dataset.index), source: cell, ...ghostData };
  cell.classList.add("moving");
  moveGhost(event.clientX, event.clientY);
}

function finishReadingDrop(event) {
  const target = tileAtPoint(event.clientX, event.clientY);
  if (!target) {
    messageEl.textContent = "حط القراءة فوق مربع كانجي.";
    return;
  }

  const word = cells[target.index];
  if (word.reading !== drag.reading) {
    combo = 0;
    target.element.classList.add("bad-drop");
    window.setTimeout(() => target.element.classList.remove("bad-drop"), 260);
    messageEl.textContent = `غلط: ${word.word} قراءتها ${word.reading}`;
    updateHud();
    return;
  }

  combo += 1;
  matched += 1;
  score += 100 + combo * 18;
  messageEl.textContent = combo % 5 === 0 ? `Combo ${combo}. الشبكة ولعت.` : `${word.word} = ${word.reading}`;
  explodeAndReplace(target.index, target.element);
  updateHud();
}

function finishCellDrop(event) {
  const target = tileAtPoint(event.clientX, event.clientY);
  if (!target || target.index === drag.fromIndex) return;
  const temp = cells[drag.fromIndex];
  cells[drag.fromIndex] = cells[target.index];
  cells[target.index] = temp;
  renderBoard();
  messageEl.textContent = "اتبدلت أماكن المربعات.";
}

function endDrag(event) {
  if (!drag) return;
  const current = drag;
  current.ghost.remove();
  current.source.classList.remove("drag-source", "moving");
  drag = null;

  if (current.type === "reading") {
    drag = current;
    finishReadingDrop(event);
    drag = null;
  } else {
    drag = current;
    finishCellDrop(event);
    drag = null;
  }
}

function explodeAndReplace(index, element) {
  element.classList.add("explode");
  const used = new Set(cells.map((item) => item.word));
  const next = randomWord(used);
  cells[index] = next;

  const boardRect = board.getBoundingClientRect();
  const cellRect = element.getBoundingClientRect();
  const falling = document.createElement("div");
  falling.className = "falling-cell";
  falling.style.width = `${cellRect.width}px`;
  falling.style.height = `${cellRect.height}px`;
  falling.style.left = `${cellRect.left - boardRect.left}px`;
  falling.style.setProperty("--fall-y", `${cellRect.top - boardRect.top}px`);
  falling.innerHTML = `<strong>${next.word}</strong><span>${next.jlpt}</span>`;
  spawnLayer.appendChild(falling);

  window.setTimeout(() => {
    falling.remove();
    renderBoard();
    renderOptions(next.reading);
  }, 460);
}

options.addEventListener("pointerdown", (event) => {
  const tile = event.target.closest(".match-reading");
  if (!tile) return;
  startReadingDrag(tile, event);
});

board.addEventListener("pointerdown", (event) => {
  const cell = event.target.closest(".match-cell");
  if (!cell) return;
  startCellDrag(cell, event);
});

document.addEventListener("pointermove", (event) => {
  moveGhost(event.clientX, event.clientY);
});

document.addEventListener("pointerup", endDrag);
document.addEventListener("pointercancel", () => {
  if (!drag) return;
  drag.ghost.remove();
  drag.source.classList.remove("drag-source", "moving");
  drag = null;
});

document.querySelector("#newGrid").addEventListener("click", newGrid);
document.querySelector("#addChoices").addEventListener("click", () => {
  renderOptions(randomWord().reading);
  messageEl.textContent = "تم تحديث اختيارات القراءة.";
});

newGrid();
