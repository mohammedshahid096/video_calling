import React, { memo, useCallback, useState, useContext } from 'react';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import { Label } from '@shadcn/label';
import { Separator } from '@shadcn/separator';
import { Video, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Context from '@/context/context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
  password: '',
  userName: '',
  gender: 'male',
  isLoading: false,
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    authState: { registerUserAction },
  } = useContext(Context);
  const [info, setInfo] = useState(initialValues);

  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, 'Name must be at least 3 characters long')
      .max(50, 'Name must not exceed 50 characters')
      .required('Please enter your name!'),
    email: Yup.string()
      .trim()
      .min(5, 'Email must be at least 5 character long')
      .email('Please Enter the Correct Email')
      .required('please enter your email!'),
    userName: Yup.string()
      .trim()
      .min(3, 'Username must be at least 3 characters long')
      .max(20, 'Username must not exceed 20 characters')
      .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
      .required('Please enter your username!'),
    password: Yup.string()
      .trim()
      .required('please enter your password!')
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      userName: '',
      gender: 'male',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      handleSubmitFunction(values);
    },
  });
  const {
    errors,
    values,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    handleReset,
    setFieldValue,
  } = formik;

  const handleSubmitFunction = useCallback(
    async (values) => {
      if (info?.isLoading) return;
      setInfo((prev) => ({ ...prev, isLoading: true }));

      let json = {
        name: values?.name,
        email: values?.email,
        userName: values?.userName,
        password: values?.password,
        gender: values?.gender,
      };

      const response = await registerUserAction(json);
      let updateObject = {
        isLoading: false,
      };
      if (response[2] === 201) {
        handleReset();
        navigate('/');
      } else {
        toast.error(response[1]?.message || 'Something went wrong!');
      }
      setInfo((prev) => ({ ...prev, ...updateObject }));
    },
    [info?.isLoading]
  );

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to VideoConnect</h1>
          <p className="text-gray-600 mt-2">Register to start your video callings </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="name example"
              type="text"
              disabled={info?.isLoading}
              value={values?.name}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched?.name && errors?.name && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors?.name}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
              autoCorrect="off"
              disabled={info?.isLoading}
              value={values?.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched?.email && errors?.email && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors?.email}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">User Name</Label>
            <Input
              id="userName"
              placeholder="exampe123"
              type="text"
              disabled={info?.isLoading}
              value={values?.userName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            {touched?.userName && errors?.userName && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors?.userName}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type={'text'}
              placeholder="*******"
              value={values?.password}
              onChange={handleChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              onBlur={handleBlur}
              readOnly={info?.isSubmitting}
            />
            {touched?.password && errors?.password && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors?.password}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Gender</Label>

            <div class="flex flex-wrap justify-center">
              <div class="flex items-center me-4">
                <input
                  id="male-gender"
                  type="radio"
                  value={'male'}
                  checked={values?.gender === 'male'}
                  name=""
                  class="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  onChange={(e) => setFieldValue('gender', e.target.value)}
                />
                <label
                  for="green-radio"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Male
                </label>
              </div>
              <div class="flex items-center me-4">
                <input
                  id="female-gender"
                  type="radio"
                  value={'female'}
                  name="gender"
                  checked={values?.gender === 'female'}
                  className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 focus:ring-purple-500  focus:ring-2"
                  onChange={(e) => setFieldValue('gender', e.target.value)}
                />
                <label
                  for="purple-radio"
                  class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Female
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={info?.isLoading}>
            {info?.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Register
          </Button>
        </form>

        <Separator className="my-6" />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already register a account?{' '}
          <Link to="/" className="text-blue-600 hover:underline">
            Sing In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default memo(RegisterPage);
