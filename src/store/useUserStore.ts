import { ref } from "vue";
import { defineStore } from "pinia";
import { IUser, IUserAndAuth } from "@/interfaces";
import { db, auth as authFirebase } from "@/firebase/firebase.config";

export const useUserStore = defineStore("user", () => {
  const user = ref<IUser>({
    id: "",
    name: "",
    lastname: "",
    blogposts: [],
  });

  const isAuthenticated = ref<boolean>(false);

  async function auth(email: string, password: string) {
    try {
      const response = await authFirebase.signInWithEmailAndPassword(
        email,
        password
      );

      if (response.user === null) {
        throw new Error("User not found");
      }

      const { docs } = await db.collection("users").get();

      for (const doc of docs) {
        const userResponse = doc.data();

        if (userResponse.id === response.user.uid) {
          isAuthenticated.value = true;
          user.value = { ...userResponse } as IUser;
        }
        return;
      }
    } catch (error) {
      console.log("[Auth User]", error);
    }
  }

  function logOut() {
    user.value = {
      id: "",
      name: "",
      lastname: "",
      blogposts: [],
    };
    isAuthenticated.value = false;
  }

  async function createUser({ name, password, email, lastname }: IUserAndAuth) {
    try {
      const response = await authFirebase.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response.user) {
        throw new Error("User not found");
      }

      const newUser = {
        id: response.user.uid,
        name,
        lastname,
        blogposts: [],
      };

      await db.collection("users").add(newUser);

      user.value = newUser;
      isAuthenticated.value = true;
    } catch (error) {
      console.log("[Create User]", error);
    }
  }

  return { auth, user, logOut, createUser, isAuthenticated };
});
