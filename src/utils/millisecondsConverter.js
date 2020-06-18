const convertUnitToString = unit => (unit < 10 ? `0${unit}` : String(unit));

const convertMillisecondsToDurationObject = ms => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const seconds = Math.floor((ms / 1000) % 60);
  return {
    hours: convertUnitToString(hours),
    minutes: convertUnitToString(minutes),
    seconds: convertUnitToString(seconds)
  };
};

export default convertMillisecondsToDurationObject;
