const checkInternetConnectivity = async () =>
  await fetch('https://www.google.com', {mode: 'no-cors'})
    .then(() => true)
    .catch(() => false);

export default checkInternetConnectivity;
