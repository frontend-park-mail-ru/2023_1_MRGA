
import styles from "./styles/styles.css"
// import less from "./styles/less.less"
// import scss from "./styles/scss.scss"
// import {f} from "./ts.ts"
import {create, createRoot, rootRender, update} from "@/lib/jsx/index.ts";
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


// root.render(someFragmentVNode);

// console.log(someFragmentVNode);
// someFragmentVNode
// someArrayVNode
// update(someFragmentVNode.domElement, someFragmentVNode, someArrayVNode);
import {routes} from "/router/router.js";
