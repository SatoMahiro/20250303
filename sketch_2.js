let input;
let slider;
let sliderLabel;
let button;
let dropdown;
let iframe;
let isJumping = false;
let offsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput(); // 產生一個文字框
  input.position(10, 10); // 設定文字框的位置為(10,10)
  input.size(300, 50); // 設定文字框的大小
  input.value('淡江大學'); // 設定文字框的預設文字
  input.style('font-size', '50px'); // 設定文字框的字體大小
  
  slider = createSlider(28, 50, 32); // 產生一個滑桿，範圍從28到50，初始值為32
  slider.position(input.x + input.width + 10, 25); // 設定滑桿的位置在文字框的右側
  
  // 添加滑桿說明文字
  sliderLabel = createDiv('文字大小'); // 產生一個文字標籤
  sliderLabel.style('color', 'white'); // 設定文字標籤的顏色為白色
  sliderLabel.position(slider.x + slider.width + 10, 25); // 設定文字標籤的位置在滑桿的右側
  
  // 添加按鈕
  button = createButton('跳動');
  button.position(windowWidth/2-450 + windowHeight/2-450 , 10); // 設定按鈕的位置在文字標籤的右側(手動調整)
  button.size(200, 50); // 設定按鈕的寬度和高度
  button.style('font-size', '35px'); // 設定按鈕的字體大小
  button.mousePressed(toggleJumping);

  // 添加下拉式選單
  dropdown = createSelect();
  dropdown.position(button.x + button.width +10, 10);
  dropdown.size(200, 50); // 設定下拉式選單的寬度和高度
  dropdown.style('font-size', '35px'); // 設定下拉式選單的字體大小
  dropdown.option('淡江大學');
  dropdown.option('教科系');
  dropdown.option('第三周');
  dropdown.changed(loadIframe);

  // 添加 iframe
  iframe = createElement('iframe');
  iframe.position(100, 100);
  iframe.size(windowWidth - 200, windowHeight - 200);
  iframe.hide();
}

function draw() {
  background(0); // 將背景顏色改為黑色
  let inputText = input.value();
  let textSizeValue = slider.value(); // 根據滑桿的值設置文字大小
  textAlign(LEFT, CENTER);
  textSize(textSizeValue);
  fill(255); // 設定文字顏色為白色
  let y = input.y + input.height + 30; // 確保文字顯示在文字框以下，稍微調整高度起點
  
  if (isJumping) {
    for (let i = 0; i < inputText.length; i++) {
      if (offsets.length < inputText.length) {
        offsets.push(random(0, TWO_PI));
      }
      offsets[i] += 0.1;
    }
  }

  for (let yPos = y; yPos < height; yPos += 40) { // 每行間隔40像素
    let x = 0;
    for (let i = 0; x < width; i++) {
      let charOffset = isJumping ? sin(offsets[i % inputText.length]) * 20 : 0;
      text(inputText, x, yPos + charOffset);
      x += textWidth(inputText + ' ');
    }
  }
}

function toggleJumping() {
  isJumping = !isJumping;
  if (!isJumping) {
    offsets = [];
  }
}

function loadIframe() {
  let url;
  switch (dropdown.value()) {
    case '淡江大學':
      url = 'https://www.tku.edu.tw';
      break;
    case '教科系':
      url = 'https://www.et.tku.edu.tw';
      break;
    case '第三周':
      url = 'https://satomahiro.github.io/20250310/';
      break;
  }
  iframe.attribute('src', url);
  iframe.show();
}
