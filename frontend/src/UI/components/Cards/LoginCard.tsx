import Button from "../Button"
import TextInput from "../TextInput"

type LoginCardProps = {
    person: "user" | "admin" | "moderator",
    // link: HTMLLinkElement
}

const defaultStyles = "flex flex-col gap-10 p-[12px] border-red-200 bg-blue-800 w-[360px] h-[194px]"

const LoginCard = ({ person }: LoginCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className="flex flex-col gap-4">
            <TextInput placeholder="Enter your email" />
            <TextInput placeholder={`Enter your ${person === "moderator" ? "secret key" : "password"}`} />
        </div>
        <Button variant="secondary" text="Login" />
    </div>
}
export default LoginCard