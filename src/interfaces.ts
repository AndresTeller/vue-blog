export interface ITag {
  id: string;
  name: string;
  color: "blue" | "green" | "purple" | "red";
}

export interface IUser {
  id: string;
  name: string;
  lastname: string;
  blogposts: Array<IBlogPost>
}

export interface IBlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  imgUrl: string;
  date: string;
  tags: Array<ITag>;
}
