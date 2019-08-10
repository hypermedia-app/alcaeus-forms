> # `@hydrofoil/alcaeus-form`
> ## Automatically render forms for Hydra-driven operations
> [![Build Status](https://travis-ci.org/hypermedia-app/alcaeus-forms.svg?branch=master)](https://travis-ci.org/hypermedia-app/alcaeus-forms)
  [![BrowserStack Status](https://www.browserstack.com/automate/badge.svg?badge_key=aVRRVXVJZVo0Q1BGcmtSZHVtWVk0VnJqcTdGVWp4ckR0NHhDS1UwOHRBND0tLVpEQnZYNUlkRnBOZmtCNkluVGNObWc9PQ==--d7cda2bf3ffd61f02693e1291022e521590360e4)](https://www.browserstack.com/automate/public-build/aVRRVXVJZVo0Q1BGcmtSZHVtWVk0VnJqcTdGVWp4ckR0NHhDS1UwOHRBND0tLVpEQnZYNUlkRnBOZmtCNkluVGNObWc9PQ==--d7cda2bf3ffd61f02693e1291022e521590360e4)
  [![codecov](https://codecov.io/gh/hypermedia-app/alcaeus-forms/branch/master/graph/badge.svg)](https://codecov.io/gh/hypermedia-app/alcaeus-forms)

## Installation

```
npm i --save @hydrofoil/alcaeus-forms
```

## Usage

Here's an example showing how form is used with [`lit-html`][lhtml]

```js
import { Hydra } from 'alcaeus'
import { html } from 'lit-html'
import '@hydrofoil/alcaeus-forms/alcaeus-form'

const resource = (await Hydra.loadResource('http://hydra-movies.herokuapp.com/')).root
const collection = resource.getCollections()[0]
resource.operations.find(op => op.method === 'POST')

const form = html`<alcaeus-form .operation="${operation}"></alcaeus-form>` 
```

[lhtml]: https://lit-html.polymer-project.org
