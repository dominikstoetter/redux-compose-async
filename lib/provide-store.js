const React = require('react') //eslint-disable-line
const Provider = require('react-redux').Provider //eslint-disable-line
const { applyMiddleware, createStore, combineReducers } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const createSagaMiddleware = require('redux-saga')

const createReduxStore = ({ rootReducer, rootSaga, middlewares }) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    combineReducers({
      ...rootReducer,
    }),
    composeWithDevTools({
      trace: true,
      traceLimit: 25,
    })(applyMiddleware(...middlewares, sagaMiddleware))
  )

  sagaMiddleware.run(rootSaga)
  return store
}

module.exports = {
  createReduxStore,
}
