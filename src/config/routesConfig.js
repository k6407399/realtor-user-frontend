const routesConfig = {
  // User Routes
  user: {
    signup: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_SIGNUP}`,
    login: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_LOGIN}`,
    profile: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_PROFILE_FETCH}`,
      update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_PROFILE_UPDATE}`,
    },
    appointments: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_APPOINTMENTS_FETCH}`,
      update: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_APPOINTMENTS_UPDATE}`,
      create: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_USER_APPOINTMENTS_CREATE}`,
    },
  },

  // Property Form Fields
  formFields: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FORM_FIELDS}`,

  properties: {
    search: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_PROPERTIES_SEARCH}`,
    filter: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_PROPERTIES_FILTER}`,
    land: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_FETCH}`,
      fetchById: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LAND_FETCH_BY_ID}`,
    },
    flats: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_FETCH}`,
      fetchById: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_FLATS_FETCH_BY_ID}`,
    },
    villas: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_FETCH}`,
      fetchById: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_VILLAS_FETCH_BY_ID}`,
    },
    apartments: {
      fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_FETCH}`,
      fetchById: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_APARTMENTS_FETCH_BY_ID}`,
    },
  },

  // Likes Routes
  likes: {
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LIKES_FETCH}`,
    add: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LIKES_ADD}`,
    remove: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_LIKES_REMOVE}`,
  },

  // Wishlist Routes
  wishlist: {
    fetch: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_WISHLIST_FETCH}`,
    add: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_WISHLIST_ADD}`,
    remove: `${process.env.REACT_APP_BACKEND_URL}${process.env.REACT_APP_WISHLIST_REMOVE}`,
  },
};

console.log("Routes Config Loaded:", routesConfig);

export default routesConfig;
