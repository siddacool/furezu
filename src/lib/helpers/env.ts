const env = {
  isDebugMode: import.meta.env.VITE_APP_DEBUG_MODE === 'yes' ? true : false,
};

export default env;
