
export function menuMobile () {
    const menu = document.querySelector("#menu");
    const body = document.body;

    menu.addEventListener("click", () => {
        const menuLink = document.querySelector("#menu-link");
        if (menuLink.style.display === "none") {
            menuLink.style.display = "flex";  
        } else {
            menuLink.style.display = "none";   
        }
        
    });
}