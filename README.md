# MediMove

The steps required for the provision of the website and local tests are described here

`node` with its package manager `npm` must be installed
to get node: https://nodejs.org/en/download

After the initial cloning of the git-repository:

### Install dependencies

The following command installs all dependencies:
```bash
npm install
```

### Start server

the server is started locally with the following command
```bash
npm start
```

## Logging

We use winston for backend logging. The logger is built in Server.js.
If possible, please provide every JS function and branch with a logging.

for more information: https://www.npmjs.com/package/winston

## Testing
Vitest is used for tests during development. Every *.js file should have a *.test.js file.
Each function requires a test. The tests cover all possible events that happen to the functions, intentionally or unintentionally.

The following command runs all tests:
```bash
npm run test
```

Example:
```js
// sum.js
export function sum(a, b) {
  return a + b
}
```
```js
// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum'

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
})
```

for more information https://vitest.dev/guide/