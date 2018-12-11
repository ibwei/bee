function getCurrentDate(date = new Date()) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  m = m < 10 ? "0" + m : m;
  let d = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  let h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let f = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return y + "年" + m + "月" + d + "日 " + h + ":" + f + ":" + s;
}

export default getCurrentDate;
