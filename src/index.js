

// const initServiceWorker = () => {
//     navigator?.serviceWorker.register('serviceWorker.js')
//         .then((reg) => {
//             console.log(reg);
//         })
//         .catch((e) =>{
//             alert(e);
//         });
// }

// initServiceWorker();

import styles from "./styles/styles.css"
// import less from "./styles/less.less"
// import scss from "./styles/scss.s css"
// import {f} from "./ts.ts"
import {createRoot} from "@/lib/jsx/index.ts";
const root = createRoot(document.getElementById('root'));


import {routes} from "/router/router.js";
