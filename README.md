# redux-compose-async

create a [reducks module](https://github.com/erikras/ducks-modular-redux) in seconds with these little helpers

## Installation

### yarn
```bash
yarn add redux-compose-async
```

### npm
```bash
npm add redux-compose-async
```

## Example

### Reducks Module
my-store.js
```js
import {  createFetchSaga, createRootSaga, createDataReducer, createActionCreator, createActionParents } from 'redux-compose-async'


export const { FETCH_FROM_MY_API } = createActionParents([ 'FETCH_FROM_MY_API' ])
export const fetchFromMyApi = createActionCreator(FETCH_FROM_MY_API)

export const fetchFromMyApiSaga = createFetchSaga(({ uuid }) => ({
  action: FETCH_FROM_MY_API,
  url: `//${process.env.api}/${uuid}`,
  method: 'GET',
}))

export const rootSaga = createRootSaga({
  FETCH_FROM_MY_API: fetchFromMyApiSaga,
})

export default createDataReducer(FETCH_FROM_MY_API)
```

### Higher Order Store Connection
with-my-store.js
```js
import { connect } from 'react-redux'
import { fetchFromMyApi } from './my-store.js'
import { promisifyActionCreator } from 'redux-compose-async'

export default connect(
  ({ myStore }) => ({ myStore: { ...myStore } }),
  dispatch => ({
    fetchFromMyApi: promisifyActionCreator(dispatch, fetchFromMyApi)
  })
)
```

### Example Component with async usage
my-component/index.js
```js
import { compose } from 'recompose'
import withLogic from './with-logic'
import withData from './with-data'
import View from './View'

export default compose(withData, withLogic)(View)

```
my-component/with-data.js
```js
import withMyStore from './with-my-store'

export default withMyStore
```

my-component/with-logic.js
```js
import { compose, withHandlers } from 'recompose'

export default withHandlers({
    fetchHandler: ({ fetchFromMyApi }) => async ({ uuid }) => {
      try {
        await fetchFromMyApi({ uuid })
        console.log('resolve')
      } catch (e) {
        console.log('reject')
      }
    },
  })
```

my-component/View.js
```js
export default ({ fetchHandler }) => (
  <div {...{ onClick: () => fetchHandler({uuid: '2fe17f6b-c083-4603-8a45-eaa26a422f31' })}} />
)
```
