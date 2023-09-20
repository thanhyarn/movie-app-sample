import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Slide from '../../component/Slide'
import Banner from '../../component/Banner'
import MediaList from '../../component/MediaList'
import { Space } from 'antd'

const Homepage = ({toggle}) => {

  return (
    <Space className={`homepage ${toggle ? "mainBgColor" : "secondaryBgColor"}`} direction='vertical'>
        <div className='media-lists' >
          <MediaList title={"Now Playing"} idTitle={"now_playing"} />
          <MediaList title={"Upcoming"} idTitle={"upcoming"}/>
          <MediaList title={"Popular"} idTitle={"popular"}/>
          <MediaList title={"Top Rated"} idTitle={"top_rated"}/>
        </div>
      </Space>
   
  ) 
}

export default Homepage