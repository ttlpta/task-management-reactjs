import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

export const CreateTaskSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  authorID: yup.number().required('Author is required'),
  ownerId: yup.number().required('Owner is required'),
  categoryId: yup.number().required('Category is required'),
});