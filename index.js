import FReact from "./f-react";
import FReactDom from "./f-react-dom";

let root = document.getElementById('root');
console.log("root",root);
FReactDom.render(
    <div title={"my-div"}>
        Hello,
        <span className={"my-span"}>Fake-React</span>
    </div>,
    document.getElementById('root')
);