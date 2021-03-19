import './FeedInputOption.scss'

function FeedInputOption(props) {
  const { title, Icon, color } = props
  return (
    <div className="feed-input-option">
      <Icon style={{ color: color }} />
      <h4>{title}</h4>
    </div>
  )
}

export default FeedInputOption
