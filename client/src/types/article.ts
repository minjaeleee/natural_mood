export interface IPostItem {
  id?: number,
  image: string,
  title: string,
  author: string,
  content: string,
  created_at: number,
  updated_at?: number | null,
  deleted_at?: number | null
}