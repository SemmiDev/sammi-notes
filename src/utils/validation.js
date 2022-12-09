const reFullName = /^[a-zA-Z ]{2,30}$/;
const reEmail = /\S+@\S+\.\S+/;
const rePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const validateFullName = (fullName) => {
    if (!fullName || fullName.trim() === '') {
        return {
            error: true,
            message: 'Is required',
        };
    }

    if (!reFullName.test(fullName)) {
        return {
            error: true,
            message: 'Min 2, max 30, only letters and space',
        };
    }

    return {
        error: false,
        message: '',
    };
};

export const validateEmail = (email) => {
    if (!email || email.trim() === '') {
        return {
            error: true,
            message: 'Is required',
        };
    }

    if (!reEmail.test(email)) {
        return {
            error: true,
            message: 'Is not valid',
        };
    }

    return {
        error: false,
        message: '',
    };
};

export const validatePassword = (password) => {
    if (!password || password.trim() === '') {
        return {
            error: true,
            message: 'Is required',
        };
    }

    if (!rePassword.test(password)) {
        return {
            error: true,
            message: 'Min 8, UPPER/lowercase and numbers',
        };
    }

    return {
        error: false,
        message: '',
    };
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword || confirmPassword.trim() === '') {
        return {
            error: true,
            message: 'Is required',
        };
    }

    if (password !== confirmPassword) {
        return {
            error: true,
            message: 'Passwords do not match',
        };
    }

    return {
        error: false,
        message: '',
    };
};
