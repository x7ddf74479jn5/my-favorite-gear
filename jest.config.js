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
    "^.+\\.module\\.(css|scss)$": "identity-obj-proxy",
    "\\.(css|scss)$": "<rootDir>/test/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__mocks__/fileMock.js",
    "src/(.*)": "<rootDir>/src/$1",
    "test/(.*)": "<rootDir>/test/$1",
  },
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  globalSetup: "<rootDir>/test/setupEnv.ts",
};
