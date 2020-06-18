import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  supportsLocalStorage,
  savePromoData,
  loadPromoData,
  savePromoEndDate,
  loadPromoEndDate
} from './utils/localStorage';

import Countdown from './components/Countdown';
import topImage from './assets/images/top-image.png';
import topImageRetina from './assets/images/top-image-2x.png';
import './App.scss';

const COUNTDOWN_REFRESH_INTERVAL = 500;

const App = ({ apiUrl }) => {
  const [promoData, setPromoData] = useState();
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [countdownInterval, setCountdownInterval] = useState();
  const [errorMessages, setErrorMessages] = useState([]);

  const isDataValid = ({ duration, cashValue, optInUrl }) => {
    const errors = [];
    if (!duration || typeof duration !== 'number') {
      errors.push('Missing or invalid duration value');
    }
    if (!cashValue) {
      errors.push('Missing cash value');
    }
    if (!optInUrl) {
      errors.push('Missing opt in url');
    }

    setErrorMessages([...errorMessages, ...errors]);
    return !errors.length;
  };

  const hasLocalStorage = () => {
    if (supportsLocalStorage()) {
      return true;
    }
    setErrorMessages([
      ...errorMessages,
      'Browser does not support local storage'
    ]);
    return false;
  };

  const initializeCountdown = async () => {
    const storedData = loadPromoData();
    const storedEndDate = loadPromoEndDate();
    let jsonData;

    try {
      jsonData = await (await fetch(apiUrl)).json();
    } catch (err) {
      setErrorMessages([...errorMessages, err.message]);
      return;
    }

    if (storedData && storedData.id === jsonData.id && storedEndDate) {
      const getMsLeft = () => storedEndDate - Date.now();
      setPromoData(storedData);
      setTimeRemaining(getMsLeft());
      setCountdownInterval(
        setInterval(() => {
          setTimeRemaining(getMsLeft());
        }, COUNTDOWN_REFRESH_INTERVAL)
      );
    } else if (isDataValid(jsonData) && hasLocalStorage()) {
      const endDate = Date.now() + jsonData.duration;
      savePromoData(jsonData);
      savePromoEndDate(endDate);
      initializeCountdown();
    }
  };

  useEffect(() => {
    initializeCountdown();
  }, []);

  useEffect(() => {
    if (timeRemaining <= 1000) {
      clearInterval(countdownInterval);
      setTimeRemaining(0);
    }
    // console.log(timeRemaining);
  }, [timeRemaining]);

  return (
    <div className="app">
      {!!errorMessages.length &&
        errorMessages.map(message => (
          <div className="app__error-message" key={message}>
            {message}
          </div>
        ))}
      <div className="app__wrapper">
        {!!timeRemaining && (
          <>
            <div className="app__image-wrapper">
              <picture>
                <source srcSet={`${topImage} 1x, ${topImageRetina} 2x`} />
                <img src={topImage} alt="top" />
              </picture>
            </div>
            <h3 className="app__message">
              Get your free <b>£{promoData?.cashValue}</b> now
            </h3>
          </>
        )}
        <div className="app__countdown-wrapper">
          <Countdown duration={timeRemaining} />
          {!!timeRemaining && (
            <a
              className="app__opt-in-button"
              href={promoData?.optInUrl}
              target="_blank"
              rel="noreferrer"
            >
              Opt in
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

App.propTypes = {
  apiUrl: PropTypes.string.isRequired
};

export default App;
