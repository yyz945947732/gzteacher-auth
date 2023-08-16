/** 判断权限是否匹配 */
export function isMatchAuth(
  auth: Record<string, boolean> = {} /** 权限 */,
  authProxy?: Record<string, string> /** 权限代理 */,
  authCode?: string | string[] /** 权限编号 */
): boolean {
  if (Array.isArray(authCode)) {
    return authCode.some((code) => isMatchAuth(auth, authProxy, code));
  } else {
    if (authCode === undefined || authCode === null) {
      return true;
    }
    const targetAuth = authProxy?.[authCode] ?? authCode;
    const match = auth[targetAuth];
    if (match === true) {
      return true;
    }
    return false;
  }
}
