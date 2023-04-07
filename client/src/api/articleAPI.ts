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

export const updatePost = async(args: IPostItem, id:number) => {
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

export const deletePost = async(id:number) => {
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