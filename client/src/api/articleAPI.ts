import { IPostItem } from "../types/article"
import { BASE_URL } from "./const"

export const getAllPosts = async() => {
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

export const getPost = async(id:number) => {
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

export const createPost = async(args: IPostItem) => {
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