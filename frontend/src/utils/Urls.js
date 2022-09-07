
const {REACT_APP_API_BASE_URL} = process.env;

console.log(REACT_APP_API_BASE_URL);

export const BaseUrl = REACT_APP_API_BASE_URL;

export const loginUrl = "/api/token/";

export const getAccessTokenByRefreshTokenUrl = "/api/token/refresh/";

// export const loginUrl = "/api/login/";

export const usersUrl = "/api/users/";