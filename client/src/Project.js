import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Project(){
    const {project_id} = useParams()
    const [project, setProject] = useState('')
    const [projectName, setProjectName] = useState('')
    const [projectDescription, setProjectDescription] = useState('')
    const [owner, setOwner] = useState('')
    const [manager, setManager] = useState('')
    const [team, setTeam] = useState('')

    useEffect(() => {
        axios.get('http://localhost:9000/getProject', {params: { project_id }})
        .then((res) => {
            setProject(res.data);
            setProjectName(res.data.proj_name);
            setProjectDescription(res.data.proj_desc);
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get('http://localhost:9000/getUserByID', { params: { user: project.prod_owner_id } })
        .then((res) => {
            setOwner(res.data.f_name + " " + res.data.l_name)
        })
        .catch((error) => {
            console.log(error);
        })
        
        axios.get('http://localhost:9000/getUserByID', { params: { user: project.mgr_id } })
        .then((res) => {
            setManager(res.data.f_name + " " + res.data.l_name)
        })
        .catch((error) => {
            console.log(error);
        })
                
        axios.get('http://localhost:9000/getTeam', { params: { team_id: project.team_id } })
        .then((res) => {
            setTeam(res.data.team_name)
        })
        .catch((error) => {
            console.log(error);
        })
    })

    return(
        <div className="View">
            <Navbar/>
            <header className="View-header">
                <div className="View-Display">
                Project: {projectName} <br/>
                Description: {projectDescription} <br/>
                Owner: {owner} <br/>
                Manager: {manager} <br/>
                Team: {team} 
                </div>
            </header>
        </div>
    )
}

export default Project;