javascript: void (function() {
  var hash = {};
  var a = document.evaluate(
    '//input[(@type="radio") and not(@value="0")]//@name',
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
  if (a.snapshotLength) {
    for (var i = 0; i < a.snapshotLength; i++) {
      if (!(a.snapshotItem(i).value in hash)) hash[a.snapshotItem(i).value] = 0;
      hash[a.snapshotItem(i).value]++;
    }
    for (i in hash) {
      document
        .evaluate(
          '//input[(@type="radio") and not(@value="0") and @name="' + i + '"]',
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null
        )
        .snapshotItem(Math.floor(Math.random() * hash[i]))
        .click();
    }
  }
  var array = new Array();
  var as = document.getElementsByTagName("a");
  var preName = "";
  var change = false;
  for (var i = 0; i < as.length; i++) {
    if (
      as[i].getAttribute("rel") != null &&
      as[i].nextSibling.getAttribute("type") == "checkbox"
    ) {
      var name = as[i].nextSibling.getAttribute("name");
      var check = as[i].nextSibling.getAttribute("checked");
      if (check == "checked") {
        as[i].click();
      }
      if (preName == "" || preName == name) {
        if (Math.random() * 10 > 5) {
          as[i].click();
          change = true;
        }
      }
      var next = as[i + 1];
      if (
        next.getAttribute("rel") != null &&
        next.nextSibling.getAttribute("type") == "checked" &&
        next.getAttribute("name") != name
      ) {
        if (!change) {
          as[i].click();
        }
        change = false;
      }
      if (i == as.length - 1 && !change) {
        as[i].click();
      }
      preName = name;
    }
  }
  var objs = document.getElementsByTagName("textarea");
  for (var i = 0; i < objs.length; i++) {
    objs[i].focus();
    objs[i].value = "最好的意见就是没有意见，哈哈哈哈哈哈哈";
    objs[i].blur();
  }
  var choose = document.getElementsByTagName("select");
  for (var i = 0; i < choose.length; i++) {
    choose[i].focus();
    choose[i].value = "1";
    choose[i].blur();
  }
})();
function validate() {
  return true;
}
var btn = document.getElementById("submit_button");
window.setTimeout(btn.click(), 2000);
