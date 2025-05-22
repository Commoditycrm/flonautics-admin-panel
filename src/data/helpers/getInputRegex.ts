export const getInputRegex = (field: string): { pattern: RegExp; message: string } | undefined => {

    const namePattern = /^[A-Za-z\s'-]{2,20}$/;
    const nameMessage = "Must contain only letters and be 2–20 characters long";

    const regexMap: Record<string, { pattern: RegExp; message: string }> = {
        email: {
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid email format",
        },
        businessEmail: {
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Invalid business email format",
        },
        phone: {
            pattern: /^\d{10}$/,
            message: "Phone number must be 10 digits",
        },
        website: {
            pattern: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,6})(\/[\w.-]*)*\/?$/,
            message: "Invalid website URL",
        },
        pincode: {
            pattern: /^\d{6}$/,
            message: "Pincode must be 6 digits",
        },
        firstName: {
            pattern: namePattern,
            message: `First name ${nameMessage}`,
        },
        middleName: {
            pattern: namePattern,
            message: `Middle name ${nameMessage}`,
        },
        lastName: {
            pattern: namePattern,
            message: `Last name ${nameMessage}`,
        },
        city: {
            pattern: namePattern,
            message: `City ${nameMessage}`,
        },
        state: {
            pattern: namePattern,
            message: `State ${nameMessage}`,
        },
        country: {
            pattern: namePattern,
            message: `Country ${nameMessage}`,
        },
        designation: {
            pattern: /^[A-Za-z\s'-]{2,30}$/,
            message: "Designation must contain only letters and be 2–30 characters long",
        },
        linkedin: {
            pattern: /^(https?:\/\/)?(www\.)?linkedin\.com\/(in|pub|company)\/[A-Za-z0-9_-]+\/?$/,
            message: "Enter a valid LinkedIn profile or company URL",
        },
    };

    return regexMap[field];
};
