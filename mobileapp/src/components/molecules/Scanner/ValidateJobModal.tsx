import React from "react";
import Scanner from "../../../assets/icons/Scanner";
import useBoolean from "../../../common/hooks/useBoolean";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import Spacer from "../../atoms/Spacer";
import { Heading, Text } from "../../atoms/Text";

export default function ValidateJobModal() {
  const [openModal, setOpenModal] = useBoolean(true);

  return (
    <Modal visible={openModal} onCloseModal={setOpenModal.off}>
      <Scanner size={58} />

      <Spacer axis="vertical" size={2} />

      <Heading variant="h1">Valider mes missions</Heading>

      <Spacer axis="vertical" size={2} />

      <Text color="grey" align="center">
        C'est ici que tu peux valider ta mission grâce au QR Code partagé par
        l'organisateur !
      </Text>

      <Text color="grey" align="center">
        Penses à bien autoriser Totoro à utiliser ta caméra.
      </Text>

      <Spacer axis="vertical" size={2} />

      <Button horizontalPosition="center" handlePress={setOpenModal.off}>
        Scanner mon QR Code
      </Button>
    </Modal>
  );
}
