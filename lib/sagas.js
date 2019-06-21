const isDefined = require('./is-defined')
const { all, takeLatest, put, call } = require('redux-saga/effects')

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
      loggerFn = defaultLogger,
      actionParent: { success: successAction, error: errorAction },
    } = transformPayload(payload)
    try {
      const response = yield call(fetchFn, url, { method, body: generateBody(body) })

      yield put({
        type: successAction,
        payload: { data: transformResponseToData(response) },
      })
      resolve(payload)
    } catch (error) {
      loggerFn(error)
      yield put({ type: error, payload: { errorAction } })
      reject(error)
    }
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
  createFetchSaga,
  createRootSaga,
}
