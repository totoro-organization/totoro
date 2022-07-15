import { useEffect, useState } from "react"
import { Toast, useToastContext } from "src/contexts/ToastContext";

export const useToast = () => {
    const [toast, setToast] = useState<Toast>();
    const { addToast } = useToastContext();

    useEffect(() => {
        if(toast) {
            addToast(toast)
        }
    }, [toast])

    return {
        setToast,
    }
}

