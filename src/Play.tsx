import { useNavigate } from "react-router";

export const Play = () => {

    // We'll write code here...
    const nav = useNavigate();

    // Then return JSX...
    return (
        <>
            <h1>
                Play
            </h1>
            <button 
                className="btn btn-primary btn-outline"
                onClick={
                    () => nav(-2)
                }
            >
                Game Over
            </button>
        </>
    );
};
