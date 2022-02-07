const FReact = {
    createElement
};
function createElement(type, attrs, ...children){
    console.log("type",type);
    console.log("attrs",attrs);
    console.log("children",children);
    return {
        type,
        config:attrs,
        children
    };
}
export default FReact;