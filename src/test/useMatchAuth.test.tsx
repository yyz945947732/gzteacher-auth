import { renderHook } from "@testing-library/react";

import { Auth, useMatchAuth } from "../index";

const AUTH = {
  react: true,
  vue: true,
  angular: true,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Auth.Provider auth={AUTH}>{children}</Auth.Provider>;
}

describe("useMatchAuth", () => {
  test("Check if useMatchAuth return true with auth", () => {
    const { result } = renderHook(() => useMatchAuth("react"), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(true);
  });
  test("Check if useMatchAuth return false without auth", () => {
    const { result } = renderHook(() => useMatchAuth("svelte"), {
      wrapper: Wrapper,
    });
    expect(result.current).toBe(false);
  });
});
