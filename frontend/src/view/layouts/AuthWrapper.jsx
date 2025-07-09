import React, { useState, memo, useEffect, useContext, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Context from '@/context/context';
import Service from '@/services';

const AuthWrapper = ({ children }) => {
  const checkAuth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    authState: { profileDetails, getUserProfileAction },
  } = useContext(Context);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = checkAuth();
    if (token && !profileDetails) {
      fetchUserDetails();
    }
  }, []);

  useEffect(() => {
    if (profileDetails) {
      setLoading(false);
    }
  }, [profileDetails]);

  const fetchUserDetails = useCallback(async () => {
    let response = await getUserProfileAction();
    if (response[0] === true) {
      navigate('/home');
    } else {
      setLoading(false);
      navigate('/');
    }
  }, [profileDetails, loading]);

  useEffect(() => {
    // Return cleanup function that will execute when route changes
    return () => {
      if (!loading) {
        Service.cancelAllRequests();
      }
    };
  }, [location.pathname, loading]);

  return loading ? null : children;
};

export default memo(AuthWrapper);
