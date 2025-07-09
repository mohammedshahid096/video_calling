import React, { memo, useCallback, useState, useContext } from 'react';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import { Label } from '@shadcn/label';
import { Separator } from '@shadcn/separator';
import { Video, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Eye, EyeOff } from 'lucide-react';
import Context from '@/context/context';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  email: '',
  password: '',
  isLoading: false,
  showPassword: false,
};

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    authState: { loginUserAction },
  } = useContext(Context);
  const [info, setInfo] = useState(initialValues);

  const validateSchema = Yup.object().shape({
    email: Yup.string()
      .trim()
      .min(5, 'Email must be at least 5 character long')
      .email('Please Enter the Correct Email')
      .required('please enter your email!'),

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
      email: '',
      password: '',
    },
    validationSchema: validateSchema,
    onSubmit: (values) => {
      handleSubmitFunction(values);
    },
  });
  const { errors, values, touched, handleChange, handleSubmit, handleBlur, handleReset } = formik;

  const handleSubmitFunction = useCallback(
    async (values) => {
      if (info?.isLoading) return;
      setInfo((prev) => ({ ...prev, isLoading: true }));

      let json = {
        userName: values?.email,
        password: values?.password,
      };

      const response = await loginUserAction(json);
      let updateObject = {
        isLoading: false,
      };
      if (response[0] === true) {
        handleReset();
        navigate('/home');
      } else {
        toast.error(response[1]?.message || 'Something went wrong!');
      }
      setInfo((prev) => ({ ...prev, ...updateObject }));
    },
    [info?.isLoading]
  );

  const togglePasswordVisibility = useCallback(() => {
    setInfo((prevState) => ({
      ...prevState,
      showPassword: !prevState.showPassword,
    }));
  }, [info?.showPassword]);

  return (
    <div className="fullScreen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Video className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome to VideoConnect</h1>
          <p className="text-gray-600 mt-2">Sign in to start your video calls</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <div className="relative">
              <Input
                id="password"
                type={info?.showPassword ? 'text' : 'password'}
                placeholder="*******"
                value={values?.password}
                onChange={handleChange}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                onBlur={handleBlur}
                readOnly={info?.isSubmitting}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {info?.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched?.password && errors?.password && (
              <span id="email-error" className="text-red-500 text-sm">
                {errors?.password}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={info?.isLoading}>
            {info?.isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Sign In
          </Button>
        </form>

        <Separator className="my-6" />

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default memo(LoginPage);
