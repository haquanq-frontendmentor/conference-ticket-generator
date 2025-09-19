export const setupFileField = (id: string, sizeLimitKB: number) => {
    const wrapper = document.querySelector(id) as HTMLElement;
    const input = wrapper.querySelector(".file-field__input") as HTMLInputElement;
    const hint = wrapper.querySelector(".file-field__hint") as HTMLParagraphElement;
    const thumbnail = wrapper.querySelector(".file-field__thumbnail") as HTMLElement;

    const defaultHint = hint.textContent;

    const helpers = {
        validate: () => {
            let errorMessage = "";

            if (!input.files) return;

            if (input.files.length === 0) {
                errorMessage = "Please upload your photo.";
            } else if (input.files[0].size / 1024 > sizeLimitKB) {
                errorMessage = `File too large. Please upload an image under ${sizeLimitKB}KB.`;
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
            hint.textContent = defaultHint;
        },
        showThumbnail: (imageUrl: string) => {
            thumbnail.setAttribute("showing", "");
            thumbnail.style.backgroundImage = `url(${imageUrl})`;
            thumbnail.style.backgroundSize = "cover";
        },
        clearThumbnail: () => {
            thumbnail.removeAttribute("showing");
            thumbnail.removeAttribute("style");
        },
        getName: () => {
            return input.name;
        },
        getValue: () => {
            return input.files as FileList;
        },
        focus: () => {
            requestAnimationFrame(() => {
                input.focus();
            });
        },
        reset: () => {
            helpers.clearError();
            input.value = "";
        },
    };

    input.addEventListener("change", () => {
        if (!input.files) return;

        if (helpers.validate()) {
            helpers.showThumbnail(URL.createObjectURL(input.files[0]));
        } else {
            helpers.clearThumbnail();
        }
    });

    wrapper.addEventListener("dragenter", () => {
        input.focus();
    });

    wrapper.addEventListener("drop", (e) => {
        e.preventDefault();

        if (!e.dataTransfer || e.dataTransfer.files.length === 0) return;

        input.files = e.dataTransfer.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    });

    return { ...helpers };
};
