import { useReducer, useEffect } from 'react'
import axios from 'axios'

const STATES = {
  loading: 0,
  success: 1,
  error: 2,
}

const initialState = { loading: true, error: false, data: undefined }

function axiosReducer(state, action) {
  switch (action.type) {
    case STATES.loading:
      return { ...state, loading: true, error: false }
    case STATES.error:
      return { ...state, loading: false, error: true }
    case STATES.success:
      return { ...state, loading: false, error: false, data: action.payload }
    default:
      throw new Error()
  }
}

export default function useAxios(args, inputs = []) {
  const [state, dispatch] = useReducer(axiosReducer, initialState)

  useEffect(() => {
    let cancelToken = null

    dispatch({ type: STATES.loading })

    axios({
      ...args,
      cancelToken: new axios.CancelToken((token) => {
        cancelToken = token
      }),
    })
      .then(({ data }) => {
        cancelToken = null
        dispatch({ type: STATES.success, payload: data })
      })
      .catch((e) => {
        if (axios.isCancel(e)) return

        dispatch({ type: STATES.error })
      })

    return () => {
      if (cancelToken) {
        cancelToken()
      }
    }
  }, inputs)

  return state
}
