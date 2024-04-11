import { useState, useEffect } from 'react';
import axios from 'axios';
import './View.css'
import Navbar from "./Navbar";

function CreateProject() {
    const [proj_name, setProjectName] = useState('');
    const [proj_desc, setProjectDescription] = useState('');
    const [prod_owner_id, setProductOwner] = useState('');
    const [mgr_id, setManager] = useState('');
    const [team_id, setTeam] = useState('');
    const [users, setUsers] = useState([]);
    const [teams, setTeams] = useState([]);

    const handleCreateProject = (event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id) => {
        event.preventDefault()
        axios.post('http://localhost:9000/createProject', { proj_name, proj_desc, prod_owner_id, mgr_id, team_id })
            .catch((err) => alert('Error in Creating project'))
        setProjectName("");
        setProjectDescription("");
        setProductOwner("");
        setManager("");
        setTeam("");
    }

    useEffect(() => {
        axios.get('http://localhost:9000/getUsers')
        .then((res) => {
          setUsers(res.data)
        })
        .catch((error) => {
          console.log(error);
        })
        }, []);

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
                <h1 className='Title'>
                    Create New Project
                </h1>

                <form className="CreateProject-form">                
                    <label>
                        Project name: <br/> 
                        <input type="text" value = {proj_name} name = "ProjectName" onChange={(e) => setProjectName(e.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        Project Description: <br/> 
                        <textarea type = "text" value = {proj_desc} name="ProjectDescription" onChange={(e) => setProjectDescription(e.target.value)}/>
                    </label>
                    <br/>

                    <label>
                        Product Owner: <br/>
                        <select className='select'  onChange={(e) => setProductOwner(e.target.value)} value={prod_owner_id}>
                            <option className='defaultSelect' value="">Select Product Owner</option>
                            {users.map((user, index) => {
                            return <option key={index} value={user._id}>   
                                {user.f_name} {user.l_name}
                            </option>
                            })
                            }
                        </select>
                    </label>
                    <br/>
                    <label>
                        Manager: <br/>
                        <select className='select'  onChange={(e) => setManager(e.target.value)} value={mgr_id}>
                            <option className='defaultSelect' value="">Select Manager</option>
                            {users.map((user, index) => {
                            return <option key={index} value={user._id}>   
                                {user.f_name} {user.l_name}
                            </option>
                            })
                            }
                        </select>
                    </label>
                    <br/>
                    <label>
                        Team: <br/>
                        <select className='select' onChange={(e) => setTeam(e.target.value)} value={team_id}>
                            <option className='defaultSelect' value="">Select Team</option>
                            {teams.map((teams, index) => {
                            return <option key={index} value={teams._id}>   
                            {teams.team_name}
                            </option>
                            })
                            }
                        </select>
                    </label>
                    <br/>
                    <br/>
                    <button class = 'submit' onClick={(event) => handleCreateProject(event, proj_name, proj_desc, prod_owner_id, mgr_id, team_id)}>
                        Create Project
                    </button>
                </form>
            </header>
        </div>
    )
}

export default CreateProject;