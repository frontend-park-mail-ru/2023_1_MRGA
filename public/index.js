
import styles from "./styles/styles.css"
// import less from "./styles/less.less"
// import scss from "./styles/scss.scss"
// import {f} from "./ts.ts"
import {createRoot, createElement} from "@/lib/jsx";
const root = createRoot(document.getElementById('root'));


import {routes} from "/router/router.js";
import {Header} from "components/App/header/header";


// const onLogout = async (e) => {
//     e.preventDefault();
//     const logoutResponse = await Tinder.logout();
//     const jsonResponse = await  logoutResponse.json();
//     if (jsonResponse.status !== 200) {
//         console.log(200)
//     }
//     userStore.dispatch(setUser(undefined));
//     loginPage();
// }


// const lenta = new feedPage(root, onLogout);

// export  function loginPage(){
//     render(<AuthorizationPage/>, root)
// }

// export function signupPage() {
//     const header = new headerComponent(root)
//     const signupPage = new registrationPage(root, header, loadPage)
//     signupPage.render()
// }

// export const loadPage = async () => {
//     const userResp = await Tinder.getUser()
//     const json = await userResp.json()
//     if (json.status !== 200) {
//         loginPage()
//     } else {
//         userStore.dispatch(setUser(json))
//         await lenta.render()
//     }
// }
// console.log(<Link href={"/hello"}>MY LINK</Link>)
// console.log(<AuthorizationPage some={"hello"}/>)
// render(<AuthorizationPage some={"hello"}/>, root)
// render(<Link className={"yellow"} href="/hello" myprops={lenta}>MY LINK</Link> , root);

// loadPage()
// root.appendChild(createElement(<Header/>))

// root.appendChild(createElement(<AuthorizationPage/>))
// const jsx = <>hello</>
// render(jsx, root)
// render(<AuthorizationPage/>, root)