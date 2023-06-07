export const cpfValidation = (cpf: string) => {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
        return false;
    }
    if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    return true;
}