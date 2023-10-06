export interface ITag {
  id: string;
  name: string;
  color: "blue" | "green" | "purple" | "red";
}

export interface IBlogPost {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  href: string;
  date: string;
  tags: ITag[];
}
