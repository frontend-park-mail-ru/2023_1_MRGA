import logo from "assets/Logo.svg"
import inLove from "assets/svg/inLove.svg"
import styles from '../about/aboutPage.module.css'
import {Link} from "@/lib/jsx/components/link/link";
export const OfflineAboutPage = () => {
    return (
        <>
            <div className={styles.page}>
                <img className={styles.test} src={logo} width="203" alt={logo}/>

                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.slogan}>
                            <div>
                                <span className={[styles.flex, styles.flexColumn].join(' ')}>Знакомьтесь</span>
                                <ul style={"padding: 0; margin-top: 10px"}>
                                    <span className={styles.description}>У нас есть фильтры по интересам!</span>
                                </ul>
                            </div>
                            <div>
                                <span className={[styles.flex, styles.flexColumn].join(' ')}>Общайтесь</span>
                                <ul style={"padding: 0; margin-top: 10px"}>
                                    <span className={styles.description}>Переписывайтесь в чате 24 на 7</span>
                                </ul>
                            </div>
                            <div>
                                <span className={[styles.flex, styles.flexColumn].join(' ')}>Слушайте</span>
                                <ul style={"padding: 0; margin-top: 10px"}>
                                    <span className={styles.description}>Узнайте друг друга лучше через голосовые</span>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={inLove} alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}
