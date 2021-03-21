import React from 'react'
import './InputOption.scss'

function InputOption(props) {
  const { title, Icon, color, likePost } = props
  return (
    <>
      {title === 'Like' ? (
        <div
          className="inputOption"
          onClick={() => {
            likePost()
          }}
        >
          <Icon style={{ color: color }} />
          <h4>{title}</h4>
        </div>
      ) : (
        <div className="inputOption">
          <Icon style={{ color: color }} />
          <h4>{title}</h4>
        </div>
      )}
    </>
  )
}

export default InputOption
