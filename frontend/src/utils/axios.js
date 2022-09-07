import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import store from '../store/store';
import {slice} from '../store/slices/auth';
import { BaseUrl, getAccessTokenByRefreshTokenUrl } from '../utils/Urls';

const axiosService = axios.create({
    baseURL: BaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});


axiosService.interceptors.request.use((request) => {
    const {access} = store.getState().auth;
    request.headers['Authorization'] = `Bearer ${access}`;
    return request;
})

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
    const { refresh } = store.getState().auth;
    if (refresh !== null) {

        axiosService
            .post(
                getAccessTokenByRefreshTokenUrl,
                {
                    refresh: refresh,
                },
            )
            .then((resp) => {
                const { access } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
        
                store.dispatch(
                    slice.actions.setAuthDetails({ access: access, refresh: refresh })
                );

                return Promise.resolve();
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    store.dispatch(slice.actions.logout());
                }
            }); 
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic, {
    statusCodes: [401, 403], // default: [ 401 ]
});

export default axiosService;
