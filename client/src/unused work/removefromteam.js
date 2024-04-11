const [member_idList, setMember_IDList] = useState([]);
const [memberList, setMemberList] = useState([]);

useEffect(() => {
    axios.get('http://localhost:9000/getTeamRoster', selectedTeam).then((res) => setMember_IDList(res.data.member_id))
    .catch((error) => {
        console.log(error);
    })
}, [])

useEffect(() => {
    member_idList.forEach(element => {
        axios.get('http://localhost:9000/getUserByID', element).then((res) => memberList.push({label: res.data.f_name + " " + res.data.l_name, value: res.data._id}))            
    });
})