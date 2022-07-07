import React from "react";
import Scanner from "../../../assets/icons/Scanner";
import useBoolean from "../../../common/hooks/useBoolean";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import Spacer from "../../atoms/Spacer";
import { Heading, Text } from "../../atoms/Text";

type SuccessModalProps = {
  handleCloseModal: () => void;
  numberOfTokens: number;
};

export default function SuccessModal({
  handleCloseModal,
  numberOfTokens,
}: SuccessModalProps) {
  const [openModal, setOpenModal] = useBoolean(true);

  return (
    <Modal
      visible={openModal}
      onCloseModal={() => {
        setOpenModal.off();
        handleCloseModal();
      }}
    >
      <Scanner size={58} />

      <Spacer axis="vertical" size={2} />

      <Heading variant="h1" color="success">
        Félicitations !
      </Heading>

      <Spacer axis="vertical" size={2} />

      <Text color="grey" align="center">
        Tu as bien validé ta mission !
      </Text>

      <Text color="grey" align="center">
        Tu remportes donc {numberOfTokens} tokens.
      </Text>

      <Spacer axis="vertical" size={2} />

      <Button
        horizontalPosition="center"
        handlePress={() => {
          setOpenModal.off();
          handleCloseModal();
        }}
      >
        Fermer
      </Button>
    </Modal>
  );
}
