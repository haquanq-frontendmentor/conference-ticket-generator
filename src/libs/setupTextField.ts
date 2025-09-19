export const setupTextField = (id: string) => {
    const wrapper = document.querySelector(id) as HTMLElement;
    const input = wrapper.querySelector(".text-field__input") as HTMLInputElement;
    const hint = wrapper.querySelector(".text-field__hint") as HTMLParagraphElement;

    const helpers = {
        validate: () => {
            let errorMessage = "";

            if (input.validity.valueMissing) {
                errorMessage = "Please fill out this field.";
            }

            if (input.validity.typeMismatch) {
                errorMessage = `Please provide a correct ${input.type}.`;
            }

            if (errorMessage !== "") {
                helpers.showError(errorMessage);
                return false;
            }

            helpers.clearError();
            return true;
        },
        showError: (message: string) => {
            wrapper.setAttribute("aria-invalid", "true");
            input.setAttribute("aria-invalid", "true");
            hint.textContent = message;
        },
        clearError: () => {
            wrapper.setAttribute("aria-invalid", "false");
            input.setAttribute("aria-invalid", "false");
            hint.textContent = "";
        },
        getName: () => {
            return input.name;
        },
        getValue: () => {
            if (input.value === "") return null;
            return input.value;
        },
        focus: () => {
            input.focus();
        },
        reset: () => {
            helpers.clearError();
            input.value = "";
        },
    };

    const eventHandlers = {
        blurEvent: () => {
            helpers.validate();
        },
    };

    input.addEventListener("blur", eventHandlers.blurEvent);
    return { ...helpers };
};
