/** 判断权限是否匹配 */
export function isMatchAuth(
  auth: Record<string, boolean> = {} /** 权限 */,
  authProxy?: Record<string, string> /** 权限代理 */,
  authCode?: string | string[] /** 权限编号 */
): boolean {
  if (Array.isArray(authCode)) {
    return authCode.some((code) => isMatchAuth(auth, authProxy, code));
  } else {
    const targetAuth = authCode ? authProxy?.[authCode] || authCode : authCode;
    const match = targetAuth ? auth[targetAuth] : true;
    return match;
  }
}
