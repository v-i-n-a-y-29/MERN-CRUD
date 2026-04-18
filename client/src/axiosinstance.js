import axios from "axios";

export const bookbaseurl=axios.create({
    baseURL:"http://localhost:8000/book",
    withCredentials: true,
})

export const userbaseurl = axios.create({
    baseURL:"http://localhost:8000/auth/user",
    withCredentials: true,
})