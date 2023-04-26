import styles from "components/UI/forms/formElement.module.css";

import inputStyles from './photoInput.module.css'

export const PhotoInput = ({name, ref, className, ...props}) => {
    return (
        <input className={[inputStyles.photoInput, className].join(' ')}
               name={name}
               ref={ref}
               type={"file"}
               accept="image/jpeg,image/png"
               {...props}
        />
    )
}