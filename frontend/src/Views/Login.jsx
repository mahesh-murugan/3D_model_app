import { useState } from 'react'
import { LockClosedIcon } from '@heroicons/react/solid'
import { useLocation, useNavigate } from 'react-router-dom';
import { loginUrl } from '../utils/Urls';
// import axiosInstance from '../Axios/axios';
import { useDispatch } from 'react-redux';
import { setAuthDetails } from '../store/slices/auth';
import axiosService from '../utils/axios';


export default function Login() {

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  const from = location?.state?.from.pathname || "/";

  
  const initialValue = {
      email : "",
      password : "",
  };

  const [values, setValues] = useState(initialValue);


  const handleInputChange = (e) => {

      setValues({
        ...values,
        [e.target.name] : e.target.value,
      })
  }

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        const response = await axiosService.post(loginUrl, 
          JSON.stringify(values), 
          {
            headers : {'Content-Type': 'application/json'},
            withCredentials: true
          });
        
        console.log(response?.data);
          
        // set access token and refresh token in redux store
        dispatch(setAuthDetails(response?.data));

        // get accessToken
        // const accessToken = response?.data?.data?.access;

        // decode accessToken
        // var decoded = jwt_decode(accessToken);

        // set role in setAuth from accessToken
        // setAuth({...values, role : response?.data?.role});

        // // reset state
        // setValues(initialValue);

        // navigate to from page
        navigate(from, {replace : true});
      }

      catch(error) {
        console.error(error);
      }
  }
      

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
   

      <div className="flex items-center justify-center align-middle min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg">
          <div>
            <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h2>
           
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
          
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required={true}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="email"
                  value={values.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required={true}
                  className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none appearance-none rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              {/* <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-900">
                  Remember me
                </label>
              </div> */}

              {/* <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div> */}
            </div>

            <div>
              <button
                type="submit"
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="w-5 h-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
