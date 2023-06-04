export const phoneValidation = (phone: string) => {
    const regexPhone = /^(?:\((?=\d{2}\))(\d{2})\)\s?)?(9\d{8})$/;
    return regexPhone.test(phone)
}