const getDataValidationErrors = ({ duration, cashValue, optInUrl }) => {
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

  return errors;
};

export default getDataValidationErrors;
