import { useNavigate } from "react-router";
import type { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { } from "human-readable";
import { useEffect } from "react";

export const APP_TITLE = "Connect 4 Companion App";

type HomeProps = {
    generalFacts: GeneralFacts;
    leaderboard: LeaderboardEntry[],
    setTitle: (t: string) => void;
};

export const Home: React.FC<HomeProps> = ({
    generalFacts,
    leaderboard,
    setTitle,
}) => {

    useEffect(
        () => setTitle(APP_TITLE),
        [],
    );

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <button
                className="btn btn-soft btn-lg w-full lg:w-64"
                onClick={
                    () => nav('/setup')
                }
            >
                Setup a Game
            </button>


            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 
                        className="card-title text-nowrap"
                    >General Facts</h2>
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
                            <tr>
                                <td>AVG Turns / Game</td>
                                <th>{generalFacts.avgTurnsPerGame}</th>
                            </tr>
                            <tr>
                                <td>Shortest Turn</td>
                                <th>{generalFacts.shortestTurn}</th>
                            </tr>
                            <tr>
                                <td>Longest Turn</td>
                                <th>{generalFacts.longestTurn}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="card bg-base-100 w-full shadow-lg my-5 overflow-x-scroll">
                <div className="card-body p-2">
                    <h2 
                        className="card-title text-nowrap"
                    >
                        Player Leaderboard
                    </h2>
                    {
                        leaderboard.length === 0
                            ? <p>N/A</p>
                            : (
                                <table className="table table-zebra">
                                    <thead>
                                        <tr>
                                            <th>W</th>
                                            <th>L</th>
                                            <th>AVG</th>
                                            <th>PLAYER</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            leaderboard.map(
                                                x => (
                                                    <tr
                                                        key={x.name}
                                                    >
                                                        <td>
                                                            {x.wins}
                                                        </td>
                                                        <td>
                                                            {x.losses}
                                                        </td>
                                                        <td>
                                                            {x.avg}
                                                        </td>
                                                        <td>
                                                            {x.name}
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                </div>
            </div>
        </>
    );
};