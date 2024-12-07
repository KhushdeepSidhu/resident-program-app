module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  clearMocks: true,
  coverageDirectory: './test-result',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: './test-result',
        addFileAttribute: 'true',
        includeConsoleOutput: true,
        reportTestSuiteErrors: true,
      },
    ],
  ],
  setupFilesAfterEnv: ['./setupTests.js'],
  transformIgnorePatterns: ['node_modules/(?!(@libs)/)', '\\.pnp\\.[^\\/]+$'],
  // transform: {
  //   '^.+\\.jsx?$': 'babel-jest',
  //   '^.+\\.tsx?$': 'babel-jest',
  // },
};
