import styles from '../formElement.module.css'

export const Select = (arrayOptions, {...props}) => {
    let select = document.querySelector(".formElement");
    arrayOptions.forEach(element => {
        let option = document.createElement('option');
        option.value = element;
        option.text = element;
        select.appendChild(option);
    });
    return (
        <select className={styles.formElement} {...props}>
        </select>
    )
}
