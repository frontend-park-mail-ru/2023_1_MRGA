import st from "./form.module.css";
export const Form = (props, children = {}) => {

    return (
        <form className={st.form} {...props}>
            {children}
        </form>
    );
};
