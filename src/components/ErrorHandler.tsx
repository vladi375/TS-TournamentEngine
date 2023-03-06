import { useSelector } from 'react-redux';
import { selectShowNotFoundPage, showNotFoundError } from '../store/errorSlice';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/hooks';

const ErrorHandler = () => {
  const goToNotFoundPage = useSelector(selectShowNotFoundPage);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (goToNotFoundPage) {
      navigate(ROUTES.NOT_FOUND);
    }

    return () => {
      dispatch(showNotFoundError(false));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goToNotFoundPage]);

  return <></>;
};

export default ErrorHandler;
