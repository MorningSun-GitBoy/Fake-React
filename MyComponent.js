import FReact from "./f-react";
import Child from "./Child";

class MyComponent extends FReact.Component{
    constructor(props) {
        super(props);
        this.state = {
            num : 0
        }
    }
    componentWillMount() {
        console.log('组件将要加载')
    }
    componentWillReceiveProps() {
        console.log('组件将要接受数据')
    }
    componentWillUpdate() {
        console.log('组件将要更新')
    }
    componentDidUpdate() {
        console.log('组件更新完成')
    }
    componentDidMount() {
        console.log('组件加载完成')
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
                <Child someThing={"a"}/>
                <button onClick={this.addNumber.bind(this)}>点我</button>
                <p>state:{this.state.num}</p>
            </div>
        );
    }
}
export default MyComponent;