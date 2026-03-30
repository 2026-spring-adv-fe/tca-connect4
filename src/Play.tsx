import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useEffect, useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
    setTitle: (t: string) => void;
    players: string[];
}
export const Play: React.FC<PlayProps> = ({
    addNewGameResult,
    setTitle,
    players
}) => {

    useEffect(
        () => setTitle("Play"),
        [],
    );

    // We'll write code here...
    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    const [turnNumber, setTurnNumber] = useState(1);

    // Then return JSX...
    return (
        <>
            <p 
                className="text-lg font-bold inline"
            >
                {
                    `Turn #${turnNumber}`
                }

            </p>
            <button 
                className={`btn btn-outline btn-sm mx-2`}
                disabled={turnNumber === 1}
                // onClick={() => setTurnNumber(
                //     turnNumber > 1 
                //         ? turnNumber - 1
                //         : turnNumber
                //     // Math.max(
                //     //     turnNumber - 1,
                //     //     1,
                //     // )
                // )}
                onClick={
                    () => {
                        if (turnNumber > 0) {
                            setTurnNumber(turnNumber - 1);
                        }
                    }
                }
            >
                -
            </button>
            <button 
                className="btn btn-outline btn-sm mx-2"
                onClick={() => setTurnNumber(turnNumber + 1)}
            >
                +
            </button>
            {
                players.map(
                    x => (
                        <button
                            key={x}
                            className="btn btn-soft btn-lg w-full lg:w-64 mb-2"
                            onClick={
                                () => {
                                    addNewGameResult({
                                        winner: x,
                                        players: players,
                                        start: startTimestamp,
                                        end: new Date().toISOString(),
                                        turnCount: turnNumber,
                                    });
                                    nav(-2);
                                }
                            }
                        >
                            {
                                `${x} Won `
                            }
                        </button>
                    )
                )
            }
        </>
    );
};
