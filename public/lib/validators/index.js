export const  validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}


export const validatePassword = (password) => {
    const minLength = 6;
    const maxLength = 20;
    const validChars = /^[a-zA-Z0-9_.-]+$/;

    if (!validChars.test(password)) {
        return {
            valid: false,
            message: "В пароле допускаются только цифры, символы латиниц, нижнее подчеркивание и точка"
        };
    }

    if (password.length < minLength || password.length > maxLength) {
        return {
            valid: false,
            message: `Длина пароля должна быть между ${minLength} и ${maxLength}.`
        };
    }
    if (!/\d/.test(password) || !/[A-Z]/.test(password)) {
        return {
            valid: false,
            message: "Пароль должен содержать как минимум одну цифру и одну заглавную букву"
        };
    }
    return { valid: true };
}

export const validateName = (name) => {
    const usernameRegex = /^[a-zA-Zа-яА-я]{3,16}$/;
    return usernameRegex.test(name);
}