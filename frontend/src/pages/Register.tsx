import { useRef } from "react"
import Input from "../UI/Input"
import Label from "../UI/Label"
import Button from "../UI/Button"

type RegisterProps = {
    person: "user" | "admin"
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

const Register = ({ person }: RegisterProps) => {
    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)
    const collegeRef = useRef<HTMLInputElement>(null)
    const societyRef = useRef<HTMLInputElement>(null)
    const proofRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    function onRegister() {
        console.log(societyRef.current?.value + " " + collegeRef.current?.value) // 
        // cnnct to BE and cmplte rest logic
    }

    return <div className="w-full h-full flex justify-center items-center">
        <div className={`${defaultStyles}`}>
            <div className={`${inputSectionStyles}`}>
                <Input reference={fnameRef} type="text" placeholder="Enter your firstname" />
                <Input reference={lnameRef} type="text" placeholder="Enter your lastname" />
                <Input reference={collegeRef} type="text" placeholder="Enter your college" />
                {person === "admin" &&
                    <div className={`${inputSectionStyles}`}>
                        <Input reference={societyRef} type="text" placeholder="Enter your society" />
                        <div className="flex flex-col gap-0.5 mt-[-5px]">
                            <Label text="Please provide Google Drive link containing proof of your society admin role below" />
                            <Input reference={proofRef} type="url" placeholder="Paste google drive URL here" />
                        </div>
                    </div>}
                <Input reference={emailRef} type="text" placeholder="Enter your email" />
                <Input reference={passwordRef} type="password" placeholder="Enter your password" />
            </div>
            <Button onClick={onRegister} variant="secondary" text={person === "user" ? "Register" : "Apply"} />
        </div>
    </div>
}
export default Register