import { yupResolver } from "@hookform/resolvers/yup";
import * as Location from "expo-location";

import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  RegisterStepFinalFormValues,
  registerStepFinalSchema,
} from "./registerValidationSchemas";

import Button from "../../atoms/Button";
import InputGroup from "../../molecules/InputGroup";
import Spacer from "../../atoms/Spacer";
import Alert from "../../atoms/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchRegisterUser from "../../../common/api/requests/auth/fetchRegisterUser";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../../../navigation/StackNavigationParams";
import Toast from "react-native-toast-message";
import type { LocationGeocodedLocation, LocationObject } from "expo-location";

export default function RegisterStepFinal() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [location, setLocation] = useState<LocationObject | null>(null);

  const { control, handleSubmit } = useForm<RegisterStepFinalFormValues>({
    defaultValues: {
      address: "",
    },
    mode: "onBlur",
    resolver: yupResolver(registerStepFinalSchema),
  });

  useEffect(() => {
    const getLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return null;

      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };

    getLocationPermission();
  }, []);

  console.log(location);

  const registerErrorToast = () =>
    Toast.show({
      type: "error",
      props: {
        title: "Oups",
        text: `Il semblerait que nous ayons rencontré un problème.`,
      },
    });

  async function onSubmit(data: RegisterStepFinalFormValues) {
    const body = {
      address: data.address,
      longitude: location?.coords.longitude,
      latitude: location?.coords.latitude,
      cp: 93310,
    };

    await AsyncStorage.mergeItem?.("userFormData", JSON.stringify(body));
    const userData = (await AsyncStorage.getItem("userFormData")) || "";

    await fetchRegisterUser({ user: JSON.parse(userData) })
      .then((res) => {
        if (res.status === 201) {
          navigation.navigate("Se connecter");
        } else {
          registerErrorToast();
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <Alert type="info">
        Totoro est une application de proximité, votre adresse de résidence nous
        permet de séléctionner les meilleurs missions près de chez vous.
      </Alert>

      <Spacer axis="vertical" size={3} />

      <Controller
        name="address"
        control={control}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <InputGroup
            label="Adresse de résidence"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="8 rue de la résidence des ploucs"
            error={error}
          />
        )}
      />

      <Spacer axis="vertical" size={3} />

      <Button handlePress={handleSubmit(onSubmit)}>Je m'inscris !</Button>
    </>
  );
}
