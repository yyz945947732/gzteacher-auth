import { render } from "@testing-library/react";
import React from "react";

import { Auth, withAuth } from "../index";

const AUTH = {
  love: true,
  peace: true,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Auth.Provider auth={AUTH}>{children}</Auth.Provider>;
}

class Page extends React.Component<any> {
  auth: any;
  constructor(props: any) {
    super(props);
    const { auth } = props;
    this.auth = auth;
  }
  render(): React.ReactNode {
    const auth = this.auth;
    return (
      <ul>
        <li>{auth["love"] ? "LOVE" : ""}</li>
        <li>{auth["war"] ? "WAR" : ""}</li>
      </ul>
    );
  }
}

const AuthPage = withAuth(Page);

describe("withAuth", () => {
  test("Check if class component use withAuth can get auth", () => {
    const { container } = render(<AuthPage />, {
      wrapper: Wrapper,
    });
    const html = container.innerHTML;
    expect(html).toContain("LOVE");
    expect(html).not.toContain("WAR");
  });
});
