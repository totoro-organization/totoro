import React, { useEffect, useState } from "react";
import GlobalLayout from "../components/layouts/GlobalLayout";

import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import Button from "../components/atoms/Button";
import { Text } from "../components/atoms/Text";

import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    async function getScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === PermissionStatus.GRANTED ? true : false);
    }

    getScannerPermissions();
  }, []);

  function handleBarCodeScanned({ type, data }: BarCodeScannerResult) {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  return (
    <View style={{ flex: 1 }}>
      {hasPermission === null && (
        <Text color="white">
          Dans l'attente de l'autorisation de la caméra.
        </Text>
      )}

      {!hasPermission && <Text color="white">Pas d'accès caméra.</Text>}

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        type="back"
        style={StyleSheet.absoluteFill}
      />

      {scanned && (
        <FixedWrapper>
          <Button
            handlePress={() => setScanned(false)}
            horizontalPosition="stretch"
          >
            Scanner une autre mission
          </Button>
        </FixedWrapper>
      )}
    </View>
  );
}

const FixedWrapper = styled.View`
  width: 100%;
  position: absolute;
  bottom: 24px;
  padding: 0 24px;
`;
