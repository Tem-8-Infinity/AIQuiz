import * as yup from "yup";

const passwordRules = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,20}$/;


export const basicSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    userName: yup.string().min(3, 'At least 4 symbols').max(30, 'Max 30 symbols').required("Username is required"),
    email: yup.string().required("Email is required"),
    phoneNumber: yup.string().required("Phone Number is required").matches(/^\d{10}$/, 'Phone number must have exactly 10 digits'),
    password: yup.string().required("Password is required").matches(passwordRules, 'Password must be 6-20 characters with at least 1 uppercase, 1 number, and 1 symbol. '),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
    role: yup.string().oneOf(['student', 'educator', 'admin'], 'Invalid role').required("Role is required"),
})

// export const quizSchema = yup.object().shape({

// })

export const quizSchema = yup.object().shape({
    question: yup.string().required("Question is required").max(100, "The question title must be no more than 50 symbols"),
    correctAnswer: yup.string().required("Correct answer is required").matches(/^[A-Z]/, "The answer must start with a capital letter."),
    incorrectAnswers: yup.array().of(
        yup.string().required("Incorrect answer is required").matches(/^[A-Z]/, "The answer must start with a capital letter.")
    ).test(
        'unique', 'No answer should be the same as the other ones', (incorrectAnswers = [], context) => {
            const allAnswers = [context.parent.correctAnswer, ...incorrectAnswers];
            return new Set(allAnswers).size === allAnswers.length;
        }
    ),
    points: yup.number().required("Points are required").min(1).max(300),
});

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required("Email is required"),
    password: yup.string().required("Password is required"),
});