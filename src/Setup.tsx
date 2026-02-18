import { useNavigate } from "react-router";

export const Setup = () => {

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <h1>
                Setup
            </h1>
            <button 
                className="btn btn-primary btn-outline"
                onClick={
                    () => nav('/play')
                }
            >
                Start the Game
            </button>
        </>
    );
};