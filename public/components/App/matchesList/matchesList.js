import styles from './matchesList.module.css'
import {Tinder} from "@/api/api";

import loadingPhoto from 'assets/img/loading.png'
import {useRef} from "@/lib/jsx/hooks/useRef/useRef";
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
                let imgStyle = [styles.matchImgStyle];
                if (match.shown === false) {
                    imgStyle.push(styles.notSeen);
                }
                matches[index].ref = useRef();
                console.log(match);
                return (
                    <div className={styles.matchContainer}>
                        <img onError={onPhotoError} ref={matches[index].ref} className={imgStyle.join(' ')}/>
                        <p className={styles.matchName}>{match.name}</p>
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