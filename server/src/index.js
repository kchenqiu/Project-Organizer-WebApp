const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./UserSchema');
const Project = require('./ProjectSchema');
const Team = require('./TeamSchema');
const TeamRoster = require('./TeamRosterSchema');
const UserStory = require('./UserStorySchema');
const AssignUserStory = require ('./AssignUserStorySchema');

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
    const _id = req.query.user
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

app.post('/assignUserStory', async(req, res) => {
    try{
        const assignUserStory = new AssignUserStory(req.body);
        await assignUserStory.save();
        console.log(`Assigned User Story  ${assignUserStory}`);
        res.send(assignUserStory);
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

app.get('/getProject', async (req, res) => {
    try{
        const proj = await Project.findOne({_id: req.query.project_id})
        res.send(proj)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUserStorybyID', async (req, res) => {
    try{
        const userstory = await UserStory.findOne({_id: req.query.userstory_id})
        res.send(userstory)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUserStory', async (req, res) => {
    try{
        const UserStories = await UserStory.find()
        let unassigedUserStory = []

        for(const UserStory of UserStories){
            const assigned = await AssignUserStory.findOne({ userStory_id: UserStory._id });
            if(assigned){

            }
            else{
                unassigedUserStory.push({
                    _id: UserStory._id,
                    UserStory: UserStory.UserStory,
                    proj_id: UserStory.proj_id,
                    priority: UserStory.priority
                })
            }
        }

        res.send(unassigedUserStory);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getUserStories', async (req, res) => {
    try{
        const UserStories = await UserStory.find()
        let Userstory = []

        for(const UserStory of UserStories){
            const project = await Project.findOne({_id: UserStory.proj_id})
            Userstory.push({
                userstory: UserStory.UserStory,
                proj_name: project.proj_name,
                priority: UserStory.priority
            })
        }
        res.send(Userstory)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getAssignedUserStories', async(req, res)=> {
    try{
        const _id = req.query.loggedInUser;
        const assignedUserStories = await AssignUserStory.find();
        let belongsToUser = []
        for(const assignedUserStory of assignedUserStories){

            if(assignedUserStory.user_id.equals(_id)){
                const userstory = await UserStory.findOne({_id: assignedUserStory.userStory_id})
                belongsToUser.push({
                    UserStory: userstory
                })
            }
        }
        res.send(belongsToUser)
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
        const teamroster = new TeamRoster(req.body);
        await teamroster.save();
        console.log(`Team Roster Created! ${teamroster}`)
        res.send(teamroster)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getTeam', async (req, res) => {
    try{
        const _id = req.query.team_id
        const team = await Team.findOne({_id: _id})
        res.send(team)
    }
    catch (error){
        console.log("error")
        res.status(500).send(error)
    }
})

app.get('/getTeams', async (req, res) => {
    try{
        const teams = await Team.find()
        res.send(teams)
    }
    catch (error){
        res.status(500).send(error)
    }
})

app.get('/getTeamRoster', async (req, res) => {
    try{
        const team_id = req.query.team_id
        const teamRoster = await TeamRoster.findOne({team_id: team_id})
        res.send(teamRoster.member_id);
    }
    catch (error){
        res.status(500).send(error)
    }
})


app.get('/getUserTeamsAndProjects', async (req, res) => {
    try {
        const _id = req.query.loggedInUser
        const teamRosters = await TeamRoster.find();
        let inTeams = [];
        for(const teamRoster of teamRosters){
            if(teamRoster.member_id.includes(_id)){
                const team = await Team.findOne({ _id: teamRoster.team_id })
                const proj = await Project.find({ team_id: team._id })
                inTeams.push({
                    team: team,
                    project: proj
                })
            }
        }
        res.send(inTeams)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getTeamMembers', async (req, res) => {
    try{
        const team_id = req.query.team_id
        const roster = await TeamRoster.findOne({team_id: team_id})
        let teamMembers = [];
        for(const member of roster.member_id){
            const user = await User.findOne({_id: member})
            teamMembers.push({
                name: user.f_name + " " + user.l_name 
            })
        }
        res.send(teamMembers)
    }
    catch (error) {
        res.status(500).send(error)
    }
})

app.get('/getFullTeams', async (req, res) => {
    try{
        let TeamList = [];
        const teams = await Team.find();
        for(const team of teams){
            const teamRoster = await TeamRoster.findOne({team_id: team._id})

            let memberList = [];
            for(const member of teamRoster.member_id){
                const user = await User.findOne({_id: member})
                memberList.push({
                    name: user.f_name + " " + user.l_name
                })
            }
            TeamList.push({
                team_name: team.team_name,
                members: memberList,
            })
        }
        res.send(TeamList);
    }
    catch (error) {
        res.status(500).send(error)
    }
})

