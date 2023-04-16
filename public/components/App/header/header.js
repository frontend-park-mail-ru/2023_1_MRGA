import logo from "assets/Logo.svg"
import {HeaderContainer} from "components/UI/containers/headerContainer/headerContainer";
import styles from './header.module.css'
import {Link} from "@/lib/jsx/components/link/link";
import {Tinder} from "@/api/api";
import {Navigate} from "@/lib/jsx/components/navigate/navigate";
import {useState} from "@/lib/jsx/hooks/useState";

export const RENDER_TYPE = {
    NUNJUCKS: 'nunjucks'
}

export const Header = () => {
    const [state, setState] = useState(4);
    return (
    <HeaderContainer>
        <h1>{state.toString()}</h1>
        <img src={logo} width="203" onClick={setState.bind(this, state + 2)} alt={logo}/>
        <div>
            <Link className={styles.headerElement} href={"/login"}>Login</Link>
            <Link className={styles.headerElement} href={"/signup"}>Create account</Link>
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
        <img src={logo} width="203" alt={logo}/>
        <div>
            <a className={styles.headerElement} onClick={onLogoutClick} href={"/logout"}>Logout</a>
        </div>
    </HeaderContainer>)
}

