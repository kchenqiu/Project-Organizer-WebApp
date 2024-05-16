import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton} from 'react-bootstrap'  
import './Navbar.css';

function Navbar(){
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem('loggedInUser')

    const handleSignOut = (e) => {
        e.preventDefault()
        localStorage.clear()
        navigate("/Login");
    }

    return(
        <nav className="Navbar">
            <ul>            
                <li>
                    <a href="/Home" className="link"> Home </a>
                </li>    

                <li>
                    <DropdownButton className="DropDown" id = "Project-DropDown" title = "Project">
                        <Dropdown.Item className="link" href="/CreateProject"> Create Project </Dropdown.Item> 
                        <br/>
                        <Dropdown.Item className="link" href="/CreateUserStory"> Create User Story </Dropdown.Item>                         
                        <br/>
                        <Dropdown.Item className="link" href="/AssignUserStory"> Assign User Story </Dropdown.Item>     
                        <br/>
                        <Dropdown.Item className="link" href="/ViewProject"> View Projects </Dropdown.Item>        
                        <br/>
                        <Dropdown.Item className="link" href="/ViewUserStory"> View User Story </Dropdown.Item>   
                    </DropdownButton>
                </li>
                <li>
                    <DropdownButton className="DropDown" id = "Team-DropDown" title = "Team">
                        <Dropdown.Item className="link" href="/CreateTeam"> Create Team </Dropdown.Item> 
                        <br/>
                        <Dropdown.Item className="link" href="/CreateTeamRoster"> Create Team Roster </Dropdown.Item> 
                        <br/>
                        <Dropdown.Item className="link" href="/ViewTeam"> View Teams </Dropdown.Item> 
                    </DropdownButton>
                </li>
                <li className = "Signout">
                    { loggedInUser != null &&
                        <button className= 'SignoutButton' onClick={(e) => handleSignOut(e) }>
                            Sign Out
                        </button>
                    }  
                </li>  
            </ul>
        </nav>
    )
}

export default Navbar;