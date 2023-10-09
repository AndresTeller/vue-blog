import { ref } from "vue";
import { defineStore } from "pinia";
import { IBlogPost, IUser, IUserAndAuth } from "@/interfaces";
import { db, auth as authFirebase } from "@/firebase/firebase.config";

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref<boolean>(false);

  const user = ref<IUser>({
    id: "",
    name: "",
    lastname: "",
    blogPosts: [],
  });

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
      blogPosts: [],
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
        blogPosts: [],
      };

      const customDocRef = db.collection("users").doc(response.user.uid);
      await customDocRef.set(newUser);

      user.value = newUser;
      isAuthenticated.value = true;
    } catch (error) {
      console.log("[Create User]", error);
    }
  }

  async function createBlogPost({
    id,
    date,
    title,
    tags,
    description,
    content,
    imgUrl,
  }: IBlogPost) {
    try {
      const blogPost = {
        id,
        content,
        date,
        description,
        imgUrl,
        tags,
        title,
      };

      const { docs } = await db.collection("users").get();

      for (const doc of docs) {
        const targetUser = doc.data();

        if (targetUser.id === user.value.id) {
          user.value.blogPosts.push(blogPost);
          await db.collection("users").doc(doc.id).update({
            blogPosts: user.value.blogPosts,
          });
        }
        return;
      }
    } catch (error) {
      console.log("[Create Blog Post]", error);
    }
  }

  function getBlogPost(id: string) {
    try {
      console.log(id);
      console.log(user.value.blogPosts);
      const blogPost = user.value.blogPosts.find(
        (blogPost) => blogPost.id === id
      );

      return blogPost;
    } catch (error) {
      console.log("[Get Blog Post]", error);
    }
  }

  async function deleteBlogPost(id: string) {
    try {
      const userRef = db.collection("users").doc(user.value.id);

      const updatedBlogPosts = user.value.blogPosts.filter(
        (blogpost) => blogpost.id !== id
      );

      user.value.blogPosts = updatedBlogPosts;

      userRef.update({
        blogPosts: updatedBlogPosts,
      });
    } catch (error) {
      console.log("[Delete Blog Post]", error);
    }
  }

  return {
    auth,
    user,
    logOut,
    createUser,
    createBlogPost,
    getBlogPost,
    deleteBlogPost,
    isAuthenticated,
  };
});
