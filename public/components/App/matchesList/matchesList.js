import styles from './matchesList.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";


export const MatchesList = () => {
    // const name = Tinder.getUser()
    //     .then(result => result.json())
    //     .then((user) => {
    //         document.getElementById("userName").innerText = user.name;
    //     });
    // console.log("hello")
    // // console.log(name)
    // // console.log(user)

    return (

        <div className={styles.peopleSide}>
            <div className={styles.people}>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
                        Анастасия
                </div>


            </div>
        </div>


    )
    // return (
    //
    //     <div className={styles.peopleSide}>
    //         <div className={styles.people}>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/man.png" alt=""/>
    //                     Анастасия
    //             </div>
    //
    //
    //         </div>
    //     </div>
    // )
}