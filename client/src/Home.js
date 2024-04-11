import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css"

function Home(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [userFirstName, setFirstName] = useState('');
    const [userLastName, setLastName] = useState('');
    
    useEffect(() => {
        axios.get('http://localhost:9000/getUserByID', { params: { loggedInUser } })
        .then((res) => {
            setFirstName(res.data.f_name);
            setLastName(res.data.l_name);
        })
        .catch((error) => {
            console.log(error);
        })
        }, []);

    return(
        <div className="Home">                
            <Navbar/>
            <header className="Home-Header">
                <>
                { loggedInUser != null &&
                   <p> {"Welcome! " + userFirstName + " " + userLastName}</p>
                }
                </>
                <>
                { loggedInUser == null &&
                    <p>
                      Already have an account? <Link to="/Login">Login</Link>
                    </p>
                }
                </>
            </header>
    </div>
)
}

export default Home;