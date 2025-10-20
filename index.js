// 問題データ: [本文, 解説, 正解("まる"|"ばつ")]
const questions = [
  ["地震が発生した時、まず最初にやるべきことは、ドアや窓を開けて避難経路を確保することである。", "まず自分の身を守るため、机の下などに隠れて頭を保護することが最優先です。", "ばつ"],
  ["災害に備える非常食は、最低でも3日分を用意しておくのが望ましい。", "大規模災害では救助が本格化するまで時間がかかるため、最低3日、できれば1週間分の食料と水が必要です。", "まる"],
  ["家具の転倒を防ぐためには、家具の上に重いものを置くと安定する。", "家具はL字金具などで壁に固定を。上に重い物を置くとかえって危険です。", "ばつ"],
  ["災害が発生したら、すぐに指定された避難所へ避難するべきである。", "自宅が安全なら在宅避難も選択肢。まず自宅の安全を確認し、状況に応じて行動を。", "ばつ"],
  ["地震で火災が発生した場合、自分の身の安全よりも消火を優先するべきである。", "まずは自身の安全確保。初期消火が可能な場合にのみ、無理のない範囲で。", "ばつ"],
  ["大きな地震の後でも、水道が止まっていなければ家のトイレは普段通り使える。", "排水管損傷の恐れ。逆流を招くことがあるため携帯トイレの準備が重要。", "ばつ"],
  ["災害時、最も信頼できる情報は、近所の人からの口コミである。", "口コミは誤情報の可能性。公的情報源（自治体/ラジオ/TV等）で確認を。", "ばつ"],
  ["非常用持ち出し袋は、家の奥の物置など、安全な場所に保管しておくのが良い。", "いざという時すぐ持ち出せる玄関や寝室など“取り出しやすい場所”に。", "ばつ"],
  ["車で避難の途中に車を置いて逃げる際は、緊急車両が動かせるようキーは付けたままにするべきである。", "道路を塞がないよう施錠せず、キーは付けたまま（または分かる場所へ）。", "まる"],
  ["海岸近くで地震を感じたら、津波警報を待ってから避難すれば十分である。", "強い揺れや長い揺れを感じたら、警報を待たず直ちに高台へ避難。", "ばつ"],
];

// 要素取得（※ question.html 側で id を付与している）
const qNoEl = document.getElementById("question_number");
const qTextEl = document.getElementById("question_contents");
const okBtn  = document.getElementById("okbutton");
const noBtn  = document.getElementById("nobutton");

// 進捗をlocalStorageから復元
let idx = Number(localStorage.getItem("quizIdx") || "0");
let score = Number(localStorage.getItem("quizScore") || "0");

// 表示更新
function render() {
  if (idx >= questions.length) {
    // 全問終了時は結果ページに飛んで集計表示させる
    localStorage.setItem("lastDone", "1");
    window.location.href = "result1.html";
    return;
  }
  qNoEl.textContent = `第${idx + 1}問`;
  qTextEl.textContent = questions[idx][0];
}
render();

// 回答チェック → 結果ページへ
function answer(choice) {
  const correct = questions[idx][2]; // "まる" or "ばつ"
  const isCorrect = (choice === correct);
  const explain = questions[idx][1];

  // スコア更新
  if (isCorrect) score++;
  // 進捗を保存
  localStorage.setItem("quizIdx", String(idx + 1));
  localStorage.setItem("quizScore", String(score));
  localStorage.setItem("lastCorrect", isCorrect ? "1" : "0");
  localStorage.setItem("lastExplain", explain);
  localStorage.setItem("lastAnswer", choice);

  // 結果表示へ
  window.location.href = "result1.html";
}

// ボタンイベント
okBtn.addEventListener("click", () => answer("まる"));
noBtn.addEventListener("click", () => answer("ばつ"));
