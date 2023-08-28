import { renderHook } from "@testing-library/react";

import { Auth, useAuthData } from "../index";

const MOCK_AUTH_DATA = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    auth: "Akali",
    children: [
      {
        name: "Alistar",
        key: "3",
        auth: "Alistar",
      },
      {
        name: "Aphelios",
        key: "3",
        auth: "Aphelios",
        children: [
          {
            name: "Azir",
            key: "4",
            auth: "Azir",
          },
          {
            name: "Irelia",
            key: "5",
            auth: "Irelia",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Kassadin",
    key: "7",
    auth: "Kassadin",
  },
  {
    name: "Maokai",
    key: "9",
    auth: "Maokai",
  },
  {
    name: "Ryze",
    key: "10",
    auth: "Ryze",
    children: [
      {
        name: "Yasuo",
        key: "10",
        auth: "Yasuo",
      },
    ],
  },
];

const MOCK_AUTH_DATA_2 = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    access: "Akali",
    children: [
      {
        name: "Alistar",
        key: "3",
        access: "Alistar",
      },
      {
        name: "Aphelios",
        key: "3",
        access: "Aphelios",
        children: [
          {
            name: "Azir",
            key: "4",
            access: "Azir",
          },
          {
            name: "Irelia",
            key: "5",
            access: "Irelia",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Kassadin",
    key: "7",
    access: "Kassadin",
  },
  {
    name: "Maokai",
    key: "9",
    access: "Maokai",
  },
  {
    name: "Ryze",
    key: "10",
    access: "Ryze",
    children: [
      {
        name: "Yasuo",
        key: "10",
        access: "Yasuo",
      },
    ],
  },
];

const EXPECT_DATA_FOR_TEST_1 = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    auth: "Akali",
    children: [
      {
        name: "Alistar",
        key: "3",
        auth: "Alistar",
      },
      {
        name: "Aphelios",
        key: "3",
        auth: "Aphelios",
        children: [
          {
            name: "Irelia",
            key: "5",
            auth: "Irelia",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Maokai",
    key: "9",
    auth: "Maokai",
  },
];

const EXPECT_DATA_FOR_TEST_2 = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    auth: "Akali",
    children: [
      {
        name: "Alistar",
        key: "3",
        auth: "Alistar",
      },
      {
        name: "Aphelios",
        key: "3",
        auth: "Aphelios",
        children: [
          {
            name: "Azir",
            key: "4",
            auth: "Azir",
          },
          {
            name: "Irelia",
            key: "5",
            auth: "Irelia",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Maokai",
    key: "9",
    auth: "Maokai",
  },
];

const EXPECT_DATA_FOR_TEST_3 = [...EXPECT_DATA_FOR_TEST_2];

const EXPECT_DATA_FOR_TEST_4 = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    access: "Akali",
    children: [
      {
        name: "Alistar",
        key: "3",
        access: "Alistar",
      },
      {
        name: "Aphelios",
        key: "3",
        access: "Aphelios",
        children: [
          {
            name: "Irelia",
            key: "5",
            access: "Irelia",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Maokai",
    key: "9",
    access: "Maokai",
  },
];

const EXPECT_DATA_FOR_TEST_5 = [
  {
    name: "Ahri",
    key: "1",
  },
  {
    name: "Akali",
    key: "2",
    children: [
      {
        name: "Alistar",
        key: "3",
      },
      {
        name: "Aphelios",
        key: "3",
        children: [
          {
            name: "Irelia",
            key: "5",
          },
          {
            name: "Janna",
            key: "6",
          },
        ],
      },
    ],
  },
  {
    name: "Maokai",
    key: "9",
  },
];

const AUTH = {
  Akali: true,
  Alistar: true,
  Aphelios: true,
  Irelia: true,
  Janna: true,
  Maokai: true,
};

function Wrapper({ children }: { children: React.ReactNode }) {
  return <Auth.Provider auth={AUTH}>{children}</Auth.Provider>;
}

describe("useAuthData", () => {
  test("Check if useAuthData filter data by auth", () => {
    const { result } = renderHook(() => useAuthData(MOCK_AUTH_DATA), {
      wrapper: Wrapper,
    });
    expect(result.current).toEqual(EXPECT_DATA_FOR_TEST_1);
  });
  test("Check if useAuthData should not filter children if isTree is false", () => {
    const { result } = renderHook(
      () => useAuthData(MOCK_AUTH_DATA, { isTree: false }),
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual(EXPECT_DATA_FOR_TEST_2);
  });
  test("Check if useAuthData should not filter children if childrenKey is not children", () => {
    const { result } = renderHook(
      () => useAuthData(MOCK_AUTH_DATA, { childrenKey: "child" }),
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual(EXPECT_DATA_FOR_TEST_3);
  });
  test("Check if useAuthData should filter auth if authKey is custom key", () => {
    const { result } = renderHook(
      () => useAuthData(MOCK_AUTH_DATA_2, { authKey: "access" }),
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual(EXPECT_DATA_FOR_TEST_4);
  });
  test("Check if auth should not be preserve if isPreserveAuthKey is false", () => {
    const { result } = renderHook(
      () => useAuthData(MOCK_AUTH_DATA, { isPreserveAuthKey: false }),
      {
        wrapper: Wrapper,
      }
    );
    expect(result.current).toEqual(EXPECT_DATA_FOR_TEST_5);
  });
});
