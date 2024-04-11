import axios from "axios";
import { useState, useEffect } from "react"
import Select from 'react-select';
import Navbar from "./Navbar";


function CreateTeamRoster(){
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);    
    const [selectedTeam, setSelectedTeam] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    const handleCreateTeamRoster = (e, team_id, memberList) => {
        e.preventDefault()
        const member_id = memberList.map((user) => user.value); 
        axios.post('http://localhost:9000/createTeamRoster', { team_id, member_id })            
            .catch((error) => alert('Error in Creating team roster'))
        setSelectedTeam("");
        setSelectedUsers("");
    }

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers').then((res)=>setUsers(res.data))
        .catch((error) => {
            console.log(error);
        })
    }, [])  

    useEffect(() => {
        axios.get('http://localhost:9000/getTeams').then((res)=>setTeams(res.data))        
        .catch((error) => {
            console.log(error);
        })
    }, [])

    
    const userOptions = users.map((user) => {
        return  { label: user.f_name + " " + user.l_name, value : user._id } 
    })
    

    
    return(
        <div className="View">            
            <Navbar/>
            <header className="View-header"> 
            <h1 className="Title">
                Create Team Roster
            </h1>
                <form className="CreateTeam-form">
                    <label> Team </label>
                    <br/>
                    <select className='select' onChange={(e) => setSelectedTeam(e.target.value)} value={selectedTeam}>
                        <option className="defaultValue" value=""> Select Team </option>
                        {teams.map((team, index) => {return <option key = {index} value = {team._id}>{team.team_name}</option>})}
                    </select>
                    <br/>
                    <label> Add Members </label>
                    <br/>
                    <Select
                        isMulti
                        className="select"
                        value={selectedUsers}
                        onChange={setSelectedUsers}
                        options={userOptions}
                    />             
                    <br/>   
                    <button className="submit" onClick={(e) => handleCreateTeamRoster(e, selectedTeam, selectedUsers)}>
                        Create Team Roster
                    </button>
                </form>
                <br/>

            </header>
        </div>
    )
}

export default CreateTeamRoster;