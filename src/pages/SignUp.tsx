import {
  ActivityIndicator,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  TextInput,
  Platform,
  Alert,
  ScrollView,
  Keyboard,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Box from "../components/Box";
import Text from "../components/Text";
import { useTheme } from "@shopify/restyle";
import { Theme } from "../styles/light";
import { useState } from "react";
import { Ionicons, MaterialIcons, AntDesign } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { supabase } from "../lib/supabase";
import { Octicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const signUpValidation = yup.object({
  email: yup
    .string()
    .email("o email precisa ser válido")
    .required("esse campo é necessário"),
  password: yup
    .string()
    .required("esse campo é necesário")
    .min(6, "mínimo de 6 caracteres"),
  code: yup.string().required("esse campo é necessário"),
});

export const SignUp = () => {
  const theme = useTheme<Theme>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidation),
  });

  const onSignUp = async (data: any) => {
    setIsLoading(true);
    if (data.code === "bolailha") {
      const { error } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        },
        {
          data: {
            user_name: data.name,
          },
        }
      );
      if (error) {
        setIsLoading(false);
        return Alert.alert("Algo deu errado");
      }
      setIsLoading(false);
    } else {
      setIsLoading(false);
      return Alert.alert("Código inválido");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
      keyboardVerticalOffset={20}
    >
      <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <ScrollView
          style={{ flex: 1, backgroundColor: theme.colors.mainBackground }}
          bounces={false}
        >
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: theme.colors.mainBackground,
            }}
          >
            <Box width={width} alignItems='center' mt='md'>
              <Image
                resizeMode='contain'
                source={require("../../assets/rhemadark.png")}
                style={{
                  width: width / 2,
                  height: height / 10,
                }}
              />
            </Box>
            <Box width={width} alignItems='center' marginTop='lg'>
              <Text color='darkGray' fontWeight={"700"} fontSize={42}>
                Criar conta
              </Text>
            </Box>

            {isLoading ? (
              <ActivityIndicator size={"large"} color={theme.colors.blue} />
            ) : (
              <Box>
                <Box
                  alignSelf={"center"}
                  minWidth={width / 1.3}
                  justifyContent='center'
                  flexDirection={"row"}
                  alignItems='center'
                  style={{
                    marginTop: height / 15,
                  }}
                >
                  <Box
                    backgroundColor={"darkGray"}
                    width={40}
                    height={40}
                    justifyContent='center'
                    alignItems={"center"}
                    flexDirection={"row"}
                    borderRadius='hg'
                    marginRight={"xs"}
                  >
                    {/**@ts-ignore */}
                    <MaterialIcons
                      name='alternate-email'
                      size={20}
                      color={theme.colors.grayBg}
                    />
                  </Box>
                  <Box>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{
                            width: width / 1.7,
                            height: 40,
                            backgroundColor: theme.colors.grayBg,
                            borderRadius: 14,
                            paddingHorizontal: 12,
                          }}
                          placeholder='Email'
                          autoCapitalize={"none"}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          secureTextEntry={false}
                        />
                      )}
                      name='email'
                    />
                    {errors.email && (
                      <Box
                        position={"absolute"}
                        marginTop='xl'
                        alignSelf={"center"}
                      >
                        <Text color='mainRed'>{errors.email.message}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  alignSelf={"center"}
                  minWidth={width / 1.3}
                  justifyContent='center'
                  flexDirection={"row"}
                  alignItems='center'
                  style={{
                    marginTop: height / 20,
                  }}
                >
                  <Box
                    backgroundColor={"darkGray"}
                    width={40}
                    height={40}
                    justifyContent='center'
                    alignItems={"center"}
                    flexDirection={"row"}
                    borderRadius='hg'
                    marginRight={"xs"}
                  >
                    {/**@ts-ignore */}
                    <Octicons
                      name='person'
                      size={20}
                      color={theme.colors.grayBg}
                    />
                  </Box>
                  <Box>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                          style={{
                            width: width / 1.7,
                            height: 40,
                            backgroundColor: theme.colors.grayBg,
                            borderRadius: 14,
                            paddingHorizontal: 12,
                          }}
                          placeholder='Nome completo'
                          autoCapitalize={"none"}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          value={value}
                          secureTextEntry={false}
                        />
                      )}
                      name='name'
                    />
                    {errors.name && (
                      <Box
                        position={"absolute"}
                        marginTop='xl'
                        alignSelf={"center"}
                      >
                        <Text color='mainRed'>{errors.name.message}</Text>
                      </Box>
                    )}
                  </Box>
                </Box>
                <Box
                  alignSelf={"center"}
                  minWidth={width / 1.3}
                  justifyContent='center'
                  flexDirection={"row"}
                  alignItems='center'
                  style={{
                    marginTop: height / 20,
                  }}
                >
                  <Box
                    backgroundColor={"darkGray"}
                    width={40}
                    height={40}
                    justifyContent='center'
                    alignItems={"center"}
                    flexDirection={"row"}
                    borderRadius='hg'
                    marginRight={"xs"}
                  >
                    {/**@ts-ignore */}
                    <Ionicons
                      name='ios-lock-closed-outline'
                      size={20}
                      color={theme.colors.grayBg}
                    />
                  </Box>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: width / 1.7,
                          height: 40,
                          backgroundColor: theme.colors.grayBg,
                          borderRadius: 14,
                          paddingHorizontal: 12,
                        }}
                        placeholder='Senha'
                        autoCapitalize={"none"}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        secureTextEntry={true}
                      />
                    )}
                    name='password'
                  />
                  {errors.password && (
                    <Box
                      position={"absolute"}
                      top={40}
                      left={100}
                      alignSelf={"center"}
                    >
                      <Text color='mainRed'>{errors.password.message}</Text>
                    </Box>
                  )}
                </Box>
                <Box
                  alignSelf={"center"}
                  minWidth={width / 1.3}
                  justifyContent='center'
                  flexDirection={"row"}
                  alignItems='center'
                  style={{
                    marginTop: height / 20,
                  }}
                >
                  <Box
                    backgroundColor={"darkGray"}
                    width={40}
                    height={40}
                    justifyContent='center'
                    alignItems={"center"}
                    flexDirection={"row"}
                    borderRadius='hg'
                    marginRight={"xs"}
                  >
                    {/**@ts-ignore */}
                    <AntDesign
                      name='pushpino'
                      size={20}
                      color={theme.colors.grayBg}
                    />
                  </Box>
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={{
                          width: width / 1.7,
                          height: 40,
                          backgroundColor: theme.colors.grayBg,
                          borderRadius: 14,
                          paddingHorizontal: 12,
                        }}
                        placeholder='Código'
                        autoCapitalize={"none"}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        value={value}
                        secureTextEntry={true}
                      />
                    )}
                    name='code'
                  />
                  {errors.code && (
                    <Box
                      position={"absolute"}
                      top={40}
                      left={100}
                      alignSelf={"center"}
                    >
                      <Text color='mainRed'>{errors.code.message}</Text>
                    </Box>
                  )}
                </Box>

                <Pressable
                  style={{
                    width: width / 1.3,
                    height: 50,
                    backgroundColor: theme.colors.grayText,
                    alignSelf: "center",
                    marginTop: 37,
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={handleSubmit(onSignUp)}
                >
                  <Text fontSize={20} fontWeight='600' color={"mainBackground"}>
                    Criar
                  </Text>
                </Pressable>
              </Box>
            )}
            <Text mt='lg' textAlign={"center"}>
              Já possui uma conta ?
            </Text>
            <Pressable
              style={{
                width: width / 3,
                height: 40,
                backgroundColor: theme.colors.grayText,
                alignSelf: "center",
                marginTop: 7,
                borderRadius: 16,
                justifyContent: "center",
                alignItems: "center",
              }}
              //@ts-ignore
              onPress={() => navigation.navigate("LoginPage")}
            >
              <Text fontSize={20} fontWeight='600' color={"mainBackground"}>
                Entrar
              </Text>
            </Pressable>
          </SafeAreaView>
        </ScrollView>
      </Pressable>
    </KeyboardAvoidingView>
  );
};
