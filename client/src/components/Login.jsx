import { useEffect, useState } from 'react'
import { Link  ,useNavigate} from 'react-router-dom'
import { userbaseurl } from '../axiosinstance'
import toast, { Toaster } from 'react-hot-toast'
function Login() {

	const [loginForm, setLoginForm] = useState({
		Email: "",
		Password: "",
	})

	const navigate = useNavigate()

	useEffect(() => {
		const stored = localStorage.getItem('authData')
		let authUser = null
		try {
			authUser = stored ? JSON.parse(stored) : null
		} catch {
			authUser = null
		}

		if (authUser?.isLogin) {
			navigate('/home')
		}
	}, [navigate])

    const handlechange = (e) =>{
        const {name,value} = e.target;
		// console.log("loginForm",loginForm)
		setLoginForm((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

	const handleLogin = async(e)=>{
		e.preventDefault();
		try {
			const response=await userbaseurl.post('/login',loginForm);
			console.log("loginresponse",response.data)
			const authData = {
				isLogin:true,
			}
			if(response.data.success){
				toast.success(response.data.message || "User logged in successfully")
				localStorage.setItem('authData', JSON.stringify(authData))
				navigate('/home')
			}
		} catch (error) {
			const message = error?.response?.data?.message || error?.message || 'Login failed'
			console.log("login-error" , message)
			toast.error(message)
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
			<Toaster position="top-right" />
			<div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-2">
				<section className="flex flex-col justify-center gap-5 border-b border-white/10 bg-linear-to-br from-orange-500/20 via-amber-500/10 to-blue-500/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">
						Welcome back
					</p>
					<h1 className="max-w-[12ch] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
						Sign in to continue managing your books.
					</h1>
					<p className="max-w-xl text-base leading-7 text-slate-200/75">
						A clean frontend-only login screen ready for your API, state
						handling, and validation.
					</p>
				</section>

				<section className="flex flex-col justify-center p-8 sm:p-10">
					<div className="mb-8 space-y-2">
						<h2 className="text-3xl font-semibold text-white">Login</h2>
						<p className="text-slate-300">Use your account credentials to get started.</p>
					</div>

					<form className="space-y-5" onSubmit={handleLogin}>
						<label className="block space-y-2 text-sm text-slate-200">
							<span>Email</span>
							<input
								type="email"
								name="Email"
                                value={loginForm.Email}
                                onChange={handlechange}
								placeholder="you@example.com"
								className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/15"
							/>
						</label>

						<label className="block space-y-2 text-sm text-slate-200">
							<span>Password</span>
							<input
								type="password"
								name="Password"
								value={loginForm.Password}
								onChange={handlechange}
								placeholder="Enter your password"
								className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/15"
							/>
						</label>

						<div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
							<label className="inline-flex items-center gap-3">
								<input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-white/5 text-orange-500 accent-orange-500" />
								<span>Remember me</span>
							</label>
							<button type="button" className="font-medium text-orange-200 transition hover:text-orange-100">
								Forgot password?
							</button>
						</div>

						<button
							type="submit"
							className="w-full rounded-2xl bg-linear-to-r from-amber-500 to-rose-500 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/25"
						>
							Login
						</button>
					</form>

					<p className="mt-6 text-sm text-slate-300">
						Don&apos;t have an account?{' '}
						<Link className="font-semibold text-orange-200 transition hover:text-orange-100" to="/signup">
							Create one
						</Link>
					</p>
				</section>
			</div>
		</div>
	)
}

export default Login
