export interface ITag {
  id: string;
  name: string;
  color: "blue" | "green" | "purple" | "red";
}

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  blogPosts: Array<IBlogPost>;
}

export interface IBlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  imgUrl: string;
  date: Date;
  tags: Array<ITag>;
}

export interface IAuth {
  email: string;
  password: string;
}

export interface IUserAndAuth extends IUser, IAuth {}
