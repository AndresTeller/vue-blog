import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { IBlogPost, IUser, IUserAndAuth } from "@/interfaces";
import { db, auth as authFirebase } from "@/firebase/firebase.config";
import { blogPosts as seedPosts } from "@/constants";

export const useUserStore = defineStore("user", () => {
  const isAuthenticated = ref<boolean>(false);

  const recentBlogPosts = computed(() => user.value.blogPosts.slice(0, 4));

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

      const userRef = db.collection("users").doc(response.user.uid);
      const userData = (await userRef.get()).data();

      user.value = { ...userData } as IUser;
      isAuthenticated.value = true;
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

  async function createBlogPost(blogPost: IBlogPost) {
    try {
      const userRef = db.collection("users").doc(user.value.id);

      user.value.blogPosts.push(blogPost);

      await userRef.update({ blogPosts: user.value.blogPosts });
    } catch (error) {
      console.log("[Create Blog Post]", error);
    }
  }

  function getBlogPost(id: string) {
    try {
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

      userRef.update({ blogPosts: updatedBlogPosts });
    } catch (error) {
      console.log("[Delete Blog Post]", error);
    }
  }

  async function seedBlogPosts() {
    try {
      if (user.value.blogPosts.length > 0) return;
      const userRef = db.collection("users").doc(user.value.id);
      const newBlogPosts = user.value.blogPosts.concat(seedPosts);
      user.value.blogPosts = newBlogPosts;
      userRef.update({
        blogPosts: newBlogPosts,
      });
    } catch (error) {
      console.log("[Seed Blog Posts]", error);
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
    seedBlogPosts,
    recentBlogPosts,
    isAuthenticated,
  };
});
