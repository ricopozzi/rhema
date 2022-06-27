import { createContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

interface SignUpProps {
  user_name: string;
  email: string;
  password: string;
}

interface ContextProps {
  signupItems: SignUpProps;
  handleNewSignup: any;
}

//@ts-ignore
const SignUpContext = createContext<ContextProps>({});

function SignupProvider({ children }: any) {
  const navigation = useNavigation();
  const [signupItems, setSignupItems] = useState<SignUpProps>();

  const handleNewSignup = async (data: SignUpProps) => {
    setSignupItems({
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    });
    //@ts-ignore
    return navigation.navigate("signupSecond");
  };

  return (
    <>
      {/*@ts-ignore */}
      <SignUpContext.Provider value={{ signupItems, handleNewSignup }}>
        {children}
      </SignUpContext.Provider>
    </>
  );
}
export { SignUpContext, SignupProvider };
