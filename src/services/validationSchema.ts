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

export const SibmitGameResultValidationSchema = Yup.object().shape({
  tournament: Yup.number().moreThan(0, 'Please choose tournament'),
  identifier: Yup.string().required('Please add game identifier'),
  power: Yup.string().required("Please chose your side"),
  opposingPlayer: Yup.number().moreThan(0, 'Please specify your opponent'),
  winningPower: Yup.string().required('Please specify the winning power'),
  gameEndTurn: Yup.number().moreThan(0, 'Please specify game end turn'),
  gameEndType: Yup.number().moreThan(0, 'Please specify game end type'),
  date: Yup.date().required('Please specify the date, when the game was played'),
  linkToVideo: Yup.string().url('Only valid URL is allowed')
})
