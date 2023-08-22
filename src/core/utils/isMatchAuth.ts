import type { ProviderProps } from "../index";

interface Options extends Omit<ProviderProps, "children"> {
  /** 权限代理 */
  authProxy?: Record<string, string>;
  /** 权限编号 */
  authCode?: string | string[];
}

/** 判断权限是否匹配 */
export function isMatchAuth(options: Options): boolean {
  const { auth = {}, authCode, authProxy, validator, disabled } = options;
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
    let isValidatorPass: boolean | null = null;
    if (Array.isArray(validator)) {
      for (const { match, validate } of validator) {
        const isRegMatch = isRegExp(match) && match.test(targetAuth);
        const isStrMatch = typeof match === "string" && match === targetAuth;
        if (isRegMatch || isStrMatch) {
          const isPass = validate(targetAuth, auth);
          if (typeof isPass === "boolean") {
            isValidatorPass = isPass;
          }
          break;
        }
      }
    }
    if (typeof isValidatorPass === "boolean") {
      return isValidatorPass;
    }
    if (Array.isArray(auth)) {
      return auth.includes(targetAuth);
    }
    if (typeof auth === "string") {
      const authArr = auth.split(",");
      return authArr.includes(targetAuth);
    }
    const match = auth[targetAuth];
    if (match === true) {
      return true;
    }
    return false;
  }
}

function isRegExp(val: unknown): val is RegExp {
  return Object.prototype.toString.call(val) === "[object RegExp]";
}
