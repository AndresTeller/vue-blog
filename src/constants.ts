import { IBlogPost } from "@/interfaces";

export const navLinks = [
  {
    id: 1,
    label: "Blog",
    href: "/blog",
  },
  {
    id: 2,
    label: "Projects",
    href: "/projects",
  },
  {
    id: 3,
    label: "About",
    href: "/about",
  },
  {
    id: 4,
    label: "Login",
    href: "/login",
  },
];

export const blogPosts: IBlogPost[] = [
  {
    id: 1,
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    date: "Sunday, 1 Jan 2023",
    href: "/test-1",
    imgUrl:
      "https://images.unsplash.com/photo-1682687220566-5599dbbebf11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1075&q=80",
    tags: [
      {
        id: 1,
        name: "Design",
        color: "purple",
      },
      {
        id: 2,
        name: "Research",
        color: "blue",
      },
      {
        id: 3,
        name: "Presentation",
        color: "red",
      },
      {
        id: 4,
        name: "Interface",
        color: "green",
      },
    ],
  },
  {
    id: 2,
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...",
    date: "Sunday, 1 Jan 2023",
    href: "/test-1",
    imgUrl:
      "https://images.unsplash.com/photo-1696253930712-f17f6b3d7095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    tags: [
      {
        id: 1,
        name: "Design",
        color: "blue",
      },
      {
        id: 2,
        name: "Research",
        color: "red",
      },
    ],
  },
  {
    id: 3,
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and manage...",
    date: "Sunday, 1 Jan 2023",
    href: "/test-1",
    imgUrl:
      "https://images.unsplash.com/photo-1696384314432-1fe5cd33baab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1036&q=80",
    tags: [
      {
        id: 1,
        name: "Design",
        color: "green",
      },
      {
        id: 2,
        name: "Research",
        color: "red",
      },
    ],
  },
  {
    id: 4,
    title: "Grid system for better Design User Interface",
    description:
      "A grid system is a design tool used to arrange content on a webpage. ",
    date: "Sunday, 1 Jan 2023",
    href: "/test-1",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1666277012783-0a646dc47ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    tags: [
      {
        id: 1,
        name: "Design",
        color: "purple",
      },
      {
        id: 2,
        name: "Interface",
        color: "red",
      },
    ],
  },
];
