"use strict";
const validateCreateUser = (userData) => {
    const validationErrors = [];
    for (const key in userData) {
        switch (key) {
            case "first_name":
            case "last_name":
                if (typeof userData[key] !== "string") {
                    validationErrors.push(`${key} must be string`);
                    break;
                }
                if (!userData[key].trim()) {
                    validationErrors.push(`${key} Cannot be empty`);
                }
                if (userData[key].length < 3) {
                    validationErrors.push(`${key}'s min length is 3`);
                }
                if (userData[key].length > 30) {
                    validationErrors.push(`${key}'s max length is 30`);
                }
                break;
            case "email":
                if (typeof userData[key] !== "string") {
                    validationErrors.push(`${key} must be string`);
                    break;
                }
                const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
                if (!userData[key].match(emailFormat)) {
                    validationErrors.push(`${key} must be a valid email`);
                }
                break;
            case "avatar":
                if (typeof userData[key] !== "string") {
                    validationErrors.push(`${key} must be string url`);
                    break;
                }
                break;
            default:
                break;
        }
    }
    return validationErrors;
};
