import {processElement,commit,setAttribute} from "../f-react-inner";

export function diff(pre,next,dom){
    /*console.log('pre',pre);
    console.log('next',next);
    console.log('dom',dom);*/
    if(!pre || !next || !dom){
        return processElement(next);
    }
    let preType = typeof pre;
    let nextType = typeof next;
    if((preType === 'string' || preType === 'number') && (nextType === 'string' || nextType === 'number')){
        let text = String(next);
        if(text === String(pre)){
            console.log("unchange dom",dom);
            return dom;
        }else if(dom && dom.nodeType == 3){
            dom.textContent = text;
            return dom;
        }else return document.createTextNode(text);
    }
    if(nextType != preType){
        return processElement(next);
    }
    if(nextType === 'object'){
        if(pre.type != next.type){
            if(pre.type === 'function'){
                if(pre.type.prototype.componentWillUnmount) {
                    pre.type.prototype.componentWillUnmount();
                }
                if(pre.type.prototype.componnentDidUnmount){
                    pre.type.prototype.componentDidUnmount();
                }
            }
            return processElement(next);
        }
        if(typeof next.type === 'function'){
            if(pre.type.prototype.componentWillUnmount){
                pre.type.prototype.componentWillUnmount();
            }
            if(pre.type.prototype.componnentDidUnmount){
                pre.type.prototype.componentDidUnmount();
            }
            return processElement(next);
        }
        if(typeof next.type === 'string') {
            dom = diffAttrs(pre,next,dom);
            let preChildren = pre.children;
            let nextChildren = next.children;
            let domChildren = dom.childNodes;
            let childrenLength = Math.max(preChildren.length,nextChildren.length,domChildren.length);
            for( let i=0;i< childrenLength;i++ ){
                /*console.log(preChildren[i]);
                console.log(nextChildren[i]);
                console.log(domChildren[i]);*/
                let child = diff(preChildren[i],nextChildren[i],domChildren[i]);
                commit(dom,child,domChildren[i]);
            }
            return dom;
        }
    }
}

function diffAttrs(pre,next,dom){
    // 原来的属性和新的属性对比，不在新的属性中，则移除掉（属性值为undefined）
    for(let key in pre.config){
        if(!(key in next.config)){
            setAttribute(dom,key,undefined)
        }
    }

    // 更新属性
    // class='active' abc
    for(let key in next.config){
        if(pre.config[key] !== next.config[key]){
            // 值不同，更新值
            setAttribute(dom,key,next.config[key])
        }
    }
    return dom;
}
