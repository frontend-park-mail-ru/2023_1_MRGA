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
            message: "В пароле допускаются только цифры, символы латиницы, нижнее подчеркивание и точка"
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
    const usernameRegex = /^[a-zA-Zа-яА-я]{3,25}$/;
    return usernameRegex.test(name);
}

export const validateHashtags = (hashtags) => {
    let warning = ""
    let ok = false
    if (hashtags.length === 0) {
        warning = 'Вы не выбрали хэш-теги';
    } else if (hashtags.length > 5) {
        warning = 'Выберите не более 5 тегов';
    } else {
        ok = true;
    }
    return {warning: warning, ok: ok};
}

export const validateMinAge = (age) => {
    let warning = ""
    let ok = false
    if (age < 18 && age >= 0) {
        warning = 'Возраст должен быть больше или равен 18';
    } else if (age < 0) {
        warning = 'Некорректный возраст';
    } else if (isNaN(age)) {
        warning = 'Введите возраст';
    } else {
        ok = true;
    }
    return {warning: warning, ok: ok};
}

export const validateMaxAge = (age) => {
    let warning = ""
    let ok = false
    if (age < 18 && age >= 0) {
        warning = 'Возраст должен быть больше или равен 18';
    } else if (age < 0 || age>150) {
        warning = 'Некорректный возраст';
    } else if (isNaN(age)) {
        warning = 'Введите возраст';
    } else {
        ok = true;
    }
    return {warning: warning, ok: ok};
}

export const validateReasons = (reasons) => {
    let warning = ""
    let ok = false
    if (reasons.length === 0) {
        warning = 'Вы не выбрали причины для знакомств';
    } else if (reasons > 3) {
        warning = 'Выберите не более 3 причин';
    } else {
        ok = true;
    }
    return {warning: warning, ok: ok};
}
