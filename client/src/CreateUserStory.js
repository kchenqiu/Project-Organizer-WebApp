import Navbar from "./Navbar";
import axios from "axios";
import { useEffect, useState } from "react";


function CreateUserStory(){
    const [projects, setProjects] = useState([]);
    const [userStory, setUserStory] = useState('');
    const [priority, setPriority] = useState('0');
    const [selectedProject, setSelectedProject] = useState('');

    const handleCreateUserStory = (e, UserStory, proj_id, priority) => {
        e.preventDefault();
        if(priority === null){
            var priority = 0;
        }
        axios.post('http://localhost:9000/createUserStory', {UserStory, proj_id, priority})
            .catch((error) => alert('Error in Creating User Story'))
        setUserStory('');
        setSelectedProject('');
        setPriority('0');
    }

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
        .then((res) => {
          setProjects(res.data)
        })
        .catch(function (error) {
          console.log(error);
        })
    }, []);
    
    return(
        <div className="View">
            <Navbar/>
            <header className="View-header">
                Create User Story
                <form className="CreateProject-form">
                    <label>
                        Project:
                        <br/>
                        <select className='select' onChange={(e) => setSelectedProject(e.target.value)} value={selectedProject}>
                        <option className="defaultValue" value=""> Select Project </option>
                        {projects.map((project, index) => {return < option key = {index} value = {project._id}>{project.project_name}</option>})}
                    </select>
                    </label>
                    <br/>
                    <label>
                        User Story:
                        <br/>
                        <textarea type="text" value={userStory} onChange={(e)=> setUserStory(e.target.value)}/>
                    </label>
                    <br/>
                    <label>
                        Priority:
                        <br/>
                        <input className = "input" type="number" value={priority} onChange={(e) => setPriority(e.target.value)}/>
                    </label>
                    <br/>
                    <br/>
                    <button className="submit" onClick={(e) => handleCreateUserStory(e, userStory, selectedProject, priority)}>
                        Create UserStory
                    </button>
                </form>
            </header>
        </div>
    )
}

export default CreateUserStory;