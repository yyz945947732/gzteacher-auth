import { render } from "@testing-library/react";

import { Auth, ButtonProps } from "../index";

const TEST_TEXT = "i am text without auth";

function ButtonExample({ authCode }: ButtonProps) {
  return (
    <Auth.Provider
      auth={{
        "user.edit": true,
      }}
    >
      <Auth.Button authCode={authCode}>{TEST_TEXT}</Auth.Button>
    </Auth.Provider>
  );
}

describe("Auth.Button", () => {
  test("Check if Button display as button with auth", () => {
    const { container } = render(<ButtonExample authCode="user.edit" />);
    const html = container.innerHTML;
    expect(html).toContain("</button>");
    expect(html).toContain(TEST_TEXT);
  });

  test("Check if Button display as text without auth", () => {
    const { container } = render(<ButtonExample authCode="user.noAuth" />);
    const html = container.innerHTML;
    expect(html).not.toContain("</button>");
    expect(html).toContain(TEST_TEXT);
  });
});
