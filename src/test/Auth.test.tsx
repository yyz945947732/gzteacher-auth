import { render } from "@testing-library/react";

import { Auth, WrapperProps } from "../index";

const TEST_TEXT = "auth allow";

function AuthExample({ authCode }: WrapperProps) {
  return (
    <Auth.Provider
      auth={{
        "user.watch": true,
        "user.add": true,
      }}
    >
      <Auth authCode={authCode}>{TEST_TEXT}</Auth>
    </Auth.Provider>
  );
}

describe("Auth", () => {
  test("Checks if Auth display as Auth.Wrapper", () => {
    const { container } = render(<AuthExample authCode="user.watch" />);
    const html = container.innerHTML;
    expect(html).toEqual(TEST_TEXT);
  });
});
