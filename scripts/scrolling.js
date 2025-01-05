function scrollToEndOfSection() {
    const targetElement = document.getElementById('landing');
    const bottomOfTarget = targetElement.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottomOfTarget, // Scroll to the bottom of the target
      behavior: 'smooth'   // Smooth scrolling
    });
  }

  function scrollToAbout() {
    const body = document.querySelector("body");
  const page = body.getAttribute("data-page");
  if(page==="index"){
    const targetElement = document.querySelector('aboutBox');
    const bottomOfTarget = targetElement.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo({
      top: bottomOfTarget, // Scroll to the bottom of the target
      behavior: 'smooth'   // Smooth scrolling
    });
  }
  }