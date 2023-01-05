import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import CreateCard from './Components/CreateCard/CreateCard';
import Navbar from './Components/Navbar/Navbar';
import FlashCard from './Components/ShowCard/FlashCards';
import LandingPage from './Components/LandingPage/LandingPage';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail } from './Redux/slices/userSlice';
import axios from 'axios';
import { CardProvider } from './Components/Context/CardContext';

const App = () => {
  const leftItems = {
    home: '/library',
  };
  const [userId, setUserId] = useState(null);
  // On first render, get user data
  const dispatch = useDispatch();
  useEffect(() => {
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:8080/auth/user',
    }).then((res) => {
      if (res.data) {
        console.log('from login dispatch', res.data);
        dispatch(setEmail(res.data.email));
        //TODO: need to set userId
      }
    });
  }, []);
  const email = useSelector((state) => state.user.email);

  return (
    <>
      {!email ? (
        <LandingPage />
      ) : (
        <CardProvider>
          <BrowserRouter>
            {/* Component 'Navbar' must be placed within browser router so that navbar links work */}
            <Navbar leftItems={leftItems} />
            <div>
              <Routes>
                <Route exact path="/" element={<LandingPage />} />
                <Route exact path="/library" element={<Home />} />
                {/* <Route exact path="/createCard" element={<CreateCard />} /> */}
                <Route exact path="/flashcard/:id" element={<FlashCard />} />
              </Routes>
            </div>
          </BrowserRouter>
        </CardProvider>
      )}
    </>
  );
};

export default App;
