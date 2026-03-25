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

    //
    // React hooks...
    // . local state
    // . effects
    // . navigation
    //

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

    const [newPlayerName, setNewPlayerName] = useState("");

    //
    // Derived or calculate state or other code...
    //

    const dupePlayerName = availablePlayers.some(
        x => x.name === newPlayerName
    );

    const twoPlayersChosen = availablePlayers.filter(x => x.checked).length === 2;


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
                disabled={
                    !twoPlayersChosen
                }
            >
                
                {
                    !twoPlayersChosen
                        ? "Choose 2 Players"
                        : "Start Game"
                }
            </button>
            <div
                className="join mt-4 w-full lg:w-64"
            >
                <input
                    type="text"
                    className={`input join-item ${dupePlayerName ? 'input-error' : ''}`}
                    placeholder="New Player Name"
                    value={newPlayerName}
                    onChange={
                        (e) => setNewPlayerName(
                            e.target.value
                        )
                    }
                />
                <button
                    className="btn join-item rounded-r-full"
                    onClick={
                        () => {
                            setAvailablePlayers(
                                [
                                    ...availablePlayers,
                                    {
                                        name: newPlayerName,
                                        checked: true,
                                    },
                                ].sort(
                                    (a, b) => a.name.localeCompare(b.name)
                                )
                            )
                            setNewPlayerName(
                                ""
                            );
                        }
                    }
                    disabled={
                        newPlayerName.length === 0 || dupePlayerName
                    }
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