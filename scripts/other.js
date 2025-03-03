function changeThemeColor(){
    const pickerVal = document.getElementById("themeColorPicker").value;
    document.documentElement.style.setProperty("--themeColor",pickerVal);
}
document.addEventListener("DOMContentLoaded", async () => {
    // Get the project name from the URL
    const pathParts = window.location.pathname.split("/");
    const subDirect = pathParts[1]
    if(subDirect=="projects"){
        console.log("YIPPEEE");
    }

    try {
        // Fetch JSON data
        const response = await fetch("/projects/data.json");
        const projects = await response.json();

        // Find the matching project
        if (projects[projectName]) {
            document.getElementById("project-title").textContent = projects[projectName].title;
            document.getElementById("project-description").textContent = projects[projectName].description;
        } else {
            document.getElementById("project-title").textContent = "Project Not Found";
        }
    } catch (error) {
        console.error("Error loading project data:", error);
    }
});
