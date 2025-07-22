import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { NavigationBar } from '../common/NavigationBar';
import { HeaderAccessories } from '../accessories/HeaderAccessories';
import { Footer } from '../common/Footer'
import './profile.css';

export const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile', {
          credentials: 'include',
           headers: {
          'Content-Type': 'application/json',
        }
        });
        
        if (response.status === 401) {
        navigate('/login');
        return;
      }
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('401')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  if (loading) return <div className="loading">Loading profile...</div>;
  if (error) return <div className="error">{error}</div>;
  
  const favoritesCarouselItems = profile.favorites || [];
  const bagCarouselItems = profile.bagItems || [];
  const listedCarouselItems = profile.products || [];

  return (
<div id="main" className="flex flex-col min-h-screen">
  <div id="navigation" className="fixed"><NavigationBar /></div>

  <div id="header" className="mt-1 w-full ml-27">
    <HeaderAccessories />
  </div>

  <div id="body" className="mt-20 flex flex-col items-center px-10">

    <div className="flex flex-row justify-between w-[95%] gap-8 mt-10 ml-10">
      <div className="carousel-section w-1/3">
        <h2>My Favorites: <span className="span">{favoritesCarouselItems.length}</span></h2>
        {favoritesCarouselItems.length === 0 ? (
          <p>No Favorites Yet!</p>
        ) : (
          <Carousel autoPlay interval={3000} infiniteLoop showArrows showThumbs={false} showStatus={false} stopOnHover>
            {favoritesCarouselItems.map((item, index) => (
              <div key={`fav-${index}`} className="carousel-item" onClick={() => handleCardClick(item._id)}>
                <img src={item.image || '/Background/ExampleCard.jpg'} alt={`Favorite ${index}`} className="image" />
                <p className="legend">{item.name || `Favorite Item ${index + 1}`}</p>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="carousel-section w-1/3">
        <h2>My Bag: <span className="span">{bagCarouselItems.length}</span></h2>
        {bagCarouselItems.length === 0 ? (
          <p>Nothing In The Bag Yet!</p>
        ) : (
          <Carousel autoPlay interval={3000} infiniteLoop showArrows showThumbs={false} showStatus={false} stopOnHover>
            {bagCarouselItems.map((item, index) => (
              <div key={`bag-${index}`} className="carousel-item" onClick={() => handleCardClick(item._id)}>
                <img src={item.image || '/Background/ExampleCard.jpg'} alt={`Bag Item ${index}`} className="image" />
                <p className="legend">{item.name || `Bag Item ${index + 1}`}</p>
              </div>
            ))}
          </Carousel>
        )}
      </div>

      <div className="carousel-section w-1/3">
        <h2>My Listed Items: <span className="span">{listedCarouselItems.length}</span></h2>
        {listedCarouselItems.length === 0 ? (
          <p>Nothing Listed Yet!</p>
        ) : (
          <Carousel autoPlay interval={3000} infiniteLoop showArrows showThumbs={false} showStatus={false} stopOnHover>
            {listedCarouselItems.map((item) => (
              <div key={item._id} className="carousel-item" onClick={() => handleCardClick(item._id)}>
                <img src={item.image || '/Background/ExampleCard.jpg'} alt={item.name} className="image" />
                <p className="legend">{item.name} - ₹{item.cost}</p>
              </div>
            ))}
          </Carousel>
        )}
      </div>
    </div>

    {/* <div className="flex flex-row justify-around mt-8 w-full text-xl font-semibold text-gray-800">
      <div>Favorites: {favoritesCarouselItems.length}</div>
      <div>In Bag: {bagCarouselItems.length}</div>
      <div>Listed: {listedCarouselItems.length}</div>
    </div> */}

    <div className="profile-header mt-10">
      <h1 className="text-2xl font-medium">Name: {profile.name}</h1>
      <p className="text-md text-gray-600">Email: {profile.email}</p>
    </div>
  </div>

  <div id="footer" className="mt-auto ml-28">
    <Footer />
  </div>
</div>
  );
};
