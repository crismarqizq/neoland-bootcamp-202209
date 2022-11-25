import { useContext } from 'react'
import authenticateUser from "../logic/authenticateUser"
import UserContext from '../UserContext';
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const { setUser } = useContext(UserContext);
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault()

        const form = event.target

        const emailInput = form.email
        const passwordInput = form.password

        const email = emailInput.value
        const password = passwordInput.value

        try {
            const authenticatedUser = await authenticateUser(email, password)

            setUser(authenticatedUser)

            console.log('INFO', `User ${authenticatedUser.email} successfully logged in`)

            // Navigate to home
            navigate('/')

        } catch (error) {
            alert(error.message)
            passwordInput.value = ''
        }
    }

    return (
        <main className="h-screen w-screen flex flex-col items-center justify-center bg-teal-600">
            <div className="bg-white flex flex-col border rounded-lg p-3">
                <form className="flex flex-col items-center justify-center gap-2 m-2 form" onSubmit={handleSubmit}>
                    <label htmlFor="email" className="label">Your email</label>
                    <input type="email" name="email" placeholder="enter your email" className="border rounded-md" />
                    <label htmlFor="password" className="label">Your password</label>
                    <input type="password" name="password" placeholder="enter your password" className="border rounded-md" />
                    <button className="bg-teal-500 hover:bg-teal-600 text-white p-2 rounded-lg text-sm">Login</button>
                </form>
                <Link to="/register" className="underline">Register</Link>
            </div>
        </main>
    )
}

export default Login