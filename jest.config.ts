import { compilerOptions } from './tsconfig.json'
import { pathsToModuleNameMapper } from 'ts-jest/utils'

export default {
    clearMocks: true,
    coverageProvider: 'v8',
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>',
    }),
    preset: 'ts-jest',
    testMatch: ['**/tests/**/*.ts'],
}
