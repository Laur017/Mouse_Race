import './Leaderboard.css'
import Crown from '../../assets/crown.png'
import { useNavigate, useLocation } from 'react-router'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Leaderboard() {
    const location = useLocation()
    const thisUser = location.state?.username
    const thisUserTime = location.state?.time
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [orderedUsers,setOrderedUsers] = useState([])
    const [userPosition, setUserPosition] = useState()

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/get-users');
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };

        fetchUsers();
    }, []);

    useEffect(() =>{
        const arr = [];
        for(const i of users){
            arr.push({
                username:i.data.username,
                totalTime:i.data.minutes * 60 + i.data.seconds,
                minutes:i.data.minutes,
                seconds:i.data.seconds
            })
        }

        const sortedData = arr.sort((a, b) => a.totalTime - b.totalTime);
        setOrderedUsers(sortedData)

        const userIndex = orderedUsers.findIndex(user => user.username === thisUser);

        if (userIndex !== -1) {
            setUserPosition(userIndex + 1);
        }

    },[users])

  return (
    <div className="leaderboard">
        <h2>Leaderboard <img src={Crown} /></h2>
        <div className="leaderboard-table">
            <h4>Nr.</h4>
            <h4>Username</h4>
            <h4>Time</h4>
            {orderedUsers.slice(0, 3).map((user, idx) => (
                <>
                    <h5>{idx + 1}</h5>
                    <h5>{user.username}</h5>
                    <h5>{`${user.minutes < 10 ? "0" + user.minutes : user.minutes} : 
                            ${user.seconds < 10 ? "0" + user.seconds : user.seconds}
                    `}</h5>
                </>
            ))}

        </div>
        <h3>Your place :</h3>
        <div className="leaderboard-table user-place">
            <h5>{userPosition}</h5>
            <h5>{thisUser}</h5>
            <h5>{thisUserTime}</h5>
        </div>
        <div className="leaderboard-buttons">
        <button className="play-again-button" onClick={() => navigate('/')}>Home</button>
        <button className="play-again-button" onClick={() => navigate('/game')}>Play again</button>
        </div>
    </div>
  )
}
