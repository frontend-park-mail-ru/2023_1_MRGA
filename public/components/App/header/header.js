import logo from "assets/Logo.svg"
import {HeaderContainer} from "components/UI/containers/headerContainer/headerContainer";
import styles from './header.module.css'
import {Link} from "@/lib/jsx/components/link/link";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {useState} from "@/lib/jsx/hooks/useState";
import {TestComponent} from "@/lib/jsx/components/testComponent/testComponent";

export const RENDER_TYPE = {
    NUNJUCKS: 'nunjucks'
}

export const Header = () => {
    const [counter, setter] = useState(0);
    return (
    <HeaderContainer>
        <Link href={"/"}>
            <img src={logo} width="203" alt={logo}/>
        </Link>
        <div>
            <Link className={styles.headerElement} href={"/login"}>Вход</Link>
            <Link className={styles.headerElement} href={"/signup"}>Регистрация</Link>
        </div>
    </HeaderContainer>)
}
export const HeaderAuth = () => {
    const onLogoutClick = async (e) => {
        e.preventDefault();
        try {
            const resp = await Tinder.logout();
            const json = await resp.json();
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
    </HeaderContainer>)
}

