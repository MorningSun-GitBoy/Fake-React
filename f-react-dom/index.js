const FReactDom ={
    render
};
function render(element,context){
    console.log("element",element);
    console.log("context",context);
    if(!context){
        console.error("Root dom is wrong,please check");
        return;
    }
    if(typeof element === "string"){
        context.appendChild(document.createTextNode(element));
    }else if(typeof element === "object"){
        const {tag,attrs:config,children} = element;
        if(typeof tag === "string"){
            const dom = document.createElement(tag);
            if(config){
                Object.keys(config).forEach(key => {
                    let value = config[key];
                    setAttribute(dom,key,value);
                })
            }
            children.forEach(child => render(child,dom))
            console.log(dom)
            context.appendChild(dom);
        }
    }
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