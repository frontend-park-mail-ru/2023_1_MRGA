import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import styles from './PhotoEditInput.module.css'
import {PhotoInput} from "components/UI/forms/photoInput/photoInput";
import {useRef} from "@/lib/jsx/hooks/useRef";

import logo from 'assets/LogoMini.svg'
import {Tinder} from "@/api/api";
import {SubmitButton} from "components/UI/forms/submitButton/submitButton";
import {rootRender} from "@/lib/jsx";
import {ProfilePage} from "components/App/pages/profile/profile";

function PhotoInputContainer(props, children) {
    return (
        <div {...props}>
            {children}
        </div>
    )
}

export const PhotoEditInputs = () => {

    const onInputChange = (photo, label, e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photo.getValue().src = event.target.result;
                photo.getValue().classList.remove(styles.hidden);
                label.getValue().classList.add(styles.hidden);
            };

            reader.readAsDataURL(file);
        }
    }
    const photosRef = [
        {
            photo: useRef(),
            label: useRef(),
            id: '0'
        },
        {
            photo: useRef(),
            label: useRef(),
            id: '1'
        },
        {
            photo: useRef(),
            label: useRef(),
            id: '2'
        },
        {
            photo: useRef(),
            label: useRef(),
            id: '3'
        },
        {
            photo: useRef(),
            label: useRef(),
            id: '4'
        }
    ]
    const onImageClick = (label, e) => {
        const input = label.getValue().control;
        input.click();
    }
    const loadUserData = async () => {
        try {
            const photos = (await (await Tinder.getInfoUser()).json()).body.photos;
            for (let i = 0; i < photos.length; i++) {
                const photo = (await (await Tinder.getPhoto(photos[i])).formData()).get('file');
                photosRef[i].photo.getValue().src = URL.createObjectURL(photo);
                photosRef[i].photo.getValue().classList.remove(styles.hidden);
                photosRef[i].label.getValue().classList.add(styles.hidden);
            }
        } catch (e) {
            alert('Произошла ошибка при попытке загрузить данные, попробуйте еще раз');
        }
    }
    const onClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (let {label} of photosRef) {
            const file = label.getValue().control.files[0]
            if (file) {
                formData.append('files[]', file);
            }
        }
        const respPhotoUser = await Tinder.postPhotos(formData);
        rootRender(<ProfilePage/>);
    }
    loadUserData().then();
    return (
        <>
      <FormContainer className={styles.form}>
          {photosRef.map(({photo, label, id}) => {
              return (<PhotoInputContainer className={styles.photoInputContainer}>
                  <PhotoInput onChange={onInputChange.bind(null, photo, label)} id={id} className={[styles.photoInput, styles.hidden].join(' ')}/>
                  <label ref={label} htmlFor={id}>
                      <img src={logo}/>
                  </label>
                  <img onClick={onImageClick.bind(null, label)} className={[styles.hidden, styles.photo].join(' ')} ref={photo}/>
              </PhotoInputContainer>)
          })}
      </FormContainer>
            <SubmitButton onClick={onClick}>сохранить</SubmitButton>
        </>
  )
}