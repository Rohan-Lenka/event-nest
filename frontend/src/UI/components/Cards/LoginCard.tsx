import Button from "../Button"
import Input from "../Input"

type LoginCardProps = {
    person: "user" | "admin" | "moderator",
    // link: string 
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[4000px]"

const LoginCard = ({ person }: LoginCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className="flex flex-col gap-4">
            <Input type="text" placeholder="Enter your email" />
            <Input type="password" placeholder={`Enter your ${person === "moderator" ? "secret key" : "password"}`} />
        </div>
        <Button variant="secondary" text="Login" />
    </div>
}
export default LoginCard