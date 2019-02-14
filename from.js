chrome.storage.local.get("new_textArr", function(arr) {
  var titleArr = arr.new_textArr[0];
  var stateArr = arr.new_textArr[1];
  var checkArr = arr.new_textArr[2];
  // chrome.storage.local.remove('new_textArr');
  chrome.storage.local.clear(function() {
    console.log("数据已删除");
  });

  var createRow = function() {
    var $form = $("#batchCreateForm"); //获取表格
    // var batchForm = $form.data('zui.batchActionForm');//获取表格-带数据
    var $formTbody = $form.find("table > tbody"); //获取表格体
    var lastIndex = parseInt($formTbody.find("tr:last > td:first").text()); //获取表格体数量
    console.log("输出断点-表格数量" + lastIndex);
    // batchForm.createRow()
    var lastTr = $formTbody.find("tr:last"); //获取最后一行的数据
    var reg_all = /(\d+)(?=\]"\sid)|(\d+)(?=\]"\sva)|(\d+)(?="\scl)|(\d+)(?="\sva)|(\d+)(?=_ch)|(\d+)(?="\srow)|(\d+)(?="\sna)/g;
    var reg = new RegExp(reg_all);
    var new_html = lastTr.html().replace(reg, lastIndex); //获取全局替换的数据
    var html_first = '<tr data-row="' + lastIndex + '" class="">'; //修改tr数
    var html_last = "</tr>";
    var reg2 = /(\d+)(?=<\/td>)/; //捕获td col-id =的数字
    var new_html2 = new_html.replace(reg2, lastIndex + 1);
    var new_html4 = html_first + new_html2 + html_last;
    $formTbody.append(new_html4); //获取最后一行表格体数据并且添加到最后一行
  };

  //写入标题
  setTimeout(function() {
    let $form = $("#batchCreateForm");
    let batchForm = $form.data("zui.batchActionForm");
    let lines1 = titleArr; //把输入的文字数组
    let lines2 = stateArr; //把输入的文字数组
    let lines3 = checkArr; //把输入的文字数组

    let $lastRow, $firstRow;

    $.each(lines1, function(index, line) {
      // let $row;
      line = $.trim(line);
      if (!line.length) return;
      if (!$lastRow) $row = $form.find("tbody>tr:first");
      //不为空就等于第一行表格
      else $row = $lastRow.next(); //空就等于最后一行表格
      while ($row.length && $row.find(".title-import").val().length) {
        $row = $row.next();
      }
      if (!$row || !$row.length) {
        // if (batchForm) $row = batchForm.createRow();
        // else $row = createRow();
        $row = createRow();
        $row = $form.find("tbody>tr:last");
      }
      $row
        .find(".title-import")
        .val(line)
        .addClass("highlight");
      $lastRow = $row;
      if (!$firstRow) $firstRow = $row;
    });

    $.each(lines2, function(index, line) {
      let $lastRow, $firstRow;
      let $row;
      line = $.trim(line);
      if (!line.length) return;
      if (!$lastRow) $row = $form.find("tbody>tr:first");
      else $row = $lastRow.next();
      while ($row.length && $row.find("textarea[name^='spec']").val().length) {
        $row = $row.next();
      }
      if (!$row || !$row.length) {
        // if (batchForm) $row = batchForm.createRow();
        // else $row = createRow();
        $row = createRow();
        $row = $form.find("tbody>tr:first");
      }
      $row
        .find("textarea[name^='spec']")
        .val(line)
        .addClass("highlight");
      $lastRow = $row;
      if (!$firstRow) $firstRow = $row;
    });

    $.each(lines3, function(index, line) {
      let $row;
      let $lastRow, $firstRow;
      line = $.trim(line);
      if (!line.length) return;
      if (!$lastRow) $row = $form.find("tbody>tr:first");
      else $row = $lastRow.next();
      while (
        $row.length &&
        $row.find("textarea[name^='verify']").val().length
      ) {
        $row = $row.next();
      }
      if (!$row || !$row.length) {
        // if (batchForm) $row = batchForm.createRow();
        // else $row = createRow();
        $row = createRow();
        $row = $form.find("tbody>tr:first");
      }
      $row
        .find("textarea[name^='verify']")
        .val(line)
        .addClass("highlight");
      $lastRow = $row;
      if (!$firstRow) $firstRow = $row;
    });
  }, 200);
});
