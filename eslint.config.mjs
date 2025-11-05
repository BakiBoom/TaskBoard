import eslint from '@eslint/js';
import tsplugin from '@typescript-eslint/eslint-plugin';
import tsImportPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        plugins: {
            'typescript-eslint': tsplugin,
            'import': tsImportPlugin,
        },
        rules: {
            "@typescript-eslint/no-require-imports": ["warn"],
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            "semi": ["error", "always"],
            "no-unused-vars": ["warn"],
            "no-multiple-empty-lines": ["error", {"max": 1, "maxEOF": 0}],
            'no-trailing-spaces': 'error',
            'no-multi-spaces': 'error',
            'no-irregular-whitespace': 'error',
            'no-mixed-spaces-and-tabs': 'error',
            'import/order': ['error', {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                }
            }],
        }
    }
);