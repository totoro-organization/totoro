import React from "react";
import { View } from "react-native";
import Button from "../atoms/Button";
import Modal from "../atoms/Modal";
import { Text } from "../atoms/Text";
import getLocaleCurrencyNotation from "../../common/utils/getLocaleCurrencyNotation";
import Spacer from "../atoms/Spacer";
import Token from "../../assets/icons/Token";
import useBoolean from "../../common/hooks/useBoolean";
import useAuth from "../../common/hooks/useAuth";

export default function TokenButton() {
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useBoolean();

  return (
    <View>
      <Button
        size="sm"
        variant="outline"
        handlePress={setModalOpen.toggle}
        Icon={<Token color="primary" />}
      >
        {getLocaleCurrencyNotation(user?.total_token || 0)}
      </Button>

      <Modal visible={modalOpen} onCloseModal={setModalOpen.toggle}>
        <Token color="primary" size={48} />

        <Spacer axis="vertical" size={1.5} />

        <Text>Tu as actuellement</Text>
        <Text size="xl" color="primary" weight="semiBold">
          {getLocaleCurrencyNotation(user?.total_token || 0)} tokens
        </Text>

        <Spacer axis="vertical" size={1.5} />

        <Text color="grey" align="center">
          Ces tokens sont gagnés lorsque tu accomplis et valides des missions.
          Tu peux les dépenser directement dans notre boutique contre des bons
          de réductions dans les commerces locaux près de chez toi&nbsp;!
        </Text>

        <Spacer axis="vertical" size={1.5} />

        <View style={{ width: "100%" }}>
          <Button horizontalPosition="center">Voir la boutique</Button>
        </View>
      </Modal>
    </View>
  );
}
