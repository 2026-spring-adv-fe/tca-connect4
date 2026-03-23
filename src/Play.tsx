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

    // Then return JSX...
    return (
        <>
            {
                players.map(
                    x => (
                        <button
                            className="btn btn-soft btn-lg w-full lg:w-64 mb-2"
                            onClick={
                                () => {
                                    addNewGameResult({
                                        winner: x,
                                        players: players,
                                        start: startTimestamp,
                                        end: new Date().toISOString(),
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
