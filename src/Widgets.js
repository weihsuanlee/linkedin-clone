import React from 'react'
import './Widgets.scss'
import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

function Widgets() {
  const newsArticle = (heading, subtitle) => (
    <div className="widgets-article">
      <div className="widgets-article-left">
        <FiberManualRecordIcon />
      </div>
      <div className="widgets-article-right">
        <h4>{heading}</h4>
        <p>{subtitle}</p>
      </div>
    </div>
  )
  return (
    <div className="widgets">
      <div className="widgets-header">
        <h2>Linkedin News</h2>
        <InfoIcon className="widgets-info-icon" />
      </div>
      {newsArticle(
        'Purdue Pharma offers up $10B plan',
        'Top News - 3,565 readers'
      )}
      {newsArticle(
        "'Crazy' rate of college admissions",
        'Top News - 27,518 readers'
      )}
      {newsArticle(
        'New bars create buzz without booze',
        'Top News - 5,276 readers'
      )}
      {newsArticle(
        "What's in a name? Musk adds title",
        'Top News - 52,689 readers'
      )}
      {newsArticle(
        'AstraZeneca vaccine gets new review',
        'Top News - 32,147 readers'
      )}
    </div>
  )
}

export default Widgets
