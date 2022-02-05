const FReact = {
    createElement
};
function createElement(tag,attrs,...children){
    console.log("tag",tag);
    console.log("attrs",attrs);
    console.log("children",children);
    return {
        tag,
        attrs,
        children
    };
}
export default FReact;