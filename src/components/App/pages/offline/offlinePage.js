import {OfflineHeader} from "components/App/header/header";
import {Link} from "@/lib/jsx/components/link/link";
import styles from "./offline.module.css";

export const OfflinePage = () => {
    return (
        <>
            <OfflineHeader/>
            <div className={styles.container}>
                <h1 style={"flex: 0 0 100%;"}>Страница недоступна</h1>
                <h1 style={"flex: 0 0 100%;"}>На данный момент у вас нет интернета</h1>
                <div style={"flex: 0 0 100%; text-align: center;"}>Посетите страницу о приложении:</div>
                <Link style={"flex: 0 0 100%; text-align: center; font-weight: 800"} href={"/offline_about"}>О приложении</Link>
            </div>
        </>
    );
};
