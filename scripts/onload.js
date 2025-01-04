function onLoadFunc(){
const body = document.querySelector("body");
const loadPage = body.getAttribute("data-load-page");
loadTopNav();
loadFooter();
const loadTypes = loadPage.split(",");
for(let i=0;i<loadTypes.length;i++){
  switch(loadTypes[i]){
    case "math":
      loadMidnightMath();
      break;
    case "index":
      loadIndex();
      break
  }
}
}

function loadFooter(){
    fetch("footer.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("footer").innerHTML = data;
    })
}
function loadTopNav(){
  fetch("data/topnav.json")
  .then(response => response.json())
  .then(data=>{
      const navbackground = document.createElement("div");
      navbackground.className = "navBackground";
      const navbar = document.createElement("div");
      navbar.className="topnav";
      navbar.id="navbar";

      fetch("data/resources.json")
      .then(response=>response.json())
      .then(resources =>{
          const logolink = resources.homelogo;
          navbar.innerHTML+=`
          <a class = "linkedimage" href = "index.html">
          <img src = "${logolink}" class="logo">
          </a>`;

          const navlinks = document.createElement("div");
          navlinks.className="navlinks";

          data.forEach(link=>{
              if(link.visible){
                const linkElement = document.createElement("a");
                linkElement.href = link.link;
                linkElement.dataset.page = link.dataPage;

                const classes = link.class.split(" ");
                classes.forEach(className =>{
                    linkElement.classList.add(className);
                });
                linkElement.textContent = link.text;
                navlinks.appendChild(linkElement);
              }
          });
          navlinks.insertAdjacentHTML("afterbegin",`
            <a class="closeButton unlink" href="#close" onclick="hamburgerMenu()">
            Close Menu
            </a>`);
            generateSocialIcons().then(container=>{
              if(container){
                navbar.appendChild(container);
              }
            });
            navbar.appendChild(navlinks);
            navbar.innerHTML+=`
            <a class="hamburger" onclick="hamburgerMenu()">☰</a>`;

            navbackground.appendChild(navbar);
            document.getElementById("navContainer").appendChild(navbackground);

            const currentPage = document.body.dataset.page;
            const navLinks = document.querySelectorAll("#navbar a[data-page]");
            navLinks.forEach(link =>{
                if(link.dataset.page === currentPage){
                  link.classList.add("active");
                }
            });
      });
  });
}
function generateSocialIcons(){
return fetch("/data/social.json")
  .then(response=>response.json())
    .then(data=>{
        const container = document.createElement("div");
        container.id="navsocial";

        data.forEach(link=>{
          const anchor = document.createElement("a");
          anchor.href = link.href;
          anchor.target="_blank";
          anchor.className="linkedimage";

          const img = document.createElement("img");
          img.src = link.image;
          anchor.appendChild(img);
          container.appendChild(anchor);
        });
        return container;
    });

}



function loadIndex(){
fetch("data/contentBlocks.json")
.then(response => response.json())
.then(blocks=>{
  const container = document.querySelector(".blocksContainer");
  blocks.forEach(block=>{
    if(block.visible){
    const blockElement = createBlockElement(block);
  container.prepend(blockElement);
    }
  }
  )
}
).catch(error => console.error("Error loading blocks:",error));
}


function createBlockElement(block){
  const blockElement = document.createElement("a");
  blockElement.className = "projectPanel";
  if(block.link){
    blockElement.href = block.link;
    if(block.blockClass){
      blockElement.classList.add(block.blockClass);
    }
  }
  if(block.target){
    blockElement.target=block.target;
  }
   if(block.image){
    const image = document.createElement("img");
    image.src = block.image;
    if(block.imageClass){
      image.classList.add(block.imageClass);
    }
    blockElement.appendChild(image);
   }
   if(block.header || block.body){
    const textBox = document.createElement("div");
    textBox.className = "textBox";
    blockElement.appendChild(textBox);
    if(block.header){
      const header = document.createElement("h1");
      header.textContent = block.header;
      if(block.headerClass){
        header.classList.add(block.headerClass);
      }
      textBox.appendChild(header);
      
    }
    if(block.body){
      const body = document.createElement("p");
      body.textContent = block.body;
      if(block.bodyClass){
        body.classList.add(block.bodyClass);
      }
      textBox.appendChild(body);
    }
  }
    return blockElement;
}
let hamburger = false;
  function hamburgerMenu(){
    const navlinks = document.querySelector(".navlinks");
    const logo = document.querySelector(".logo");
    const hamBtn = document.querySelector(".hamburger");
    if(!hamburger){
    logo.style.display = "scale(0)";
    hamBtn.style.opacity = "0";
    navlinks.style.transform = "scale(1)";
    navlinks.style.height = "100vh"; 
    navlinks.style.backgroundColor = "var(--gray)";
    hamburger=true;
    }else{
      hamBtn.style.opacity = "1";
      logo.style.transform = "scale(1)";
      navlinks.style.transform = "scale(0)";
      navlinks.style.height = "0vh"; 
      navlinks.style.backgroundColor = "var(--gray)";
      hamburger=false;
    }
  }