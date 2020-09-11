const prepareActiveModelErrors = (rawErrors) => {
  const newErrors = {};

  rawErrors.forEach((error) => {
    newErrors[error.path.join('_')] = error.message;
  });

  return newErrors;
};

export default prepareActiveModelErrors;
