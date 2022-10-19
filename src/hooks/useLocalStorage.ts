import { ref, onMounted, watch } from "vue";
import type { IUserInfoResponse } from "@/services/user";
import { USER_INFO_KEY } from "@/utils/auth";

export function useLocalStorage() {
  const userInfo = ref<IUserInfoResponse>({
    userID: "",
    username: "",
    email: "",
    fullName: "",
    age: 0,
    gender: "",
    roles: [],
    roleHighest: "",
  });

  onMounted(() => {
    userInfo.value = JSON.parse(localStorage.getItem(USER_INFO_KEY) || "{}");
  });

  watch(
    () => userInfo.value,
    (newValue: IUserInfoResponse, oldValue: IUserInfoResponse) => {
      localStorage.setItem(USER_INFO_KEY, JSON.stringify(newValue));
    }
  );

  return { userInfo };
}
