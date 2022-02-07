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
    }
}
export default Component;