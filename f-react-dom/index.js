import Component from "../f-react-component";
import {diff} from "../f-react-diff";
import {commit,processElement} from "../f-react-inner";

const FReactDom ={
    render
};
function render(element,container){
    //console.log("element",element);
    //console.log("container",container);
    if(!container){
        console.error("Root dom is wrong,please check");
        return;
    }else{
        commit(container,processElement(element));
    }
}
export default FReactDom;