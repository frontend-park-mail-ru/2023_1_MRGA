import pi from "./passwordInput.module.css";
import {InputWithLabel} from "components/UI/forms/inputWithLabel/inputWithLabel";

export const PasswordInput = ({id, labelText, ref, ...props}) => {
    const onEyeClick = (e) => {
        e.preventDefault();
        e.target.classList.toggle(pi.view);
        const parent = e.target.parentNode;
        const input = parent.querySelector("input");
        const type = input.type;
        switch (type) {
            case "password":
                input.type = "text";
                break;
            default:
                input.type = "password";
        }
    };
    return (
        <span className={pi.password}>
            <InputWithLabel
                name={labelText}
                labelText={labelText}
                id={id} type={"password"}
                ref={ref}
                {...props}
            />
            <a className={pi["password-control"]} id="view-pass2" onClick={onEyeClick}></a>
        </span>
    );
};
