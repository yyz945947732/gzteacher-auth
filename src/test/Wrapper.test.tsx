import { render } from "@testing-library/react";

import { Auth, WrapperProps } from "../index";

const TEST_TEXT = "auth allow";

function WrapperExample({ authCode }: WrapperProps) {
  return (
    <Auth.Provider
      auth={{
        "user.watch": true,
        "user.add": true,
      }}
    >
      <Auth.Wrapper authCode={authCode}>{TEST_TEXT}</Auth.Wrapper>
    </Auth.Provider>
  );
}

describe("Auth.Wrapper", () => {
  test("Checks Wrapper's children display with auth", () => {
    const { container } = render(<WrapperExample authCode="user.watch" />);
    const html = container.innerHTML;
    expect(html).toEqual(TEST_TEXT);
  });

  test("Checks Wrapper's children hidden without auth", () => {
    const { container } = render(<WrapperExample authCode="user.noAuth" />);
    const html = container.innerHTML;
    expect(html).not.toEqual(TEST_TEXT);
  });

  test("Checks Wrapper's children display when one of auth is match", () => {
    const { container } = render(
      <WrapperExample authCode={["user.noAuth", "user.watch"]} />
    );
    const html = container.innerHTML;
    expect(html).toEqual(TEST_TEXT);
  });

  test("Checks Wrapper's children display when no authCode is provide", () => {
    const { container } = render(<WrapperExample />);
    const html = container.innerHTML;
    expect(html).toEqual(TEST_TEXT);
  });
});
