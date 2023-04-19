import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BsSuitHeartFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';

export const Container = React.createContext()
const Navbar = ({ toggle, setToggle }) => {
  const [text, setText] = useState("");
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      if (text === '') {
        toast.error("Vui lòng nhập thông tin tìm kiếm")
      } else {
        window.location.href = `/search?query=${text}&page=1`;
      }
    }
  }
  return (
    <Container.Provider>
      <nav className={toggle ? '' : 'navBarColor'}>
        <div className='nav-options'>
          <NavLink to="" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <h1 id={toggle ? '' : 'heading'}>RIVIUFIM</h1>
          </NavLink>
          <NavLink to="/now_playing" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Đang chiếu</span>
          </NavLink>
          <NavLink to="/upcoming" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Sắp chiếu</span>
          </NavLink>
          <NavLink to="/popular" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Phổ biến</span>
          </NavLink>
          <NavLink to="/top_rated" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Đánh giá cao</span>
          </NavLink>
          <NavLink to="/trending/all/day" style={({ isActive }) => { return { color: isActive ? '#fff' : '#EE9B00' } }}>
            <span id={toggle ? 'Movies' : 'MoviesLight'}>Xu hướng</span>
          </NavLink>
        </div>
        <div className='input-group'>
          <input
            type="text" placeholder='Tìm kiếm phim'
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyPress={handleKeyPress}
          >
          </input>
          <div id='Color-switcher' onClick={() => setToggle(!toggle)}>
            <div id={toggle ? 'Color-switcher-mover' : 'Color-switcher-moved'}></div>

          </div>
          <NavLink to="/favorite" >
            <BsSuitHeartFill id='heart-icon' />
          </NavLink>


        </div>

      </nav>
    </Container.Provider>
  )
}

export default Navbar