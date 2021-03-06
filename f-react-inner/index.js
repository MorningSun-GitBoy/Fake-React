import {diff} from "../f-react-diff";

export function processElement(element){
    if(typeof element === 'undefined'){
        return null;
    }
    if(typeof element === "string" || typeof element === "number"){
        return document.createTextNode(element);
    }else if(typeof element === "object"){
        const {type,config,children} = element;
        if(typeof type === "string"){
            const dom = document.createElement(type);
            if(config){
                Object.keys(config).forEach(key => {
                    let value = config[key];
                    setAttribute(dom,key,value);
                })
            }
            children.forEach(child => commit(dom,processElement(child)))
            //console.log(dom)
            return dom;
        }else if(typeof type === "function"){
            //console.log("component",type);
            //类组件处理
            if(type.prototype && type.prototype.render){
                let component = new type(config);
                console.log("component",component);
                //执行生命周期
                if (component.componentWillMount) {
                    component.componentWillMount()
                }
                if (config && component.componentWillReceiveProps) {
                    component.componentWillReceiveProps(config);
                }
                component.self = component.render();
                let source = processElement(component.self);
                component.source = source;
                if (component.componentDidMount) {
                    component.componentDidMount()
                }
                return source;
            }
            //函数式组件处理
            else return processElement(type());
        }
    }
}
export function commit(dom,element,lastElement){
    /*console.log('rootElement',element);
    console.log('last',lastElement);*/
    if(!dom){
        console.error("Can not commit ");
        return;
    }
    if(lastElement){
        if(element) dom.replaceChild(element,lastElement);
        else dom.removeChild(lastElement);
    }else if(element) dom.appendChild(element);
}
export function setAttribute(dom,key,value){
    if(!dom) return;
    if(key === 'className'){
        dom['class'] = value || 'f-react';
    }
    //事件处理
    else if(/on\w+/.test(key)){
        let attr = key.toLowerCase();
        console.log('attr',attr)
        dom[attr] = value || '';
    }
    //样式处理
    else if(key === 'style'){
        if(!value || typeof value === 'string'){
            dom.style.cssText = value || '';
        }else if(typeof value === 'object'){
            for( let name in value){
                let text = value[name];
                if(typeof text  === 'number'){
                    dom.style[name] = text + 'px';
                }else{
                    dom.style[name] = text;
                }
            }
        }
    }
    //其他属性 src
    else{
        dom[key] = value || '';
    }
}