import logo from "assets/Logo.svg"
import inLove from "assets/svg/inLove.svg"
import styles from './aboutPage.module.css'
import {Link} from "@/lib/jsx/components/link/link";
export const AboutPage = () => {
    return (
        <>
            <div className={styles.page}>
                <img className={styles.test} src={logo} width="203" alt={logo}/>

                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.slogan}>
                            <div>Знакомьтесь</div>
                            <div>Слушайте</div>
                            <div>Общайтесь</div>
                        </div>
                        <Link href="/signup">
                            <div className={styles.regBtn}>
                                Регистрация
                            </div>
                        </Link>
                            <div className={styles.loginInvite}>
                                Уже есть аккаунт?

                                <Link href="/login" className={styles.loginBtn}>
                                    Войти
                                </Link>

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
