import { render } from "@testing-library/react";

import { Auth, ProviderProps } from "../index";

const TEXT_INSIDE_PROVIDER = "inside provider";

function ProviderExample({ auth, disabled, validator }: ProviderProps) {
  return (
    <div>
      <Auth.Provider auth={auth} disabled={disabled} validator={validator}>
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

  test("Checks Wrapper with auth inside Provider should display when auth is Array type", () => {
    const { container } = render(
      <ProviderExample auth={["user.edit", "user.watch"]} />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper without auth inside Provider should display when auth is Array type", () => {
    const { container } = render(
      <ProviderExample auth={["user.edit", "user.del"]} />
    );
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper with auth inside Provider should display when auth is String type", () => {
    const { container } = render(
      <ProviderExample auth="user.watch,user.edit" />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Wrapper without auth inside Provider should display when auth is String type", () => {
    const { container } = render(<ProviderExample auth="user.edit,user.del" />);
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator pass with string type match", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
        validator={[
          {
            match: "user.watch",
            validate: () => true,
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator deny with string type match", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
        validator={[
          {
            match: "user.watch",
            validate: () => false,
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator works in serial", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
        validator={[
          {
            match: "user.edit",
            validate: () => false,
          },
          {
            match: "user.watch",
            validate: () => false,
          },
          {
            match: "user.watch",
            validate: () => true,
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator pass with RegExp type match", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.edit": true,
        }}
        validator={[
          {
            match: /user\.(.*)/,
            validate: () => true,
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator deny with RegExp type match", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.edit": true,
        }}
        validator={[
          {
            match: /user\.(.*)/,
            validate: () => false,
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator pass with RegExp use proxy", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "teacher.watch": true,
        }}
        validator={[
          {
            match: /user\.(.*)/,
            validate: (authCode, auth) => {
              const [, code] = authCode.split(".");
              if (auth[`teacher.${code}`]) {
                return true;
              }
              return false;
            },
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });

  test("Checks Validator pass with RegExp use proxy", () => {
    const { container } = render(
      <ProviderExample
        auth={{
          "user.watch": true,
        }}
        validator={[
          {
            match: /user\.(.*)/,
            validate: (authCode, auth) => {
              const [, code] = authCode.split(".");
              if (auth[`teacher.${code}`]) {
                return true;
              }
              return false;
            },
          },
        ]}
      />
    );
    const html = container.innerHTML;
    expect(html).not.toContain(TEXT_INSIDE_PROVIDER);
  });
});
