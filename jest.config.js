module.exports = {
  roots: ['<rootDir>'],
  collectCoverage: false,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  testMatch: ['**/*.test.ts']
}