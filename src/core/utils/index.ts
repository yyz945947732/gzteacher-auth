interface Options {
  /** 权限 */
  auth?: Record<string, boolean>;
  /** 权限代理 */
  authProxy?: Record<string, string>;
  /** 权限编号 */
  authCode?: string | string[];
  /** 是否关闭权限限制，默认 `false` */
  disabled?: boolean;
}

/** 判断权限是否匹配 */
export function isMatchAuth(options: Options): boolean {
  const { auth = {}, authCode, authProxy, disabled } = options;
  if (disabled === true) {
    return true;
  }
  if (Array.isArray(authCode)) {
    return authCode.some((code) =>
      isMatchAuth({
        auth,
        authProxy,
        authCode: code,
      })
    );
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
