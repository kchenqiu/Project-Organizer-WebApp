import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Team(){
    const {team_id} = useParams()
    const [team, setTeam] = useState('')
    const [members, setMembers] = useState([])

    const displayMembers = members.map((member) => <li className="View-Display"> {member.name} </li>)

    useEffect(() => {
        axios.get('http://localhost:9000/getTeam', {params: { team_id }})
        .then((res) => {
            setTeam(res.data.team_name)
        })
        .catch((error) =>{
            console.log(error)
        })
    })

    useEffect(() => {
        axios.get('http://localhost:9000/getTeamMembers', {params: { team_id }})
        .then((res) => {
            setMembers(res.data)
        })
        .catch((error) =>{
            console.log(error)
        })
    }, [])

    return(
        <div className="View">
            <Navbar/>   
            <header className="View-header">
                {team}
                {displayMembers}
            </header>
        </div>
    )
}

export default Team;