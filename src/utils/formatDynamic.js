export function formatDynamic(dynamic) {
  var index = dynamic.replace(/[\r\n]/g, "|").indexOf("|");
  if (index > 0) {
    var stream = dynamic.substring(1, index - 1);
  } else {
    var stream = dynamic.substring(1, dynamic.length - 1);
  }
  let i = 0
  var list = stream.split("#");
  for (; i < list.length; i++) {
    if (list[i].length > 10 || list[i].length == 0) {
      list.splice(i, 1)
      i--
    }
  }
  return list;
}
