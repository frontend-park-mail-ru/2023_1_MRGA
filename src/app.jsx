import {VDom} from "./framework/VDom";

const root = document.getElementById("root")

//  TODO нужна настройка компиляции JSx
const app = '<div><span>hello, world!</span><div>hello</div></div>';
VDom.render(app, root);