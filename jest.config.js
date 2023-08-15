/* eslint-disable no-undef */
module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/test/*.(ts|tsx)"],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
  coverageReporters: ["text", "lcov"],
  moduleDirectories: ["node_modules"],
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
  testEnvironment: "jest-environment-jsdom",
  testEnvironmentOptions: {
    url: "http://localhost",
    customExportConditions: ["node"],
  },
  testMatch: ["<rootDir>/src/test/*.(spec|test).(ts|tsx)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.(jsx|js)?$": "babel-jest",
    "^.+\\.(tsx|ts)?$": "ts-jest",
    "^.+\\.css$": "<rootDir>/src/scripts/jest-css-transform.js",
  },
  transformIgnorePatterns: ["!node_modules/"],
  verbose: false,
};
