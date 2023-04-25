import {Header} from "components/App/header/header";
import {FormContainer} from "components/UI/containers/formContainer/formContainer";
import logo from "assets/Logo.svg"
import inLove from "assets/svg/inLove.svg"
import styles from './aboutPage.module.css'
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
                        <a href="#">
                            <div className={styles.regBtn}>
                                Регистрация
                            </div>
                        </a>
                            <div className={styles.loginInvite}>
                                Уже есть аккаунт?

                                <a href="#" className={styles.loginBtn}>
                                    Войти
                                </a>

                            </div>
                    </div>
                    <div className={styles.right}>
                        <img src={inLove} alt=""/>
                    </div>
                </div>
            </div>
        </>
    )
}