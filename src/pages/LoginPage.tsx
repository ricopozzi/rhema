import Box from "../components/Box";
import Text from "../components/Text";
import { Theme } from "../styles/light";
import { useTheme } from "@shopify/restyle";
import { useState } from "react";
import {
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { MaterialIcons } from "@expo/vector-icons";
import { supabase } from "../lib/supabase";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("screen");

const loginSchema = yup.object({
  email: yup
    .string()
    .email("é necesário um email válido")
    .required("esse campo é necessário"),
  password: yup
    .string()
    .required("esse campo é necessário")
    .min(6, "mínimo 6 caracteres"),
});

export const LoginPage = () => {
  const theme = useTheme<Theme>();
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setIsLoading(false);
      return Alert.alert("Não foi possível realizar o login");
    }

    setIsLoading(false);
    return user;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.mainBackground,
          paddingBottom: 100,
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
        <Box
          width={width}
          alignItems='center'
          style={{
            marginTop: height / 7,
          }}
        >
          <Text color='darkGray' fontWeight={"700"} fontSize={42}>
            Entrar
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
              onPress={handleSubmit(onSubmit)}
            >
              <Text fontSize={20} fontWeight='600' color={"mainBackground"}>
                Entrar
              </Text>
            </Pressable>
          </Box>
        )}
        <Text mt='lg' textAlign={"center"}>
          Ainda não tem uma conta?
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
          onPress={() => navigation.navigate("SignUpPage")}
        >
          <Text fontSize={20} fontWeight='600' color={"mainBackground"}>
            Criar
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
