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
  },
})

const createActionFetchParent = actionName => ({
  [actionName]: {
    action: actionName,
    success: `${actionName}_SUCCESS`,
    error: `${actionName}_ERROR`,
  },
})

const createActionFetchParents = actionNames =>
  actionNames.reduce(
    (result, actionName) => ({
      ...result,
      ...createActionFetchParent(actionName),
    }),
    {}
  )

const createActionCreatorByActionName = actionName => (payload, resolve, reject) => ({
  type: actionName,
  payload,
  resolve,
  reject,
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
  createActionFetchParent,
  createActionFetchParents,
  promisifyActionCreator,
  createActionCreatorByActionName,
  createActionParents,
}
