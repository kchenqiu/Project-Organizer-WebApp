import { useEffect, useState } from "react";
import axios from "axios";
import './View.css'
import Navbar from "./Navbar";

function ViewProject(){
    const [projects, setProjects] = useState([]);
    const displayProject = projects.map((projects) => <li className="View-Display"> 
            {"\n"}Project: {projects.project_name} 
            {"\n"}Description: {projects.description}  
            {"\n"}Owner: {projects.owner_details.f_name} {projects.owner_details.l_name}  
            {"\n"}Manager: {projects.manager_details.f_name} {projects.manager_details.l_name}  
            {"\n"}Team: {projects.teams_details.team_name}
            </li>)

    useEffect(() => {
        axios.get('http://localhost:9000/getProjects')
        .then((res) => {
          setProjects(res.data)
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
                    Projects 
                </h1>

                <view className="View-Display">
                    {displayProject}
                </view>

            <br/>
            </header>
        </div>
    )
}

export default ViewProject;