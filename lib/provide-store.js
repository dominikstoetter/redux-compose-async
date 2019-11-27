const React = require('react') //eslint-disable-line
const Provider = require('react-redux').Provider //eslint-disable-line
const { applyMiddleware, createStore, combineReducers } = require('redux')
const { composeWithDevTools } = require('redux-devtools-extension')
const combineSagas = require('./sagas').combineSagas
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

const provideStore = (rootReducer, rootSaga) => {
  const store = createReduxStore({
    rootReducer,
    rootSaga: combineSagas(...rootSaga),
  })
  return ({ children }) => <Provider {...{ store }}>{children}</Provider>
}

module.exports = {
  provideStore,
  createReduxStore,
}
