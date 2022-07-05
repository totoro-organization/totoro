import React from 'react';
import { CustomModal as Modal, DeleteContent } from 'src/components/Modal';
import type { TableItem } from 'src/models/table';

interface DeleteJobModalProps {
  modalOpen: boolean;
  handleCloseDeleteModal: () => void;
  handleDeleteItem: (id: string) => void;
  deleteModalItem: TableItem;
}

export default function DeleteJobModal({
  modalOpen,
  handleCloseDeleteModal,
  deleteModalItem,
  handleDeleteItem
}: DeleteJobModalProps) {
  return (
    <Modal
      open={modalOpen}
      handleClose={handleCloseDeleteModal}
      title={`Supprimer la mission suivante : ${deleteModalItem?.title}`}
    >
      <DeleteContent
        message={`Etes vous sûr de vouloir supprimer la mission suivante : ${deleteModalItem.title} `}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteItem}
        item={deleteModalItem}
      />
    </Modal>
  );
}
