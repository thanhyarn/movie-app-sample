import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './pages/Navbar/Navbar';
import Homepage from './pages/Homepage';
import Playing from './pages/Playing/Playing';
import Upcoming from './pages/Upcoming';
import Popular from './pages/Popular/Popular';
import TopRated from './pages/TopRated/TopRated';
import Trend from './pages/Trend/Trend';
import Favorite from './pages/Favorite/Favorite';
import Search from './pages/Search/Search'
import DetailMovie from './pages/DetailMovie/DetailMovie';
import { Fragment, useEffect } from 'react';
import './pages/Navbar.css'
import { useState } from 'react';
import { Toaster, ToastProvider } from 'react-hot-toast';

function App() {
  const [toggle, setToggle] = useState(JSON.parse(localStorage.getItem('toggle')) || false);
  console.log(toggle);
  useEffect(() => {
    console.log(toggle);
    setToggle(toggle)
    localStorage.setItem('toggle',JSON.stringify(toggle))
    console.log(toggle);
  }, [toggle])
  return (
    
      <BrowserRouter>
        <Navbar toggle={toggle} setToggle={setToggle}/>
        <Routes>
          <Route path="/" element={<Homepage toggle={toggle}/>} />
          <Route path="/now_playing" element={<Playing toggle={toggle} id={"now_playing"}/>} />
          <Route path="/upcoming" element={<Upcoming toggle={toggle} id={"upcoming"}/>} />
          <Route path="/popular" element={<Popular toggle={toggle} id={"popular"}/>} />
          <Route path="/top_rated" element={<TopRated toggle={toggle} id={"top_rated"}/>} />
          <Route path="/trending/all/day" element={<Trend toggle={toggle} id={"trending/all/day"}/>} />
          <Route path="/favorite" element={<Favorite toggle={toggle}/>} />
          <Route path="/search" element={<Search toggle={toggle}/>} />
          <Route path="/detail-movie" element={<DetailMovie toggle={toggle}/>} />
        </Routes>   
        <Toaster />  
      </BrowserRouter>
  );
}

export default App;
