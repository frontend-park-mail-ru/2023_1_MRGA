import logo from "assets/Logo.svg"
import {HeaderContainer} from "components/UI/containers/headerContainer/headerContainer";
import styles from './header.module.css'
import {Link} from "@/lib/jsx/components/link/link";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {useState} from "@/lib/jsx/hooks/useState/useState";
import {TestComponent} from "@/lib/jsx/components/testComponent/testComponent";
import {setUser, userStore} from "@/store/user";

export const Header = () => {
    return (
    <HeaderContainer>
        <Link href={"/"}>
            <img src={logo} width="203" alt={logo}/>
        </Link>
        <div>
            <Link className={styles.headerElement} href={"/login"}>Вход</Link>
            <Link className={styles.headerElement} href={"/signup"}>Регистрация</Link>
        </div>
    </HeaderContainer>
    )
}

export const OfflineHeader = () => {
    return (
        <HeaderContainer>
            <Link href={"/"}>
                <img src={logo} width="203" alt={logo}/>
            </Link>
            <div>
                <Link className={styles.headerElement} href={"/offline_about"}>О приложении</Link>
            </div>
        </HeaderContainer>
    )
}

export const HeaderAuth = () => {


    const onLogoutClick = async (e) => {
        e.preventDefault();
        try {
            const resp = await Tinder.logout();
            const json = await resp.json();
            setUser(undefined);
            Navigate({to:"/login"});
        } catch (e) {
            alert(e);
        }

    }
    return (
    <HeaderContainer>
        <Link href={"/"}>
            <img src={logo} width="203" alt={logo}/>
        </Link>
        <div>
            <a className={styles.headerElement} onClick={onLogoutClick} href={"/logout"}>Выйти</a>
        </div>
    </HeaderContainer>
    )
}
