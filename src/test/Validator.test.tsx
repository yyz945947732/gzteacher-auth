import { render } from "@testing-library/react";

import { Auth, ValidatorProps } from "../index";

const TEXT_INSIDE_PROVIDER = "validator work";

function ValidatorExample({ validator }: ValidatorProps) {
  return (
    <div>
      <Auth.Provider
        auth={{
          "user.watch": true,
          "teacher.watch": true,
        }}
        validator={[
          {
            match: "user.watch",
            validate: () => true,
          },
        ]}
      >
        <Auth.Validator validator={validator}>
          <Auth.Wrapper authCode="user.watch">
            {TEXT_INSIDE_PROVIDER}
          </Auth.Wrapper>
        </Auth.Validator>
      </Auth.Provider>
    </div>
  );
}

describe("Auth.Validator", () => {
  test("Checks if Validator should override Provider's validator", () => {
    const { container } = render(
      <ValidatorExample
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
  test("Checks Validator deny with RegExp use proxy", () => {
    const { container } = render(
      <ValidatorExample
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
  test("Checks Provider's validator still work if Validator not provide validator", () => {
    const { container } = render(<ValidatorExample />);
    const html = container.innerHTML;
    expect(html).toContain(TEXT_INSIDE_PROVIDER);
  });
});
