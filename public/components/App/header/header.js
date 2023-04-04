import logo from "assets/Logo.svg"
import {HeaderContainer} from "components/UI/containers/headerContainer/headerContainer";
import styles from './header.module.css'
import {Link} from "@/lib/jsx/components/link/link";

export const RENDER_TYPE = {
    NUNJUCKS: 'nunjucks'
}

export const Header = () => {
    return (
    <HeaderContainer>
        <img src={logo} width="203" alt={logo}/>
        <div>
            <Link className={styles.headerElement} href={"/login"}>Login</Link>
            <Link className={styles.headerElement} href={"/signup"}>Create account</Link>
        </div>
    </HeaderContainer>)
}

