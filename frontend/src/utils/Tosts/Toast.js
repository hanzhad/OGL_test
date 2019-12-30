import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import LimitedToasts from './LimitedToast';

const success = new LimitedToasts();
const error = new LimitedToasts();
const message = new LimitedToasts();

export const successToast = text => success.create(
  toast.success(text, {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }),
  1,
);

export const errorToast = text => error.create(
  toast.error(text, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }),
  2,
);

export const messageToast = text => message.create(
  toast(text, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  }),
  5,
);
