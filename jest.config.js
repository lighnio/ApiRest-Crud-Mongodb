export default {
    coveragePathIgnorePatterns: 
    [
        "/node_modules/"
    ],
    testEnvironment: 'jest-environment-node',
    transform: {},
    globalTeardown: './global-kill.js',
    coverageReporters: ["json", "html"]
    
};