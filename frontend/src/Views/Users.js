import { useEffect, useRef, useState } from "react";
import { usersUrl } from "../utils/Urls";
import axiosService from "../utils/axios";


const Users = () => {

    // users state
    const [users, setUsers] = useState([]);

    // use ref
    const isMounted = useRef(false);

    
    useEffect(() => {
        // this says this component is mounted
        isMounted.current = true;    

        // controller
        const controller = new AbortController();

        const getUsers =  async () => {
                try {
                    // axios get request
                    const response = await axiosService.get(usersUrl, {
                        signal : controller.signal,
                    })

                    // log response
                    console.log(response.data);

                    // if component isMounted
                    // set Users
                    isMounted.current && setUsers(response.data);
                }
                catch (error) {
                    console.log(error);
                }
        }

        // call get users api
        getUsers();

        // clean up func
        return () => {
            // component is un mounted
            isMounted.current = false;
            // abort the api request
            controller.abort();
        }

    } , [])


    return (
        <article>
            <h2>Users list</h2>

            {/* list users */}
            {
                users?.length ? (
                    <ul>
                        {
                            users.map((user, i) => (
                                <li key={i}>{user.email}</li>                                
                            ))
                        }
                    </ul>
                ) :
                    <p>No users to display</p>
            }
        </article>
    );
}

export default Users;
