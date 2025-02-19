function changeThemeColor(){
    const pickerVal = document.getElementById("themeColorPicker").value;
    document.documentElement.style.setProperty("--themeColor",pickerVal);
}
function typeWriter(id){
    let object = document.getElementById(id);
    if(object.innerHTML.length<object.dataset.textValue.length){
        object.innerHTML+=object.dataset.textValue.charAt(object.innerHTML.length);
        setTimeout(()=>typeWriter(id),50);
    }
}