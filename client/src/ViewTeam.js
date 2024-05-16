import { useState, useEffect } from "react";
import axios from "axios";
import './View.css';
import Navbar from "./Navbar";

function ViewTeam(){
    const [teams, setTeams] = useState([]);

    const displayTeams = teams.map((team) =>  <li className="View-Display"> 
            Team: {team.team_name} 
        {team.members.map((member) => <li className="Nested-Display">  
        {member.name} {"\n "} </li> )} 
        {"\n"}
        </li> )
    
    
    useEffect(() => {
        axios.get('http://localhost:9000/getFullTeams')        
        .catch((error) => {
            console.log(error);
        })
        .then((res) => {
            setTeams(res.data);
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