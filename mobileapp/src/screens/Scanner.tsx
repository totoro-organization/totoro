import React, { useEffect, useState } from "react";
import {
  BarCodeScanner,
  BarCodeScannerResult,
  PermissionStatus,
} from "expo-barcode-scanner";
import { StyleSheet, View } from "react-native";

import { Text } from "../components/atoms/Text";

import ValidateJobModal from "../components/molecules/Scanner/ValidateJobModal";
import SuccessModal from "../components/molecules/Scanner/SuccessModal";

export default function ScannerPage() {
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

      <ValidateJobModal />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        type="back"
        style={StyleSheet.absoluteFill}
      />

      {scanned && (
        <SuccessModal
          // TODO: Add real tokens here
          numberOfTokens={32}
          handleCloseModal={() => setScanned(false)}
        />
      )}
    </View>
  );
}
