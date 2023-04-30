import styles from './matchesList.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";

import loadingPhoto from 'assets/img/loading.png'
import {useRef} from "@/lib/jsx/hooks/useRef";
import {render} from "@/lib/jsx/render";
export const MatchesList = () => {

    const info = useRef();
    let matches = []; // []match
    const onPhotoError = (e) => {
        e.target.src = loadingPhoto;
    }
    const formedMathes = async () => {
        try {
            const matchesJson = await ((await Tinder.getMatches()).json());
            if (matchesJson.status !== 200) {
                info.getValue().innerHTML = 'не удалось загрузить данные';
                return ;
            }
            matches = matchesJson.body?.matches ?? [];
            const container = info.getValue();
            if (matches.length === 0) {
                info.getValue().innerHTML = "Пока не встретилось взаимной симпатии";
            }
            const domMatches = matches.map((match, index) => {
                let imgStyle = "margin-bottom: 8px; height: 120px; width: 120px; object-fit: cover; border-radius: 50%;";
                if (match.shown === false) {
                    imgStyle = `${imgStyle} border-style: solid; border-color: orange; border-width: 4px;`;
                }
                matches[index].ref = useRef();
                return (
                    <div style={"margin: 10px 15px; display: flex; flex-direction: column; align-items: center;"}>
                        <img onError={onPhotoError} ref={matches[index].ref} style={imgStyle}/>
                        <p style="text-align: center; margin-top: 0;"></p>
                    </div>
                )
            })
            render(container, domMatches);
            for (let {ref, avatar} of matches) {
                ref.getValue().src = URL.createObjectURL((await ((await Tinder.getPhoto(avatar)).formData())).get('file'));
            }
        } catch (e) {
            alert(e);
        }

    }
    formedMathes();

    return (

        <div className={styles.peopleSide}>
            <div ref={info} className={styles.people}>
            </div>
        </div>
    )
}