import React, { useState, useEffect } from 'react';
import axios from 'axios';
import loadingIcon from './loading.gif';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAboutData = () => {
      axios
        .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
        .then(response => {
          console.log('Received data:', response.data);
          setAboutData(response.data);
        })
        .catch(err => {
          console.error('Error fetching data:', err);
          const errMsg = JSON.stringify(err, null, 2);
          setError(errMsg);
        })
        .finally(() => {
          setLoaded(true);
        });
    };

    fetchAboutData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!loaded) return <img src={loadingIcon} alt="loading" />;

  return (
    <div className="about">
      <h1>About Me</h1>
      {aboutData && aboutData.aboutMe && <p>{aboutData.aboutMe}</p>}
      {aboutData && aboutData.imageUrl && (
        <img 
          src={aboutData.imageUrl} 
          alt="image" 
          className="about-image"
        />
      )}
    </div>
  );
};

export default About;