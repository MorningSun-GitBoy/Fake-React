import FReact from "./f-react";

class Child extends FReact.Component{
    constructor(props) {
        super(props);
        this.state = {
            num : 0
        }
    }
    componentWillMount(){
        console.log("child will mount");
    }
    componentWillReceiveProps(nextProps){
        console.log("child receive props",nextProps);
    }
    componentWillUnmount(){
        console.log("Child will unmount");
    }
    render(){
        return (
            <div>
                <p>child</p>
            </div>
        );
    }
}
export default Child;