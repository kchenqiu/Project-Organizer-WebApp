import { useState, useEffect } from 'react';
import axios from 'axios';
import './View.css'
import Navbar from "./Navbar";

function ViewUserStory(){
    const [userStory, setUserStory] = useState([]);

    const displayUserStories = userStory.map((story) => <li> 
        {"\n"}  Project Name: {story.proj_name}
        {"\n"}  User Story: {story.userstory}
        {"\n"}  Priority: {story.priority}
    </li>)

    useEffect(() =>{
        axios.get('http://localhost:9000/getUserStories')
        .then((res) => {
            setUserStory(res.data);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

    return(
        <div className='View'>
            <Navbar/>
            <header className='View-header'>
            <h1 className="Title">
                User Story
            </h1>
            <view className="View-Display">
                    {displayUserStories}
            </view>
            </header>
        </div>
    )
}

export default ViewUserStory;