
import styles from "./styles/styles.css"
// import less from "./styles/less.less"
// import scss from "./styles/scss.scss"
// import {f} from "./ts.ts"
import {createRoot} from "@/lib/jsx/index.ts";
const root = createRoot(document.getElementById('root'));


import {routes} from "/router/router.js";
import {Header} from "components/App/header/header";
const emptyElement = (
    <>
        <div>hello</div>
        <div>goodbye</div>
    </>);
console.log(h(emptyElement));

// root.render(emptyElement);
