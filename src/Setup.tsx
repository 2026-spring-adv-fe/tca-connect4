import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
    previousPlayers: string[];
    setCurrentPlayers: (players: string[]) => void;
};
export const Setup: React.FC<SetupProps> = ({
    setTitle,
    previousPlayers,
    setCurrentPlayers,
}) => {

    const [availablePlayers, setAvailablePlayers] = useState(
        previousPlayers.map(
            x => ({
                name: x,
                checked: false,
            })
        )
    );

    useEffect(
        () => setTitle("Setup"),
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
                    () => {
                        setCurrentPlayers(
                            availablePlayers
                                .filter(
                                    x => x.checked
                                )
                                .map(
                                    x => x.name
                                )
                        );
                        nav('/play')
                    }
                }
            >
                Start the Game
            </button>
            <div 
                className="join mt-4 w-full"
            >
                <input 
                    className="input join-item" 
                    placeholder="New Player Name" 
                />
                <button 
                    className="btn join-item rounded-r-full"
                >
                    Add
                </button>
            </div>
            <div className="mt-4">
                {
                    availablePlayers.map(
                        x => (
                            <label
                                key={x.name}
                                className="block mt-2"
                            >
                                <input
                                    type="checkbox"
                                    className="checkbox mr-2"
                                    checked={x.checked}
                                    onChange={
                                        () => setAvailablePlayers(
                                            availablePlayers.map(
                                                y => ({
                                                    name: y.name,
                                                    checked: y.name === x.name
                                                        ? !y.checked
                                                        : y.checked
                                                    ,
                                                })
                                            )
                                        )
                                    }
                                />
                                {x.name}
                            </label>
                        )
                    )
                }
            </div>
        </>
    );
};