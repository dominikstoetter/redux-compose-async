const isDefined = require('./is-defined')
const { all, takeLatest, put, call } = require('redux-saga/effects')
const { getEncodedQuery, getEncodedFilterQuery } = require('./query-string')

const defaultTransform = input => input
const generateBody = body => (isDefined(body) && JSON.stringify(body)) || null
const defaultLogger = console.log

const createFetchSaga = transformPayload =>
  function*({ payload, resolve, reject }) {
    const {
      url,
      method = 'GET',
      body = null,
      transformResponseToData = defaultTransform,
      fetchFn = fetch,
      actionParent: { success: successAction, error: errorAction },
      qsp = {},
      filter = {},
    } = transformPayload(payload)
    try {
      const queryString = [getEncodedQuery(qsp), getEncodedFilterQuery(filter)].filter(value => value != '').join('&') // eslint-disable-line eqeqeq, max-len
      const urlWithQsp = `${url}${(queryString && `?${queryString}`) || ''}`
      const requestBody = generateBody(body)

      const response = yield call(fetchFn, urlWithQsp, { method, body: requestBody })

      yield put({
        type: successAction,
        payload: { data: transformResponseToData(response) },
      })
      resolve(response)
    } catch (error) {
      defaultLogger(error)
      yield put({ type: errorAction, payload: { error } })
      reject(error)
    }
  }

const combineSagas = (...sagas) =>
  function*() {
    yield all([...sagas])
  }

const createRootSaga = nonIterableActionsToSagaMap =>
  function*() {
    yield all(
      Object.entries(nonIterableActionsToSagaMap).map(([actionName, saga]) => {
        return takeLatest(actionName, saga)
      })
    )
  }

module.exports = {
  combineSagas,
  createFetchSaga,
  createRootSaga,
}
