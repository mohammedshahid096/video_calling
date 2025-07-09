import LoginPage from '@pages/LoginPage';
import AuthWrapper from './view/layouts/AuthWrapper';
import HomePage from './view/pages/HomePage';
import RegisterPage from './view/pages/RegisterPage';

const allRoutesMapper = [
  {
    path: '/',
    component: <LoginPage />,
  },
  {
    path: '/register',
    component: <RegisterPage />,
  },
  {
    path: '/home',
    component: (
      <AuthWrapper>
        <HomePage />
      </AuthWrapper>
    ),
  },
];

export default allRoutesMapper;
