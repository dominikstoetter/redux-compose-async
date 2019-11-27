const initialState = {
  data: null,
  loading: false,
  error: null,
}

const createDataReducer = ({ action, success, error, reset }) => (state = initialState, { type, payload }) => {
  switch (type) {
    case action:
      return {
        ...state,
        error: null,
        loading: true,
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
    case reset:
      return {
        ...initialState,
      }
    default:
      return { ...state }
  }
}

module.exports = {
  createDataReducer,
}
