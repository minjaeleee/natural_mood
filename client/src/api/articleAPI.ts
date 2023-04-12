import { IAddPostRes, IDeletePostRes, IGetAllPostsRes, IGetPostRes, IPostItem, IUpdatePostRes } from "../types/article"
import { BASE_URL } from "./const"

export const getAllPosts = async(): Promise<IGetAllPostsRes> => {
  const res = await fetch(`${BASE_URL}/posts`)

  if(!res.ok) return {
    status: "fail"
  }

  const getPosts = await res.json()
  return {
    status: "success",
    result: getPosts
  }
}

export const getPost = async(id:number): Promise<IGetPostRes> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`)

  if(!res.ok) return {
    status: "fail"
  }

  const getPosts = await res.json()
  return {
    status: "success",
    result: getPosts
  }
}

export const createPost = async(args: IPostItem): Promise<IAddPostRes> => {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  })

  if(!res.ok) return {
    status: "fail"
  }

  const createPost = await res.json()
  return {
    status: "success",
    result: createPost
  }
}

export const updatePost = async(args: IPostItem, id:number): Promise<IUpdatePostRes> => {
  const res= await fetch(`${BASE_URL}/posts/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(args)
  })

  if(!res.ok) return {
    status: "fail"
  }

  const updatePost = await res.json()
  return {
    status: "success",
    result: updatePost
  }
}

export const deletePost = async(id:number): Promise<IDeletePostRes> => {
  const res = await fetch(`${BASE_URL}/posts/${id}`, {
    method: "DELETE"
  })

  if(!res.ok) return {
    status: "fail"
  }

  const deletePost = await res.json()
  return {
    status: "success",
    result: deletePost
  }
}