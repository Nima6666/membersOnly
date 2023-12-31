const form = document.querySelector("#postMessageForm");

const addMessageButton = document.querySelector("#formOpener");
const cross = document.getElementById("cross");

function addMessageHandler() {
    console.log("clicked");
    form.setAttribute("style", "display:flex; opacity:1");
    document.querySelector(".panel").setAttribute("style", "display:block");
}

function closeForm() {
    form.setAttribute("style", "display:none; opacity:0");
    document.querySelector(".panel").setAttribute("style", "display:none");
}

addMessageButton.addEventListener("click", addMessageHandler);
cross.addEventListener("click", closeForm);
