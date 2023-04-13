import styles from './matchesList.module.css'
import {User} from "@/store/user";
import {Tinder} from "@/api/api";


export const MatchesList = () => {
    return (

        <div className={styles.peopleSide}>
            <div className={styles.people}>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
                        Анастасия
                </div>
                <div className={styles.singleProfile}>
                    <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
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
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //             <div className={styles.singleProfile}>
    //                 <img className={styles.avatar} src="../../../assets/img/woman.jpeg" alt=""/>
    //                     Анастасия
    //             </div>
    //
    //
    //         </div>
    //     </div>
    // )
}