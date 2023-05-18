import styles from "components/UI/forms/formElement.module.css";

import inputStyles from './photoInput.module.css'
import logo from "assets/LogoMini.svg";
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";

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


export const MyPhotoInput = ({id, control, photo, className, ...props}, children) => {

    const label = control;
    const photoRef = photo;

    const onImageClick = (label) => {
        const input = label.getValue().control;
        input.click();
    }

    const onInputChange = (photo, label, e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photo.getValue().src = event.target.result;
                photo.getValue().classList.remove(inputStyles.hidden);
                label.getValue().classList.add(inputStyles.hidden);
            };

            reader.readAsDataURL(file);
        }
    }
    const onLoad = (e) => {
        e.preventDefault();
        photo.getValue().classList.remove(inputStyles.hidden);
        control.getValue().classList.add(inputStyles.hidden);
    }
    return (
        <span className={inputStyles.buttonWrapper}>
            {children}
            <div className={inputStyles.photoInputContainer}>
                <PhotoInput className={[inputStyles.photoInput, className].join(' ')}
                    onChange={onInputChange.bind(null, photoRef, label)}
                    name={name}
                    type={"file"}
                    id={id}
                    accept="image/jpeg,image/png"
                    {...props}
                />
                <label ref={control} htmlFor={id}>
                    <img className={[inputStyles.photo].join(' ')} src={logo}/>
                </label>
                <img onLoad={onLoad} onClick={onImageClick.bind(null, label)} className={[inputStyles.hidden, inputStyles.photo].join(' ')} ref={photo}/>
            </div>
        </span>
    )
}