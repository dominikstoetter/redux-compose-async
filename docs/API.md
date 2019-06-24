# redux-compose-async

## TOC
### Actions
- createActionCreator()
- createActionFetchParent()
- createActionFetchParents()
- createActionParent()
- promisifyActionCreator()

### Reducer
- createDataReducer()

### Sagas
- createFetchSaga()
- createRootSaga()



# Actions
## `createActionCreator()`
### signature
```js
createActionCreator(MY_ACTION_PARENT: { action: string }): (payload, resolve, reject) => ({
  type: action,
  payload?: {},
  resolve: () => void,
  reject: () => void
})
```
### example
```js
createActionFetchParent({ action: 'FETCH_FROM_API' })
```
### returns
```js
(payload, resolve, reject) => ({
  type: 'FETCH_FROM_API',
  () => {},
  () => {}
})
```
## `createActionFetchParent()`
### signature
```js
createActionFetchParent(actionName: string): {
  [actionName]: {
    action: actionName,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
  }
}
```
### example
```js
createActionFetchParent('FETCH_FROM_API')
```
### returns
```js
{
  FETCH_FROM_API: {
    action: 'FETCH_FROM_API',
    success: 'FETCH_FROM_API_SUCCESS',
    error: 'FETCH_FROM_API_ERROR',
  }
}
```
## `createActionFetchParents()`
### signature
```js
createActionFetchParents(actionNames: string[]): {
  [actionName]: {
    action: actionName,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
  }
}
```
### example
```js
createActionFetchParents(['FETCH_FROM_API', 'PUT_TO_API'])
```
### returns
```js
{
  FETCH_FROM_API: {
    action: 'FETCH_FROM_API',
    success: 'FETCH_FROM_API_SUCCESS',
    error: 'FETCH_FROM_API_ERROR',
  },
  PUT_TO_API: {
    action: 'PUT_TO_API',
    success: 'PUT_TO_API_SUCCESS',
    error: 'PUT_TO_API_ERROR',
  }
}
```
## `createActionParent()`
### signature
```js
createActionParent(actionName: string): {
  [actionName]: {
    action: actionName
  }
}
```
### example
```js
createActionParent('SET_FILES')
```
### returns
```js
{
  SET_FILES: {
    action: 'SET_FILES',
  }
}
```
## `promisifyActionCreator()`
### signature
```js
promisifyActionCreator(dispatch: () => void, actionCreator: () => void): Promise()
```
### example
```js
 dispatch => ({
  fetchFromMyApi: promisifyActionCreator(dispatch, fetchFromMyApi)
})
```
### returns
```js
Promise
```
# Reducer
## `createDataReducer()`
### signature
```js
createDataReducer(actionFetchParent): (state: {}, {type: string, payload: {}}) => state
```
### example
```js
createDataReducer({
  'FETCH_API': {
    action: 'FETCH_API',
    success: 'FETCH_API_SUCCESS',
    error: 'FETCH_API_ERROR',
  }
})
```
### returns
```js
(state = {
    data: null,
    loading: null,
    error: null,
  },
  { 
    type,
    payload 
  }
) => {
  switch (type) {
    case action:
      return {
        ...state,
        error: null,
        loading: true,
        data: null,
      }
    case success:
      return {
        ...state,
        error: null,
        loading: false,
        data: payload.data,
      }
    case error:
      return {
        ...state,
        error: payload.error,
        loading: false,
        data: null,
      }
    default:
      return { ...state }
  }
}
```
