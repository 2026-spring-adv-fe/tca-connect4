import { useNavigate } from "react-router";
import type { GameResult } from "./GameResults";
import { useState } from "react";

type PlayProps = {
    addNewGameResult: (g: GameResult) => void;
}
export const Play: React.FC<PlayProps> = ({
    addNewGameResult
}) => {

    // We'll write code here...
    const nav = useNavigate();
    const [startTimestamp] = useState(new Date().toISOString());

    // Then return JSX...
    return (
        <>
            <h1>
                Play
            </h1>
            <button 
                className="btn btn-primary btn-outline"
                onClick={
                    () => {
                        addNewGameResult({
                            winner: "Snape",
                            players: [
                                "Snape",
                                "Dumbledore",
                            ],
                            start: startTimestamp,
                            end: new Date().toISOString(),
                        });
                        nav(-2);
                    }
                }
            >
                Game Over
            </button>
        </>
    );
};
