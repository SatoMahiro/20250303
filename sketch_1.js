let input;

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput(); // 產生一個文字框
  input.position(10, 10); // 設定文字框的位置為(10,10)
  input.size(300, 50); // 設定文字框的大小
  input.value('淡江大學'); // 設定文字框的預設文字
  input.style('font-size', '50px'); // 設定文字框的字體大小
}

function draw() {
  background(0); // 將背景顏色改為黑色
  let inputText = input.value();
  textAlign(LEFT, CENTER);
  textSize(32);
  fill(255); // 設定文字顏色為白色
  let y = input.y + input.height + 30; // 確保文字顯示在文字框以下，稍微調整高度起點
  for (let yPos = y; yPos < height; yPos += 40) { // 每行間隔40像素
    let x = 0;
    while (x < width) {
      text(inputText, x, yPos);
      x += textWidth(inputText + ' ');
    }
  }
}
