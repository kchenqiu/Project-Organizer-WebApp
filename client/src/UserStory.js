import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserStory(){
    const {userstory_id} = useParams();
    const [userstory, setUserStory] = useState('')
    const [project, setProject] = useState('')

    useEffect(() => {
        axios.get('http://localhost:9000/getUserStorybyID', {params: { userstory_id }})
        .then((res) => {
            setUserStory(res.data)
        })
        axios.get('http://localhost:9000/getProject', {params: { project_id: userstory.proj_id }})
        .then((res) => {
            setProject(res.data.proj_name);
        })
    })

    return(
        <div className="View">
            <Navbar/>
            <header className="View-header">
                <div className="View-Display">
                UserStory: {userstory.UserStory}<br/>
                Project: {project} <br/>
                Priority: {userstory.priority}
                </div>
            </header>
        </div>
    )
}

export default UserStory;