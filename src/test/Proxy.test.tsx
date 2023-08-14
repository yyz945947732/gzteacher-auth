import { render } from "@testing-library/react";

import { Auth, ProxyProps } from "../index";

const TEST_TEXT = "i am text without auth";

function ProxyExample({ authProxy }: ProxyProps) {
  return (
    <Auth.Provider
      auth={{
        "user.edit": true,
      }}
    >
      <Auth.Proxy authProxy={authProxy}>
        <Auth.Wrapper authCode="user.watch">{TEST_TEXT}</Auth.Wrapper>
      </Auth.Proxy>
    </Auth.Provider>
  );
}

describe("Auth.Proxy", () => {
  test("Checks Wrapper's children display when proxy to right auth", () => {
    const { container } = render(
      <ProxyExample
        authProxy={{
          "user.watch": "user.edit",
        }}
      />
    );
    const text = container.innerHTML;
    expect(text).toContain(TEST_TEXT);
  });

  test("Checks Wrapper's children hidden when proxy to wrong auth", () => {
    const { container } = render(
      <ProxyExample
        authProxy={{
          "user.noAuth": "user.edit",
        }}
      />
    );
    const text = container.innerHTML;
    expect(text).not.toContain(TEST_TEXT);
  });
});
