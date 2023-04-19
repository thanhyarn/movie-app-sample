import React, { useEffect, useState } from 'react'
import './Homepage.css'
import Slide from '../../component/Slide'
import MediaList from '../../component/MediaList'
import { Space } from 'antd'

const Homepage = ({toggle}) => {

  return (
    <Space className={`homepage ${toggle ? "mainBgColor" : "secondaryBgColor"}`} direction='vertical'>
        <Slide />
        <div className='media-lists' >
          <MediaList title={"Đề xuất"} idTitle={"now_playing"} />
          <MediaList title={"Sắp chiếu"} idTitle={"upcoming"}/>
          <MediaList title={"Phổ biến"} idTitle={"popular"}/>
          <MediaList title={"Đánh giá cao"} idTitle={"top_rated"}/>
        </div>
      </Space>
   
  ) 
}

export default Homepage