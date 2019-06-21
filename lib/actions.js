const createActionCreator = ({ action }) => (payload, resolve, reject) => ({
  type: action,
  payload,
  resolve,
  reject,
})

const promisifyActionCreator = (dispatch, actionCreator) => payload =>
  new Promise((resolve, reject) => dispatch(actionCreator(payload, resolve, reject)))

const createActionParent = actionName => ({
  [actionName]: {
    action: actionName,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
  },
})

const createActionParents = actionNames =>
  actionNames.reduce(
    (result, actionName) => ({
      ...result,
      ...createActionParent(actionName),
    }),
    {}
  )

module.exports = {
  createActionCreator,
  createActionParent,
  createActionParents,
  promisifyActionCreator,
}