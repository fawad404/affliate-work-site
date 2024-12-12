import * as yup from "yup";

export const loginSchema = yup.object({
  username: yup.string().required("Required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required("Required"),
});

export const registerSchema = yup.object({
  username: yup.string().required("Required"),
  birthdate: yup.date().required('Birthdate is required'),
  email: yup.string().email("Invalid Email").required("Required"),
  // img: yup.string().required("Required"),
  address: yup.string().required("Required"),
  cnic: yup.string()
  .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format XXXXX-XXXXXXX-X')  // CNIC format validation
  .required('CNIC is required'),
  // country: yup.string().required("Required"),
  skills: yup.array()
  .of(yup.string())  // Ensure each item in the array is a string
  .min(1, "At least one skill is required")  // At least one skill must be selected
  .required("Skills are required"), // Ensure skills field is not empty
  bankIban: yup.string()
  .matches(/^PK\d{2}[A-Z0-9]{4}\d{16}$/, 'IBAN must be in the format PKXXAAAA0000000000000000')  // IBAN format validation
  ,
  easypaisaAccount: yup.string()
    .matches(
        /^(PK\d{2}[A-Z0-9]{4}\d{16})$|^((\+92|92|0)?3\d{9})$/,
        'Must be a valid Easypaisa IBAN or phone number in Pakistani format'
    ),

  password: yup
    .string()
    .min(5, "Password must be at least 5 characters long")
    .required("Required"),
});

export const taskSchema = yup.object({
  title: yup.string().required("Required"),
  // birthdate: yup.date().required('Birthdate is required'),
  // email: yup.string().email("Invalid Email").required("Required"),
  // // img: yup.string().required("Required"),
  // address: yup.string().required("Required"),
  // cnic: yup.string()
  // .matches(/^\d{5}-\d{7}-\d{1}$/, 'CNIC must be in the format XXXXX-XXXXXXX-X')  // CNIC format validation
  // .required('CNIC is required'),
  // // country: yup.string().required("Required"),
  // skills: yup.array()
  // .of(yup.string())  // Ensure each item in the array is a string
  // .min(1, "At least one skill is required")  // At least one skill must be selected
  // .required("Skills are required"), // Ensure skills field is not empty
  // bankIban: yup.string()
  // .matches(/^PK\d{2}[A-Z0-9]{4}\d{16}$/, 'IBAN must be in the format PKXXAAAA0000000000000000')  // IBAN format validation
  // .required('IBAN is required'),
  // easypaisaAccount: yup.string()
  //   .matches(
  //       /^(PK\d{2}[A-Z0-9]{4}\d{16})$|^((\+92|92|0)?3\d{9})$/,
  //       'Must be a valid Easypaisa IBAN or phone number in Pakistani format'
  //   )
  //   .required('Easypaisa IBAN or phone number is required'),

  // password: yup
  //   .string()
  //   .min(5, "Password must be at least 5 characters long")
  //   .required("Required"),
});
export const addGigSchema = yup.object().shape({
  title: yup.string().required("Required"),
  cat: yup.string().required("Required"),
  desc: yup.string().required("Required"),
  shortTitle: yup.string().required("Required"),
  shortDesc: yup.string().required("Required"),
  deliveryTime: yup.number().positive().integer().required("Required"),
  revisionNumber: yup.number().positive().integer().required("Required"),
  price: yup.number().positive().integer().required("Required"),
});
