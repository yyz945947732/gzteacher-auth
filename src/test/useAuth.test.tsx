import { act, renderHook } from "@testing-library/react";

import { Auth, useAuth } from "../index";

const AUTH = {
  love: true,
  peace: true,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Auth.Provider auth={AUTH}>{children}</Auth.Provider>;
}

describe("useAuth", () => {
  test("Check if useAuth return correct auth", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: Wrapper,
    });
    const [auth] = result.current;
    expect(auth).toEqual({
      love: true,
      peace: true,
    });
  });
  test("Check if auth setter can change useAuth return's auth", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: Wrapper,
    });
    const [, setAuth] = result.current;
    act(() => {
      setAuth({
        love: true,
        peace: true,
        beauty: true,
      });
    });
    expect(result.current?.[0]).toEqual({
      love: true,
      peace: true,
      beauty: true,
    });
  });
});
