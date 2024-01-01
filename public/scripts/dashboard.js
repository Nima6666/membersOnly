const form = document.querySelector("#postMessageForm");

const addMessageButton = document.querySelector("#formOpener");
const cross = document.querySelectorAll(".cross");
const beMemberBtn = document.querySelector("#beMember");
const beMemberForm = document.querySelector("#beMemberForm");

const forms = document.querySelectorAll("form");

function showMemberForm() {
    forms.forEach((formm) => {
        formm.classList.remove("active");
    });

    beMemberForm.classList.add("active");
    document.querySelector(".panel").setAttribute("style", "display:flex");
}

function addMessageHandler() {
    forms.forEach((formm) => {
        formm.classList.remove("active");
    });

    form.classList.add("active");
    document.querySelector(".panel").setAttribute("style", "display:flex");
}

function closeForm() {
    forms.forEach((formm) => {
        formm.classList.remove("active");
    });
    document.querySelector(".panel").setAttribute("style", "display:none");
}

if (addMessageButton) {
    addMessageButton.addEventListener("click", addMessageHandler);
}
if (beMemberBtn) {
    beMemberBtn.addEventListener("click", showMemberForm);
}

cross.forEach((cros) => {
    cros.addEventListener("click", closeForm);
});
