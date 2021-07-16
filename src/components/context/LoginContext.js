import { createContext} from "react";
import useLocalStorage from "../storage/LocalStorage";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
    const [loginData, setLoginData] = useLocalStorage('login',[{}]);

    return(
        <LoginContext.Provider value={[loginData,setLoginData]}>
            {props.children}
        </LoginContext.Provider>
    )

};