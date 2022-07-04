
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { useCallback, useContext, useState, createContext, SyntheticEvent } from "react";
import ToastComponent from 'src/components/Toast';

export interface Toast {
    variant: "error" | "warning" | "info" | "success",
    message: string,
    duration?: number
}

interface ToastContext {
    toasts: Toast[]
    addToast: (toast: Toast) => void
}
// eslint-disable-next-line @typescript-eslint/no-redeclare
const ToastContext = createContext<any>(function(){} as ToastContext["addToast"]);

const ToastWrapper = styled(Box)({
  position: 'fixed',
  bottom: '2rem',
  right: '2rem',
  display: 'flex',
  flexDirection: 'column',
  rowGap: '1rem'
})

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
    
  const addToast = useCallback(
      function (toast: Toast) {
          setToasts((toasts) => [...toasts, toast]);
          setTimeout(() => setToasts((toasts) => toasts.slice(1)), toast.duration ?? 3000);
      },
      [setToasts]
  );

  return (
    <ToastContext.Provider value={{addToast}}>
      {children}
      <ToastWrapper>
        {toasts.map((toast, i) => (
            <ToastComponent key={i} variant={toast.variant} text={toast.message}/>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}

export default ToastContext;