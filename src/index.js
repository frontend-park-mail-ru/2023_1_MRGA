import {createRoot} from "@/lib/jsx/index.ts";
import {routes} from "/router/router.js";
import styles from "./styles/styles.css"

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

const root = createRoot(document.getElementById('root'));
