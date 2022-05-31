import { useState } from "react"

export const useModal = (initialMode = false) => {   

    const [modalOpen, setModalOpen] = useState(initialMode);
    const [modalItem, setModalItem] = useState();   

    const toggle = () => setModalOpen(!modalOpen)   

    const handleOpenModal = (item: any) => {
        setModalOpen(true);
        setModalItem(item);
    } 
    const handleCloseModal = () => {
        setModalOpen(false);
    } 

    return [modalOpen, handleOpenModal, handleCloseModal, modalItem, toggle] 
}
