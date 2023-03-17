import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useAppSelector } from '../hooks/hooks';
import { selectToast } from '../store/toastSlice';

const ToastHandler: any = () => {
  const toast = useToast();
  const toastData = useAppSelector(selectToast);

  useEffect(() => {
    if (toastData?.status) {
      toast(toastData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastData]);

  return <></>;
};

export default ToastHandler;
