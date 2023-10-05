export interface ITag {
  id: number;
  name: string;
  color: "blue" | "green" | "purple" | "red";
}

export interface IBlogPost {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  href: string;
  date: string;
  tags: ITag[];
}
