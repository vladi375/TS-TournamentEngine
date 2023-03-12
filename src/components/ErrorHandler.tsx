import { useSelector } from 'react-redux';
import { selectErrorCode, setErrorCode } from '../store/errorSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';
import HttpStatusCode from './../enums/httpStatusCode';

const ErrorHandler = () => {
  const errorCode = useSelector(selectErrorCode);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorCode) {
      switch (errorCode) {
        case HttpStatusCode.NotFound:
          navigate(ROUTES.NOT_FOUND);
          break;

        case HttpStatusCode.Forbidden:
          navigate(ROUTES.FORBIDDEN);
          break;

        case HttpStatusCode.Unauthorized:
          navigate(ROUTES.LOGIN);
          break;
      }
    }

    return () => {
      if (errorCode) {
        dispatch(setErrorCode(null));
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorCode]);

  return <></>;
};

export default ErrorHandler;
