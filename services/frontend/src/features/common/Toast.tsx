import { useTheme } from '@/hooks/useTheme';
import { ToastContainer } from 'react-toastify'

export const Toast = () => {
  const [theme, setTheme, selectedTheme] = useTheme();

  return (
    <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={true}
      pauseOnHover={true}
      draggable={true}
      theme={selectedTheme}
    />
  );
};
