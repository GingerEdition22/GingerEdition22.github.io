function changeThemeColor(){
    const pickerVal = document.getElementById("themeColorPicker").value;
    document.documentElement.style.setProperty("--themeColor",pickerVal);
}