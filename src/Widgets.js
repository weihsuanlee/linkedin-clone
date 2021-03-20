import React, { useState, useEffect } from 'react'
import axios from './axios'
import requests from './requests'
import './Widgets.scss'
import InfoIcon from '@material-ui/icons/Info'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

function Widgets() {
  const [news, setNews] = useState([])
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchBusiness)
      setNews(request.data.results.slice(0, 6))
      return request
    }
    fetchData()
  }, [])
  // console.log(news)

  return (
    <div className="widgets">
      <div className="widgets-header">
        <h2>Linkedin News</h2>
        <InfoIcon className="widgets-info-icon" />
      </div>
      {news.map((news, i) => (
        <div className="widgets-article" key={i}>
          <div className="widgets-article-left">
            <FiberManualRecordIcon />
          </div>
          <div className="widgets-article-right">
            <h4>{news.title}</h4>
            <p>{news.abstract}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Widgets
