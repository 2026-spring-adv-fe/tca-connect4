import { useNavigate } from "react-router";

export const Home = () => {

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
        </>
    );
};