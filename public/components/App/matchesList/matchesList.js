import styles from './matchesList.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";


export const MatchesList = () => {
    const loadingPhoto = "../../../assets/img/loading.png";
    
    let matches = []; // []match

    const formedMathes = () => {
        Tinder.getMatches()
        .then(resp => resp.json())
        .then(jsonMatches => {
            console.log(jsonMatches);
            if (jsonMatches.status !== 200) {
                console.log(jsonMatches.error);
                return;
            }

            if (jsonMatches.body.matches === null || jsonMatches.body.matches.length === 0) {
                jsonMatches.body.matches = [];
                console.log("Пока не встретилось взаимной симпатии");
            }
            matches = jsonMatches.body.matches;

            let divPeople = document.querySelector("#divPeople");
            matches.forEach((match) => {

                Tinder.getPhoto(match.avatar)
                .then(response => {
                    if (response.status !== 200) {
                        console.log(response.statusText);
                        return;
                    }
                    return response.formData();
                })
                .then((formData) => {
                    const fileField = formData.get('file');
                    const file = new File([fileField], 'filename');
    
                    return URL.createObjectURL(file);
                })
                .then((imageUrl) => {
                    let divProfile = document.createElement("div");
                    divProfile.setAttribute("style", "margin: 10px 15px; display: flex; flex-direction: column; align-items: center;");

                    let imgAvatarProfile = document.createElement("img");
                    imgAvatarProfile.setAttribute("style", "margin-bottom: 8px; height: 120px; width: 120px; object-fit: cover; border-radius: 50%;");
                    imgAvatarProfile.addEventListener("error", (event) => {
                        event.src = loadingPhoto;
                    });

                    imgAvatarProfile.src = imageUrl;
                    divProfile.appendChild(imgAvatarProfile);

                    let pNameProfile = document.createElement("p");
                    pNameProfile.textContent = match.name;
                    pNameProfile.setAttribute("style", "text-align: center; margin-top: 0;")
                    divProfile.appendChild(pNameProfile);

                    divPeople.appendChild(divProfile);
                });
            });
        });
    }

    const initPage = async () => {
        formedMathes();
    }
    initPage();

    return (

        <div className={styles.peopleSide}>
            <div id="divPeople" className={styles.people}>
            </div>
        </div>
    )
}