import { fireEvent, render, screen } from "@testing-library/react";
import { HashRouter, Link, Route, Routes } from "react-router-dom6";

import { Auth } from "../index";

const PAGE_1_CONTENT = "index";
const PAGE_2_CONTENT = "about";
const PAGE_3_CONTENT = "info";
const PAGE_4_CONTENT = "secret";
const PAGE_1_HTML = `<h1>${PAGE_1_CONTENT}</h1>`;
const PAGE_2_HTML = `<h1>${PAGE_2_CONTENT}</h1>`;
const PAGE_3_HTML = `<h1>${PAGE_3_CONTENT}</h1>`;
const PAGE_4_HTML = `<h1>${PAGE_4_CONTENT}</h1>`;
const NO_AUTH_CONTENT = "没权限";

const ROUTES = [
  {
    path: "/",
    auth: "page.index",
  },
  {
    path: "/about",
    auth: "page.about",
  },
  {
    path: "/info",
    auth: "page.info",
  },
  {
    path: "/secret",
    auth: "page.secret",
  },
];

function RouteGuardExample() {
  return (
    <HashRouter>
      <Auth.Provider
        auth={{
          "page.index": true,
          "page.about": true,
          "page.info": true,
        }}
      >
        <ul>
          <li>
            <Link data-testid="index" to="/">
              首页
            </Link>
          </li>
          <li>
            <Link data-testid="about" to="/about">
              关于我们
            </Link>
          </li>
          <li>
            <Link data-testid="info" to="/info">
              个人信息
            </Link>
          </li>
          <li>
            <Link data-testid="secret" to="/secret">
              内部机密
            </Link>
          </li>
        </ul>
        <Auth.RouteGuard routes={ROUTES} NoAuthFallback={NO_AUTH_CONTENT}>
          <Routes>
            <Route path="/" element={<h1>{PAGE_1_CONTENT}</h1>} />
            <Route path="/about" element={<h1>{PAGE_2_CONTENT}</h1>} />
            <Route path="/info" element={<h1>{PAGE_3_CONTENT}</h1>} />
            <Route path="/secret" element={<h1>{PAGE_4_CONTENT}</h1>} />
          </Routes>
        </Auth.RouteGuard>
      </Auth.Provider>
    </HashRouter>
  );
}

describe("Auth.RouteGuard", () => {
  test("Check if Route's children without auth should not be render", () => {
    const { container } = render(<RouteGuardExample />);
    const linkSecret = screen.getByTestId("secret");
    fireEvent.click(linkSecret);
    const html = container.innerHTML;
    expect(html).toContain(NO_AUTH_CONTENT);
    expect(html).not.toContain(PAGE_4_HTML);
  });
  test("Check if Route's children with auth should be render", () => {
    const { container } = render(<RouteGuardExample />);
    const indexSecret = screen.getByTestId("index");
    const aboutSecret = screen.getByTestId("about");
    const infoSecret = screen.getByTestId("info");
    fireEvent.click(indexSecret);
    let html = container.innerHTML;
    expect(html).toContain(PAGE_1_HTML);
    expect(html).not.toContain(NO_AUTH_CONTENT);
    fireEvent.click(aboutSecret);
    html = container.innerHTML;
    expect(html).toContain(PAGE_2_HTML);
    expect(html).not.toContain(NO_AUTH_CONTENT);
    fireEvent.click(infoSecret);
    html = container.innerHTML;
    expect(html).toContain(PAGE_3_HTML);
    expect(html).not.toContain(NO_AUTH_CONTENT);
  });
});
