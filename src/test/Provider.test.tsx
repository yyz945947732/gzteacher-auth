import { render } from "@testing-library/react";

import { Auth, ProviderProps } from "../index";

const TEXT_INSIDE_PROVIDER = "inside provider";

function ProviderExample({ auth }: ProviderProps) {
  return (
    <div>
      <Auth.Provider auth={auth}>
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
    const text = container.innerHTML;
    expect(text).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper inside Provider with auth should still display", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
      />
    );
    const text = container.innerHTML;
    expect(text).toContain(TEXT_INSIDE_PROVIDER);
  });
});
