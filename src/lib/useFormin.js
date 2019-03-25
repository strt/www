import { useReducer, useCallback } from 'react'

const wrapEvent = (handler, cb) => (event) => {
  if (handler) {
    handler(event)
  }
  if (!event.defaultPrevented) {
    return cb(event)
  }
  return undefined
}

function requiredProp(fnName, propName) {
  throw new Error(`The property "${propName}" is required in "${fnName}"`)
}

const defaultState = {
  values: {},
  touched: {},
  validity: {},
}

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      return {
        ...state,
        values: { ...state.values, ...action.payload.values },
        validity: { ...state.validity, ...action.payload.validity },
      }
    case 'focus':
      return {
        ...state,
        touched: { ...state.touched, ...action.payload.touched },
      }
    case 'invalid':
      return {
        ...state,
        validity: { ...state.validity, ...action.payload.validity },
      }
    case 'reset':
      return defaultState
    default:
      throw new Error()
  }
}

export default function useFormin(initialState = {}) {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    ...initialState,
  })

  function getInputProps({
    name = requiredProp('getInputProps', 'name'),
    onInvalid,
    onChange,
    onFocus,
    onKeyPress,
    ...rest
  } = {}) {
    const value = state.values[name] || ''
    const validity = state.validity[name]

    return {
      name,
      value,
      'aria-invalid': validity ? !validity.isValid : false,
      onChange: wrapEvent(onChange, (event) => {
        const { target } = event
        const nextValue =
          target.type === 'checkbox' ? target.checked : target.value

        dispatch({
          type: 'change',
          payload: {
            values: { [name]: nextValue },
            validity: validity ? { [name]: undefined } : undefined,
          },
        })
      }),
      onFocus: wrapEvent(onFocus, () => {
        dispatch({ type: 'focus', payload: { touched: { [name]: true } } })
      }),
      onInvalid: wrapEvent(onInvalid, (event) => {
        const { target } = event
        // Make sure to update state after the focus event has fired. This is
        // necessary because IE11 will fire the events in another order.
        setTimeout(() => {
          dispatch({
            type: 'invalid',
            payload: {
              validity: {
                [name]: {
                  validityState: target.validity,
                  validationMessage: target.validationMessage,
                },
              },
            },
          })
        })
      }),
      ...rest,
    }
  }

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  return {
    ...state,
    reset,
    getInputProps,
  }
}
