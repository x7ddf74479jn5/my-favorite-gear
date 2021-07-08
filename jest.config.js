// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({ path: "./.env.test" });

module.exports = {
  roots: ["<rootDir>"],
  moduleFileExtensions: ["js", "ts", "tsx", "json"],
  testPathIgnorePatterns: ["<rootDir>[/\\\\](node_modules)[/\\\\]"],
  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname",
  ],
  transform: { "^.+\\.(js|ts|tsx)$": "babel-jest" },

  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    // "src/(.*)": "<rootDir>/src/$1",
    // "test/(.*)": "<rootDir>/test/$1",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleDirectories: ["node_modules", "<rootDir>/src/"],
  globals: {
    __FB_API_KEY__: process.env.__FB_API_KEY__,
    __FB_AUTH_DOMAIN__: process.env.__FB_AUTH_DOMAIN__,
    __FB_PROJECT_ID__: process.env.__FB_PROJECT_ID__,
    __FB_STORAGE_BUCKET__: process.env.__FB_STORAGE_BUCKET__,
    __FB_MESSAGING_SENDER_ID__: process.env.__FB_MESSAGING_SENDER_ID__,
    __FB_APP_ID__: process.env.__FB_APP_ID__,
  },
  testEnvironment: "jsdom",
};
