import { useState } from "react"
import { TableItem } from "src/components/TableWrapper";

type UseModalResponse = [
    modalOpen: boolean,
    handleOpenModal: (item: TableItem) => void,
    handleCloseModal: () => void,
    modalItem: TableItem,
    toggle: () => void
]

export const useModal = (initialMode = false): UseModalResponse => {   

    const [modalOpen, setModalOpen] = useState(initialMode);
    const [modalItem, setModalItem] = useState<TableItem>();   

    const toggle = () => setModalOpen(!modalOpen)   

    const handleOpenModal = (item: TableItem) => {
        setModalOpen(true);
        setModalItem(item);
    } 
    const handleCloseModal = () => {
        setModalOpen(false);
    } 

    return [modalOpen, handleOpenModal, handleCloseModal, modalItem, toggle] 
}
