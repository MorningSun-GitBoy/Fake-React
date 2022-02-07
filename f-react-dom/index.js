import Component from "../f-react-component";

const FReactDom ={
    render
};
function render(element,container){
    console.log("element",element);
    console.log("container",container);
    if(!container){
        console.error("Root dom is wrong,please check");
        return;
    }else{
        commit(container,processElement(element));
    }
}
function processElement(element){
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
            children.forEach(child => render(child,dom))
            console.log(dom)
            return dom;
        }else if(typeof type === "function"){
            console.log("component",type);
            //类组件处理
            if(type.prototype && type.prototype.render){
                return processElement(new type(config).render());
            }
            //函数式组件处理
            else return processElement(type());
        }
    }
}
function commit(dom,element){
    console.log('rootElement',element)
    dom.appendChild(element);
}
function setAttribute(dom,key,value){
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
export default FReactDom;