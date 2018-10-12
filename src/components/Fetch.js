import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Fetch extends React.PureComponent {
  static propTypes = {
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({}),
    children: PropTypes.func.isRequired,
  }

  static defaultProps = {
    params: null,
  }

  state = {
    data: undefined,
    loading: false,
    error: false,
  }

  cancelToken = null

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    if (this.cancelToken) {
      this.cancelToken()
    }
  }

  componentDidCatch() {
    this.setState({ error: true })
  }

  fetchData = () => {
    if (this.cancelToken) {
      this.cancelToken()
    }

    const { children, ...props } = this.props

    this.setState({ loading: true, error: false })

    axios({
      ...props,
      cancelToken: new axios.CancelToken((token) => {
        this.cancelToken = token
      }),
    })
      .then(({ data }) => {
        this.setState({
          data,
          loading: false,
        })

        this.cancelToken = null
      })
      .catch((e) => {
        if (
          axios.isCancel(e) ||
          (e.request.readyState === 4 && e.request.status === 0)
        ) {
          return
        }

        this.setState({ loading: false, error: true })
        console.error(e)
      })
  }

  getStateAndHelpers() {
    const { data, loading, error } = this.state

    return {
      data,
      loading,
      error,
      refetch: this.fetchData,
    }
  }

  render() {
    const { children } = this.props
    return children(this.getStateAndHelpers())
  }
}
