import React, { useRef } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { toast } from 'react-hot-toast';
import { BsSuitHeartFill } from 'react-icons/bs';
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { Button } from 'antd';

const Navbar = ({ toggle, setToggle }) => {


  const [show, setShow] = useState(false)
  const [text, setText] = useState("");
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      if (text === '') {
        toast.error("Please enter your search information");
      } else {
        window.location.href = `\search?query=${text}&page=1`;
      }
    }
  }

  const handleClick = () => {
    setShow((prevShow) => !prevShow)
    console.log(show);
  }



  return (
    <>
      <nav>
        <div>
          <NavLink to='/'><img style={{ width: '150px' }} src='img/logo.png' alt='Logo' /></NavLink>
        </div>

        <div>
          <ul id='navbar' className={`navbar ${show ? 'active' : ''}`}>
            <li><NavLink exact to='/'>HOME</NavLink></li>
            <li><NavLink to='/now_playing?page=1'>NOW PLAYING</NavLink></li>
            <li><NavLink to='/upcoming?page=1'>UPCOMING</NavLink></li>
            <li><NavLink to='/popular?page=1'>POPULAR</NavLink></li>
            <li><NavLink to='/top_rated?page=1'>TOP RATED</NavLink></li>
            <li><NavLink to='/trending/all/day?page=1'>TREND</NavLink></li>
            <li>
              <div className='input-group'>
                <input
                  type='text'
                  placeholder='Movie Search'
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  onKeyPress={handleKeyPress}
                ></input>
              </div>
            </li>
            <li className='no-hover-active'><NavLink to="/favorite" >
              <BsSuitHeartFill id='heart-icon' />
            </NavLink></li>
          </ul>


        </div>


        <div id='mobile'>
          {show ? (
            <FaTimes className='icon-navbar navbar active' onClick={handleClick} />
          ) : (
            <FaBars className='icon-navbar navbar' onClick={handleClick} />
          )}
        </div>
      </nav>
    </>
  )
}

export default Navbar