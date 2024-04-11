import { useState, useEffect } from "react";
import axios from "axios";
import './View.css';
import Navbar from "./Navbar";

function ViewTeam(){
    const [teams, setTeams] = useState([]);
    const displayTeams = teams.map((teams) => <li>{teams.team_name}</li>)

    useEffect(() => {
        axios.get('http://localhost:9000/getTeams')
        .then((res) => {
          setTeams(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }, []);

    return(
        <div className="View">
            <Navbar/>
            <header className="View-header">
                <h1 className="Title">
                    Teams
                </h1>
                
                <view className="View-Display">
                    {displayTeams}  
                </view>          

            </header>
        </div>
    )
}

export default ViewTeam;