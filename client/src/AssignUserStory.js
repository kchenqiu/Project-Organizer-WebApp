import { useState, useEffect } from 'react';
import axios from 'axios';
import './View.css'
import Navbar from "./Navbar";

function AssignUserStory(){
    const user_id = localStorage.getItem('loggedInUser');
    const [UserStory, setUserStory] = useState([]);
    const [selectedUserStory, setSelectedUserStory] = useState();

    useEffect(() => {
        axios.get('http://localhost:9000/getUserStory').then((res)=>setUserStory(res.data))
        .catch((error) => {
            console.log(error);
        })
    }, [])  

    const handleAssignUserStory = (e, userStory_id) =>{
        axios.post('http://localhost:9000/assignUserStory', { userStory_id, user_id })
        .then((res) => {                
            if(res){
                setSelectedUserStory("");
            }
        })
        .catch((error) => console.log(error))
    }

    return(
        <div className='View'>
            <Navbar/>
            <header className='View-header'>
                <form>
                    <label>User Story</label>
                    <br/>

                    <select className='select' onChange={(e) => setSelectedUserStory(e.target.value)} value={selectedUserStory}>
                        <option className="defaultValue" value=""> Select User Story </option>
                        {UserStory.map((userStory, index) => {return <option key = {index} value = {userStory._id}>{userStory.UserStory}</option>})}
                    </select>    
                    <br/>

                    <button type='submit' onClick={(e) => handleAssignUserStory(e, selectedUserStory)}>
                        Assign User Story
                    </button>
                </form>
            </header>
        </div>
    )
}

export default AssignUserStory;