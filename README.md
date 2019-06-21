# redux-compose

create a [reducks module](https://github.com/erikras/ducks-modular-redux) in seconds

## Example

```js
import { createActionCreator, createActionParents } from 'dominikstoetter/redux-compose/actions'
import { createDataReducer } from 'dominikstoetter/redux-compose/reducer'
import { createFetchSaga, createRootSaga } from 'dominikstoetter/redux-compose/sagas'

export const { FETCH_FROM_MY_API } = createActionParents([ 'FETCH_FROM_MY_API' ])
export const fetchShopCredentials = createActionCreator(FETCH_FROM_MY_API)

export const fetchFormMyApiSaga = createFetchSaga(({ uuid, iso8601 }) => ({
  action: FETCH_FROM_MY_API,
  url: `${url}/${iso8601}/${uuid}`,
  method: 'GET',
}))

export const fetchShopCredentialsRootSaga = createRootSaga({
  FETCH_FROM_MY_API: fetchFormMyApiSaga,
})

export default createDataReducer(FETCH_FROM_MY_API)
```
