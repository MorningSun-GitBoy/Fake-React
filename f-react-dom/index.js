const FReactDom ={
    render
};
function render(element,dom){
    console.log("element",element);
    console.log("context",dom);
    if(!element){
        console.warn("no element to render");
    }else{
        transferToDom(element);
    }
}
function transferToDom(element){
    if(typeof element === "object"){
        let {type,config,children} = element;
        if(typeof type === 'string'){
            console.log("this type",type);
            let dom = document.createElement(type);
            Object.keys(config).forEach( key =>{
                setAttribute(dom,key,config[key]);
            })
        }
    }
}

function setAttribute(dom,key,value){
    if(key === 'className'){
        dom['class'] = value;
    }
    if(key === 'style'){
        //string 直接写
        if(typeof value === 'string'){
            dom.style.cssText = value;
        }
        //解析对象
        Object.keys(value).forEach( key => {
            if(typeof value[key] === 'number'){
                dom.style[key] = value[key] + 'px';
            }
            if(typeof value[key] === 'string'){
                dom.style[key] = value[key];
            }
        })
    }

}
export default FReactDom;