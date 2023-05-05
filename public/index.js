
const swKey = 'SW_KEY'

const initServiceWorker = () => {
    console.log(!JSON.parse(localStorage.getItem(swKey)));
    navigator?.serviceWorker.register('serviceWorker.js')
        .then((reg) => {
            console.log(reg);
        })
        .catch((e) =>{
            alert(e);
        });
        localStorage.setItem(swKey, true);
}

initServiceWorker();

import styles from "./styles/styles.css"
// import less from "./styles/less.less"
// import scss from "./styles/scss.s css"
// import {f} from "./ts.ts"
import {create, createRoot, rootRender, update} from "@/lib/jsx/index.ts";
import {useState} from "@/lib/jsx/hooks/useState/useState";
const root = createRoot(document.getElementById('root'));

const someFragmentVNode =
    (<>
        <div>hello</div>
        <span>span</span>
        <div>div</div>
    </>);


let array = [0, 1, 2, 3]

const someArrayVNode = (
        array.map(el => {
        // console.log(typeof  el);
        return <div>{el}</div>
    })
)

const number = 5;
const withoutSpan = (
    <div>
        {number}
    </div>
)

const withSpan = (
    <div>
        <span>{number}</span>
    </div>
)

const FunctionalWithSpan = () => {
    const [state, setState] = useState(0);
    return (<>
        <div onClick={setState.bind(null, state + 1)}>{state}</div>
        <span>span</span>
        <div>div</div>
    </>);
}

// root.render(someFragmentVNode);
// root.render(<FunctionalWithSpan/>);

// someFragmentVNode
// someArrayVNode
// update(someFragmentVNode., someFragmentVNode, someArrayVNode);
import {routes} from "/router/router.js";
