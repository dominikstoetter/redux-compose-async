const initialState = {
  data: null,
  loading: null,
  error: null,
}

const createDataReducer = ({ action, success, error }) => (state = initialState, { type, payload }) => {
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

module.exports = {
  createDataReducer,
}
