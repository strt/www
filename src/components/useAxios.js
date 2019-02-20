import { useRef, useReducer, useEffect } from 'react'
import axios from 'axios'

const initialState = { count: 0 }

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { loading: true, error: false, data: undefined }
    case 'error':
      return { loading: false, error: true, data: undefined }
    case 'success':
      return { loading: false, error: false, data: action.payload }
    default:
      throw new Error()
  }
}

export default function useAxios(args) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const cancelToken = useRef(null)

  useEffect(() => {
    dispatch({ type: 'loading' })

    axios({
      ...args,
      cancelToken: new axios.CancelToken((token) => {
        cancelToken.current = token
      }),
    })
      .then(({ data }) => {
        dispatch({ type: 'success', payload: data })
        cancelToken.current = null
      })
      .catch((e) => {
        if (
          axios.isCancel(e) ||
          (e.request.readyState === 4 && e.request.status === 0)
        ) {
          return
        }

        dispatch({ type: 'error' })
      })

    return () => {
      if (cancelToken.current) {
        cancelToken.current()
      }
    }
  }, [])

  return state
}
