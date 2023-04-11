export interface IPostItem {
  id?: number,
  image: string,
  title: string,
  author: string,
  content: string,
  created_at: number
}

export interface IGetAllPostsRes {
  status: "success" | "fail"
  result?: IPostItem[]
}

export interface IGetPostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IAddPostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IUpdatePostRes {
  status: "success" | "fail"
  result?: IPostItem
}

export interface IDeletePostRes {
  status: "success" | "fail"
  result?: IPostItem
}