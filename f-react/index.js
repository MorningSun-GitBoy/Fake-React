const FReact = {
    createElement
};
function createElement(type,config,...children){
    console.log("tag",type);
    console.log("attrs",config);
    console.log("children",children);
    return {
        type,
        config,
        children
    }
}
export default FReact;