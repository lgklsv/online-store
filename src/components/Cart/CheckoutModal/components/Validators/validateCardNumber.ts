export const validateCardNumber = (number: string): boolean => {
    const visa = /^4\d{12}(?:\d{3})?$/;
    const mc = /^5[1-5]\d{14}$/;
    const amEx = /^3[47][0-9]{13}$/;

    if (visa.test(number)) {
        console.log('VISA');
        return true;
    } else if (mc.test(number)){
        console.log('MASTERCARD');
        return true;
    } else if (amEx.test(number)) {
        console.log('AMERICAN EXPRESS');
        return true;
    }
    return false;
};
