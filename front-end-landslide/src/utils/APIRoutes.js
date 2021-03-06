export const host = 'http://localhost:4000';
//[AUTH]
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const logoutRoute = `${host}/api/auth/logout`;
export const refreshTokenRoute = `${host}/api/auth/refresh`;
//[USER]
export const allUsersRoute= `${host}/api/users/allUser`;
//[SENSOR]
export const getData = `${host}/api/sensor/data`;
export const getRainDataByDay = `${host}/api/rain/data-by-day`;
export const getRainDataByMonth = `${host}/api/rain/data-by-month`;
export const getRainDataByYear = `${host}/api/rain/data-by-year`;
//[CONTACT]
export const userContact = (userId) =>  `${host}/api/contact/`;
