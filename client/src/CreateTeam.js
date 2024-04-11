import axios from "axios"
import { useState } from "react"
import './View.css'
import Navbar from "./Navbar";

function CreateTeam(){
    const [team_name, setTeamName] = useState('');

    const handleCreateTeam = (event) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createTeam', { team_name })
        .catch((err) => alert('Error in Creating team'))        
        setTeamName("");
    }

    return(
        <div className = "View">
            <Navbar/>
            <header className="View-header">
                <h1 className="Title">
                    Create Team
                </h1>

                <form className="CreateTeam-form">
                    <label>
                        Team Name: <br/>
                        <input type="text" name="TeamName" value={team_name} onChange={(e) => setTeamName(e.target.value)}/>
                    </label>
                    <br/>
                    <br/>
                    <button class="submit" onClick={(e) => handleCreateTeam(e)}>
                        Create Team
                    </button>
                </form>      
                <br/>
            </header>
        </div>
    )
}

export default CreateTeam;