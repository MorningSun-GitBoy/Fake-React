import FReact from "./f-react";
import FReactDom from "./f-react-dom";
import App from "./App"
import MyComponent from "./MyComponent"

/*let root = document.getElementById('root');
console.log("root",root);*/
FReactDom.render(
    <div title={"my-div"}>
        Hello,
        <span className={"my-span"} onClick={()=>console.log("click")}>Fake-React</span>
        <App/>
        <MyComponent/>
    </div>,
    document.getElementById('root')
);