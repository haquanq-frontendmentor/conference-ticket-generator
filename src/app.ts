import { setupFileField } from "./libs/setupFileField";
import { setupTextField } from "./libs/setupTextField";

const emailTextField = setupTextField("#email-text-field");
const usernameTextField = setupTextField("#username-text-field");
const fullNameTextField = setupTextField("#full-name-text-field");

const avatarFileField = setupFileField("#avatar-file-field", 500);

const signUpForm = document.querySelector(".sign-up__form") as HTMLFormElement;
const signUpTitle = document.querySelector(".sign-up__title") as HTMLElement;
const signUpDescription = document.querySelector(".sign-up__description") as HTMLElement;

const ticket = document.querySelector(".ticket") as HTMLElement;
const ticketId = document.querySelector(".ticket__id") as HTMLElement;
const ticketAvatar = document.querySelector(".ticket__person-avatar") as HTMLImageElement;
const ticketFullName = document.querySelector(".ticket__person-name") as HTMLElement;
const ticketUsername = document.querySelector(".ticket__person-username") as HTMLElement;

function getRandomIntegerInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

signUpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const invalidFields = [];

    if (avatarFileField.validate() === false) invalidFields.push(avatarFileField);
    if (fullNameTextField.validate() === false) invalidFields.push(fullNameTextField);
    if (emailTextField.validate() === false) invalidFields.push(emailTextField);
    if (usernameTextField.validate() === false) invalidFields.push(usernameTextField);

    if (invalidFields.length > 0) {
        invalidFields[0].focus();
    } else {
        ticketFullName.textContent = fullNameTextField.getValue() as string;
        ticketUsername.textContent = ("@" + usernameTextField.getValue()) as string;
        ticketId.textContent =
            "#" +
            getRandomIntegerInclusive(1, 99999).toLocaleString(undefined, {
                minimumIntegerDigits: 5,
                useGrouping: false,
            });

        signUpTitle.innerHTML = `Congrats, <span>${fullNameTextField.getValue()}!</span> Your ticket is ready.`;
        signUpTitle.style.maxWidth = "50rem";
        signUpTitle.style.marginBottom = "2.5rem";
        signUpDescription.style.maxWidth = "45ch";
        signUpDescription.innerHTML = `We've emailed your ticket to <span>${emailTextField.getValue()}</span> and will send update in the run up to the event.`;

        ticketAvatar.src = URL.createObjectURL(avatarFileField.getValue()[0]);

        signUpForm.hidden = true;
        ticket.hidden = false;
    }
});
