import React, { useState, useEffect } from 'react';
import './Leaderboard.css';
import Crown from '../../assets/crown.png';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import { CONSTANTS } from '../../../constants.ts';

interface UserData {
  username: string;
  data: {
    username: string;
    minutes: number;
    seconds: number;
  };
}

interface UserTime {
  username: string;
  totalTime: number;
  minutes: number;
  seconds: number;
}

export default function Leaderboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const thisUser: string | undefined = location.state?.username;
  const thisUserTime: string | undefined = location.state?.time;

  const [users, setUsers] = useState<UserData[]>([]);
  const [orderedUsers, setOrderedUsers] = useState<UserTime[]>([]);
  const [userPosition, setUserPosition] = useState<number | undefined>();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${CONSTANTS.BASE_URL}/get-users`);
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const arr: UserTime[] = users.map((i) => ({
      username: i.data.username,
      totalTime: i.data.minutes * 60 + i.data.seconds,
      minutes: i.data.minutes,
      seconds: i.data.seconds,
    }));

    const sortedData = arr.sort((a, b) => a.totalTime - b.totalTime);
    setOrderedUsers(sortedData);

    const userIndex = orderedUsers.findIndex((user) => user.username === thisUser);

    if (userIndex !== -1) {
      setUserPosition(userIndex + 1);
    }
  }, [users]);

  return (
    <div className="leaderboard">
      <h2>
        Leaderboard <img src={Crown} alt="Crown" />
      </h2>
      <div className="leaderboard-table">
        <h4>Nr.</h4>
        <h4>Username</h4>
        <h4>Time</h4>
        {orderedUsers.slice(0, 3).map((user, idx) => (
          <React.Fragment key={idx}>
            <h5>{idx + 1}</h5>
            <h5>{user.username}</h5>
            <h5>{`${user.minutes < 10 ? '0' + user.minutes : user.minutes} : 
                            ${user.seconds < 10 ? '0' + user.seconds : user.seconds}
                    `}</h5>
          </React.Fragment>
        ))}
      </div>
      <h3>Your place :</h3>
      <div className="leaderboard-table user-place">
        <h5>{userPosition}</h5>
        <h5>{thisUser}</h5>
        <h5>{thisUserTime}</h5>
      </div>
      <div className="leaderboard-buttons">
        <button className="play-again-button" onClick={() => navigate('/')}>
          Home
        </button>
        <button className="play-again-button" onClick={() => navigate('/game')}>
          Play again
        </button>
      </div>
    </div>
  );
}
