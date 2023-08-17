import { render } from "@testing-library/react";

import { Auth, ProviderProps } from "../index";

const TEXT_INSIDE_PROVIDER = "inside provider";

function ProviderExample({ auth, disabled }: ProviderProps) {
  return (
    <div>
      <Auth.Provider auth={auth} disabled={disabled}>
        <Auth.Wrapper authCode="user.watch">
          {TEXT_INSIDE_PROVIDER}
        </Auth.Wrapper>
      </Auth.Provider>
    </div>
  );
}

describe("Auth.Provider", () => {
  test("Checks Wrapper inside Provider without auth should be hidden", () => {
    const { container } = render(<ProviderExample auth={{}} />);
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper inside Provider with auth should still display", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper without auth inside Provider should display when disabled is true", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.edit": true,
        }}
        disabled
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });
});
