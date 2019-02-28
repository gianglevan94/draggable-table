import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class TextBlink extends PureComponent {
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { children } = this.props
    if (children !== prevProps.children) {
      this.div.classList.add('blink')
      this.blinkTimeout = setTimeout(this.removeBlinkClass, 1000)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.blinkTimeout)
  }

  removeBlinkClass = () => {
    this.div.classList.remove('blink')
  }

  render() {
    const { children } = this.props
    return (
      <div ref={el => this.div = el} style={{ display: 'inline-block' }}>
        {children}
      </div>
    )
  }
}

TextBlink.propTypes = {
  children: PropTypes.node.isRequired,
}

export default TextBlink
