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
    if(typeof element === "string"){
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
        }
    }
}
function commit(dom,element){
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