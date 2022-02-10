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
    render(){
        return (
            <div>
                <p>child</p>
            </div>
        );
    }
}
export default Child;