import { render } from "@testing-library/react";

import { Auth, DenyWrapperProps } from "../index";

const TEST_TEXT = "auth deny";

function DenyWrapperExample({ authCode }: DenyWrapperProps) {
  return (
    <Auth.Provider
      auth={{
        "user.deny": true,
      }}
    >
      <Auth.DenyWrapper authCode={authCode}>{TEST_TEXT}</Auth.DenyWrapper>
    </Auth.Provider>
  );
}

describe("Auth.DenyWrapper", () => {
  test("Checks DenyWrapper's children display without auth", () => {
    const { container } = render(<DenyWrapperExample authCode="user.watch" />);
    const text = container.innerHTML;
    expect(text).toEqual(TEST_TEXT);
  });

  test("Checks DenyWrapper's children hidden with auth", () => {
    const { container } = render(<DenyWrapperExample authCode="user.deny" />);
    const text = container.innerHTML;
    expect(text).not.toEqual(TEST_TEXT);
  });
});
