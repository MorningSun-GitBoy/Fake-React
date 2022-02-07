import FReact from "./f-react";

class MyComponent extends FReact.Component{
    constructor(props) {
        super(props);
        this.state = {
            num : 0
        }
    }
    addNumber(){
        console.log("点击");
        let {num} = this.state;
        num = num + 1;
        this.setState({num})
    }
    render(){
        return (
            <div>
                <p>My Component</p>
                <button onClick={this.addNumber.bind(this)}>点我</button>
                <p>state:{this.state.num}</p>
            </div>
        );
    }
}
export default MyComponent;