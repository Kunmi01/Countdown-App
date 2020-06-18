import React from 'react';
import PropTypes from 'prop-types';
import convertMillisecondsToDurationObject from '../../utils/millisecondsConverter';
import './styles.scss';

const Countdown = ({ duration }) => {
  const { hours, minutes, seconds } = convertMillisecondsToDurationObject(
    duration
  );

  return (
    <div className="countdown">
      <div className="countdown__unit countdown__unit--hours">
        <h1>{hours}</h1>
        <p>Hours</p>
      </div>
      <h1 className="countdown__separator">:</h1>
      <div className="countdown__unit countdown__unit--minutes">
        <h1>{minutes}</h1>
        <p>Minutes</p>
      </div>
      <h1 className="countdown__separator">:</h1>
      <div className="countdown__unit countdown__unit--seconds">
        <h1>{seconds}</h1>
        <p>Seconds</p>
      </div>
    </div>
  );
};

Countdown.propTypes = {
  duration: PropTypes.number
};

Countdown.defaultProps = {
  duration: 0
};

export default Countdown;
