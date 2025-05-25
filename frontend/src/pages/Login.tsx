import { useRef } from "react"
import Input from "../UI/Input"
import Button from "../UI/Button"

type LoginProps = {
    person: "user" | "admin" | "moderator"
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"

const Login = ({ person }: LoginProps) => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    function onLogin() {
        console.log(emailRef.current?.value + " " + passwordRef.current?.value)
        // connect to backend and finish rest of the logic
    }

    return <div className="w-full h-full flex justify-center items-center">
        <div className={`${defaultStyles}`}>
            <div className="flex flex-col gap-4">
                <Input reference={emailRef} type="text" placeholder="Enter your email" />
                <Input reference={passwordRef} type="password" placeholder={`Enter your ${person === "moderator" ? "secret key" : "password"}`} />
            </div>
            <Button onClick={onLogin} variant="primary" text="Login" />
        </div>
    </div>
}
export default Login