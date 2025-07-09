import LoginPage from '@pages/LoginPage';
import AuthWrapper from './view/layouts/AuthWrapper';
import HomePage from './view/pages/HomePage';

const allRoutesMapper = [
  {
    path: '/',
    component: <LoginPage />,
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
