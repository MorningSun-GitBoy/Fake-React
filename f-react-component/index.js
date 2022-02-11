import {diff} from "../f-react-diff";
import {commit, processElement} from "../f-react-inner";

class Component{
    constructor(props={}) {
        this.props = props;
        this.state = {};
    }
    setState(nextState){
        let keys = Object.keys(nextState);
        keys.forEach(key => {
            this.state[key] = nextState[key]
        })
        console.log('this pointer',this);
        updateComponent(this);
    }
}
function updateComponent(component){
    let {source} = component;
    if(source) {
        if (component.componentWillUpdate) {
            component.componentWillUpdate();
        }
        let dom = source.parentNode;
        console.log('pre',component.self);
        console.log('next',component.render())
        component.source = diff(component.self,component.render(),source);
        //component.source = processElement(component.render())
        if (component.componentDidUpdate) {
            component.componentDidUpdate();
        }
        commit(dom, component.source, source);
    }
}
export default Component;