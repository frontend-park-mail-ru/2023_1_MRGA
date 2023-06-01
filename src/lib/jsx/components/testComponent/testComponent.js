import {useState} from "@/lib/jsx/hooks/useState/useState";

export const TestComponent = () => {
    const [state, setState] = useState(0);


    return (
        <div style={"border: black solid 1px; margin: 20px; text-align: center; padding: 10px;"} onClick={setState.bind(null, state + 1)}>{state.toString()}</div>
    );
};
