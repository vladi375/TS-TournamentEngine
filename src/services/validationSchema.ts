import * as Yup from 'yup';

export const SignUpValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'Too Long!')
    .required('Firstname is required'),
  lastName: Yup.string().max(50, 'Too Long!').required('Lastname is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  nickname: Yup.string().max(50, 'Too Long!').required('Nickname is required'),
  country: Yup.string().required('Country is required'),
});

export const LogInValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required')});

export const SetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Passwords don't match!").required("Please confirm your password")
})
