import React from 'react'

export default class Toggle extends React.Component {
  static defaultProps = {
    defaultIsToggled: null,
    onToggle: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      on: props.defaultIsToggled != null ? props.defaultIsToggled : false,
    }
  }

  toggle = () => {
    this.setState(
      state => ({
        on: !state.on,
      }),
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  }

  toggleOn = () => {
    this.setState(
      {
        on: true,
      },
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  }

  toggleOff = () => {
    this.setState(
      {
        on: false,
      },
      () => {
        this.props.onToggle(this.state.on)
      },
    )
  }

  getStateAndHelpers() {
    return {
      on: this.state.on,
      toggle: this.toggle,
      toggleOn: this.toggleOn,
      toggleOff: this.toggleOff,
    }
  }

  render() {
    return this.props.children(this.getStateAndHelpers())
  }
}
