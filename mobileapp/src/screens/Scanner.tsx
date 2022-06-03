import React, { useEffect, useState } from "react";
import GlobalLayout from "../components/layouts/GlobalLayout";

import { BarCodeScanner, PermissionStatus } from "expo-barcode-scanner";
import Button from "../components/atoms/Button";
import { Text } from "../components/atoms/Text";

export default function Scanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    async function getScannerPermissions() {
      const { status } = await BarCodeScanner.requestPermissionsAsync();

      setHasPermission(status === PermissionStatus.GRANTED ? true : false);
    }

    getScannerPermissions();
  }, []);

  function handleBarCodeScanned({ type, data }: any) {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  }

  return (
    <GlobalLayout pageTitle="Scanner" withScanner={false}>
      {hasPermission === null && (
        <Text>Dans l'attente de l'autorisation de la caméra.</Text>
      )}
      {!hasPermission && <Text>Pas d'accès caméra.</Text>}

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      {scanned && (
        <Button handlePress={() => setScanned(false)}>
          Scanner un autre code
        </Button>
      )}
    </GlobalLayout>
  );
}
