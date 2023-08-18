/**
 * 检查对象中是否有某个属性
 */
export function has<T>(object: T, key: string): boolean {
  return object != null && Object.prototype.hasOwnProperty.call(object, key);
}

export default has;
