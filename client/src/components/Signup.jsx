import { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userbaseurl } from '../axiosinstance'
import toast, { Toaster } from 'react-hot-toast';



function Signup() {

	const [signupForm, setSignupForm] = useState({
		FirstName: "",
		LastName: "",
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
		console.log("signupform",signupForm)
		setSignupForm((prev) => {
			return {
				...prev , 
				[name]:value
			}
		})
	}

	const handleSignUp = async (e) =>{
		e.preventDefault();
		try {
			const response =  await userbaseurl.post('/create', signupForm)
			console.log("singupresponse",response.data)
			if(response.data.success){
				toast.success("user created successfully")
				navigate('/login')
			}
		} catch (error) {
			const message = error?.response?.data?.message || error?.message || 'signup failed'
			console.log("signup-error" , message)
			toast.error(message)
		}
		
	}

	return (
		<div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100 sm:px-6 lg:px-8">
			<Toaster/>
			<div className="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-2xl shadow-black/40 backdrop-blur-xl lg:grid-cols-2">
				<section className="order-2 flex flex-col justify-center gap-5 border-t border-white/10 bg-gradient-to-br from-blue-500/10 via-sky-500/10 to-emerald-500/10 p-8 sm:p-10 lg:order-1 lg:border-r lg:border-t-0">
					<p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-200">
						Create account
					</p>
					<h1 className="max-w-[12ch] text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
						Set up your workspace in a few seconds.
					</h1>
					<p className="max-w-xl text-base leading-7 text-slate-200/75">
						This signup page is kept intentionally simple so you can plug in
						your own submit handler later.
					</p>
				</section>

				<section className="order-1 flex flex-col justify-center p-8 sm:p-10 lg:order-2">
					<div className="mb-8 space-y-2">
						<h2 className="text-3xl font-semibold text-white">Signup</h2>
						<p className="text-slate-300">Create a new account to continue.</p>
					</div>

					<form className="space-y-5" onSubmit={handleSignUp}>
						<label className="block space-y-2 text-sm text-slate-200">
							<span>FirstName</span>
							<input
								type="text"
								name="FirstName"
								value={signupForm.FirstName}
								onChange={handlechange}
								placeholder="Your name"
								className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/15"
							/>
						</label>
						<label className="block space-y-2 text-sm text-slate-200">
							<span>LastName</span>
							<input
								type="text"
								name="LastName"
								value={signupForm.LastName}
								onChange={handlechange}
								placeholder="Your name"
								className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/15"
							/>
						</label>

						<label className="block space-y-2 text-sm text-slate-200">
							<span>Email</span>
							<input
								type="email"
								name="Email"
								value={signupForm.Email}
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
								value={signupForm.Password}
								onChange={handlechange}
								placeholder="Create a password"
								className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-400 focus:border-orange-400 focus:bg-white/10 focus:ring-4 focus:ring-orange-400/15"
							/>
						</label>


						<button
							type="submit"
							className="w-full rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 px-4 py-3 font-semibold text-slate-950 shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/25"
						>
							Create account
						</button>
					</form>

					<p className="mt-6 text-sm text-slate-300">
						Already have an account?{' '}
						<Link className="font-semibold text-orange-200 transition hover:text-orange-100" to="/login">
							Login
						</Link>
					</p>
				</section>
			</div>
		</div>
	)
}

export default Signup
