import {commit} from "../f-react-dom";

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
        commit(null,this);
    }
}
export default Component;