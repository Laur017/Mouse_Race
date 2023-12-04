import './Leaderboard.css'
import Crown from '../../assets/crown.png'
import { useNavigate } from 'react-router'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function Leaderboard() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:4000/get-users');
            setUsers(response.data.users); // Update state with fetched users
        } catch (error) {
            console.error('Error fetching users:', error);
        }
        };

        fetchUsers();
    }, []);

  return (
    <div className="leaderboard">
        <h2>Leaderboard <img src={Crown} /></h2>
        <div className="leaderboard-table">
            <h4>Nr.</h4>
            <h4>Username</h4>
            <h4>Time</h4>
            {users.map((user,idx) => (
                <>
                    <h5>{idx + 1}</h5>
                    <h5>{user.data.username}</h5>
                    <h5>{user.data.minutes}</h5>
                </>
            ))}
        </div>
        <div className="leaderboard-buttons">
        <button className="play-again-button" onClick={() => navigate('/')}>Home</button>
        <button className="play-again-button" onClick={() => navigate('/game')}>Play again</button>
        </div>
    </div>
  )
}
