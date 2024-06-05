import { authKey } from "@/constants/authKey"
import { decodedToken } from "@/utils/jwt"
import { getFromLocalStorage, removeFromLocalStorage, setToLocalStorage } from "@/utils/local-storage"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime"

export const storeUserInfo = (accessToken: string) => {
  setToLocalStorage(authKey, accessToken)
}

export const getUserInfo = () => {
  const authToken = getFromLocalStorage(authKey);
  //   console.log(authToken);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role?.toLowerCase(),
    };
  }
};

export const isloggedIn = () => {
  const authToken = getFromLocalStorage(authKey)
  if (authToken) {
    return !!authToken
  }
}

export const removeUser = () => {
  return removeFromLocalStorage(authKey)
}

export const logoutUser = (router: AppRouterInstance) => {
  localStorage.removeItem(authKey);
  // deleteCookies([authKey, 'refreshToken']);
  router.push('/');
  router.refresh();
};