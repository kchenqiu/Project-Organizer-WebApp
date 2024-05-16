import axios from "axios";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Home.css"

function Home(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    const [userFirstName, setFirstName] = useState('');
    const [userLastName, setLastName] = useState('');
    const [info, setInfo] = useState([]);
    const [userStories, setUserStories] = useState([])

    const displayTeamsAndProject = info.map((data)=> <li className="View-Display"> <Link to={`/team/${data.team._id}`}>{data.team.team_name}</Link> 
    {data.project.map((project) => <li> <Link to = {`/project/${project._id}`} >{ project.proj_name } </Link> </li>)}</li>)
    const displayUserStories = userStories.map((story) => <li className="View-Display"><Link to={`/userstory/${story.UserStory._id}`}>{story.UserStory.UserStory}</Link></li>)
    
    useEffect(() => {
        const user = loggedInUser;
        axios.get('http://localhost:9000/getUserByID', { params: { user } })
        .then((res) => {
            setFirstName(res.data.f_name);
            setLastName(res.data.l_name);
        })
        .catch((error) => {
            console.log(error);
        })
    }, []);

    useEffect(() => {
        axios.get('http://localhost:9000/getUserTeamsAndProjects', { params: {loggedInUser} })
        .then((res) => {
            setInfo(res.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:9000/getAssignedUserStories', { params: { loggedInUser } })
        .then((res) => {
            setUserStories(res.data)
            console.log(userStories)
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])


    return(
        <div className="Home">                
            <Navbar/>
            <header className="Home-Header">
                <>
                { loggedInUser != null &&
                   <p> {"Welcome! " + userFirstName + " " + userLastName}</p>
                }
                </>
                <div className="Home-Text">
                { loggedInUser != null && info != null &&
                    <p className="Home-Text">
                        Your Teams: {displayTeamsAndProject}
                    </p>
                }
                { loggedInUser != null && userStories != null &&
                    <p className="Home-Text">
                        Your User Stories: {displayUserStories} 
                    </p>
                }
                </div>
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