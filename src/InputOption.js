import React from 'react'
import './InputOption.scss'

function InputOption(props) {
  const { title, Icon, color } = props
  return (
    <div className="inputOption">
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

export default InputOption
