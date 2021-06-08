export function dateFormat(fmt, date) {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(), // 年
    "m+": (date.getMonth() + 1).toString(), // 月
    "d+": date.getDate().toString(), // 日
    "H+": date.getHours().toString(), // 时
    "M+": date.getMinutes().toString(), // 分
    "S+": date.getSeconds().toString(), // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(
        ret[1],
        ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
      );
    }
  }
  return fmt;
}
// 树转平级数组
export function treeToArr(tree, keys, childKey = "child") {
  let arr = [];
  function forTree(tree) {
    // console.log(tree,"??")
    tree.forEach((item) => {
      let obj = {};
      keys.forEach((e) => {
        obj[e] = item[e];
      });
      arr.push(obj);
      if (item[childKey] && item[childKey].length) {
        forTree(item[childKey]);
      } else {
        return;
      }
    });
  }
  forTree(tree);
  return arr;
}
// 两数组差
export function getDifferentArr(allArr, partArr, key = "id") {
  const arr = [...allArr].filter((x) =>
    [...partArr].every((y) => y[key] !== x[key])
  );
  return arr;
}
//时间换算
export function formatDuring(time){
  var days = parseInt(time / (1000 * 60 * 60 * 24));
  var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60));
  return days>0 ? days + "天" + hours + "小时" + minutes + "分" : hours + "小时" + minutes + "分"
}



