var fill = document.querySelector(".fill");
fill.onclick = function() {
  // var updateTextTo = document.querySelector('textarea').value;
  var updateTextTo = document.querySelector("#comments").value;
  var textArr = updateTextTo.split(/[\t\n]/); //使用制表符和换行符切分字符串,并且保存到数组中
  var new_textArr = []; //标题字段
  for (let j = 0; j < 3; j++) {
    let temp = [];
    for (let i = j; i < textArr.length; i += 3) {
      temp.push(textArr[i]);
    }
    new_textArr.push(temp);
  }
  chrome.storage.local.set({ new_textArr: new_textArr }, function() {
    console.log("存储成功");
    chrome.tabs.executeScript({
      file: "jq/jquery.min.js"
    });
    chrome.tabs.executeScript({
      file: "from.js"
    });
  });
};
