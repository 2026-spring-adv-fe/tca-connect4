import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry } from "./GameResults";

type HomeProps = {
    generalFacts: GeneralFacts;
    leaderboard: LeaderboardEntry[];
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
}) => {

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <h1>
                Home
            </h1>
            <button
                className="btn btn-primary btn-outline"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>


            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">General Facts</h2>
                    <table className="table table-zebra">
                        <tbody>
                            <tr>
                                <td>Last Played</td>
                                <th>{generalFacts.lastPlayed}</th>
                            </tr>
                            <tr>
                                <td>Total Games</td>
                                <th>{generalFacts.totalGames}</th>
                            </tr>
                            <tr>
                                <td>Shortest Game</td>
                                <th>{generalFacts.shortestGame}</th>
                            </tr>
                            <tr>
                                <td>Longest Game</td>
                                <th>{generalFacts.longestGame}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5">
                <div className="card-body p-2">
                    <h2 className="card-title">Leaderboard</h2>
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Wins</th>
                                <th>Losses</th>
                                <th>Win Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.map(
                                entry => (
                                    <tr key={entry.name}>
                                        <td>{entry.name}</td>
                                        <th>{entry.wins}</th>
                                        <th>{entry.losses}</th>
                                        <th>{entry.avg}</th>
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};