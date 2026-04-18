import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userbaseurl } from '../axiosinstance'

const ProtectedRoute = ({children}) => {
  const navigate = useNavigate()

  useEffect(()=>{
    let isMounted = true

    const checkAuth = async () => {
      try {
        await userbaseurl.get('/me')
        if (!isMounted) return
      } catch {
        if (!isMounted) return

        const stored = localStorage.getItem('authData')
        let authUser = null
        try {
          authUser = stored ? JSON.parse(stored) : null
        } catch {
          authUser = null
        }

        if (!authUser?.isLogin) {
          navigate('/login')
        }
      }
    }

    checkAuth()

    return () => {
      isMounted = false
    }
  },[navigate])

  return children;
}

export default ProtectedRoute;
