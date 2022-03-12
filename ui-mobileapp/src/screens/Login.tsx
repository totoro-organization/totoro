import React from "react";
import { Text } from "react-native";
import MainLayout from "../components/layouts/MainLayout";
import LoginForm from "../components/organisms/LoginForm/LoginForm";

export default function Login() {
  return (
    <MainLayout>
      <LoginForm />
    </MainLayout>
  );
}
