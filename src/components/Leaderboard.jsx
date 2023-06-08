    import React, { useEffect, useState } from 'react';
    import newAxios from './Axios';
    import '../componentstyles/leaderboard.css';

    const Leaderboard = () => {
        const [leaderboard, setLeaderboard] = useState([]);

        useEffect(() => {
            const getLeaderboard = async () => {
                try {
                    const response = await newAxios.get(`${import.meta.env.VITE_SERVER}/users/leaderboard`);
                    setLeaderboard(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            getLeaderboard();
        }, []);

        return (
            <div className="leaderboard-container">
                <h1 className="leaderboard-title">Leaderboard</h1>
                {leaderboard &&
                    leaderboard
                        .sort((a, b) => b.gamesWon - a.gamesWon) 
                        .reverse()
                        .map((user, index) => (
                            <div key={user._id} className={index === 0 ? 'leaderboard-item winner' : 'leaderboard-item'}>
                                <span className="nickname">{user.nickname}</span>
                                <span className="games-won">{user.gamesWon ? user.gamesWon : '0'}</span>
                            </div>
                        ))}
            </div>
        );
    }

    export default Leaderboard;
