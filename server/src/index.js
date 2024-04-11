const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./UserSchema');
const Project = require('./ProjectSchema');
const Team = require('./TeamSchema');
const TeamRoster = require('./TeamRosterSchema');
const UserStory = require('./UserStorySchema');

const app = express();
app.use(express.json());
app.use(cors()); 
app.listen(9000, () => {
    console.log('Server Started at ${9000}')
})

const mongoString = "mongodb+srv://kchenqiu:0KUWq8IJ3pe08qhT@cluster0.ltiz0xk.mongodb.net/"
mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => console.log(error));

database.once('connected', () => console.log('Database Connected'));


//api endpoints
app.post('/createUser', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save()
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUser', async (req, res) => {
    const username = req.query.Username;
    const password = req.query.Password;

    try {
        const user = await User.findOne({Username: username , Password: password });
        res.send(user)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUsers', async (req, res) => {
    try {
        const userList = await User.find({}, {f_name:1, l_name:1});
        res.send(userList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUserByID', async (req, res) => {
    const _id = req.query.loggedInUser
    try{
        const user = await User.findOne({ _id : _id });
        res.send(user);
    }
    catch (error ){
        res.status(500).send(error)
    }
})

app.post('/createProject', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        console.log(`Project created! ${project}`);
        res.send(project);
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.post('/createUserStory', async(req, res) => {
    try{
        const userStory = new UserStory(req.body);
        await userStory.save();
        console.log(`User Story created! ${userStory}`);
        res.send(userStory);
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getProjects', async (req, res) => {
    try {
        const projects = await Project.find()
        let responseDetails = []
        for (const project of projects) {
           const manager = await User.findById(project.mgr_id)
           const owner = await User.findById(project.prod_owner_id)
           const team = await Team.findById(project.team_id)
           responseDetails.push({
             _id: project._id,
             project_name: project.proj_name,   
             description: project.proj_desc,
             manager_details: manager,
             owner_details: owner,
             teams_details: team
           })
        }
        res.send(responseDetails)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createTeam', async (req, res) =>{
    try{
        const team = new Team(req.body);
        await team.save();
        console.log(`Team Created! ${team}`)
        res.send(team);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.post('/createTeamRoster', async (req, res) =>{
    try{
        console.log(req.body)
        const teamroster = new TeamRoster(req.body);
        await teamroster.save();
        console.log(`Team Roster Created! ${teamroster}`)
        res.send(teamroster)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getTeamRoster', async (req, res) => {
    try{
        const team_id = req.query.team_id
        const teamRoster = await TeamRoster.find({team_id: team_id})
        res.send(teamRoster);
    }
    catch (error){
        res.status(500).send(error)
    }
})


app.get('/getTeams', async (req, res) => {
    try {
        const teamList = await Team.find({}, {team_name: 1});
        res.send(teamList)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

