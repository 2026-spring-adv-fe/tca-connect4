import { useEffect } from "react";
import { useNavigate } from "react-router";

type SetupProps = {
    setTitle: (t: string) => void;
};
export const Setup: React.FC<SetupProps> = ({ 
    setTitle,
}) => {

    useEffect(
            () => setTitle("Setup"),
            [],
        );

    setTitle("Setup");
    // We'll write code here...
    const nav = useNavigate();


    // Then return JSX...
    return (
        <>
            <button 
                className="btn btn-soft btn-lg w-full lg:w-64"
                onClick={
                    () => nav('/play')
                }
            >
                Start the Game
            </button>
        </>
    );
};