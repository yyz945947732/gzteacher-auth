/** 判断是否为正则表达式 */
export function isRegExp(val: unknown): val is RegExp {
  return Object.prototype.toString.call(val) === "[object RegExp]";
}
