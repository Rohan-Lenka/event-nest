import Button from "../../../Button"
import Input from "../../../Input"
import Label from "../../../Label"

type RegisterCardProps = {
    person: "user" | "admin"
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

const RegisterCard = ({ person }: RegisterCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className={`${inputSectionStyles}`}>
            <Input type="text" placeholder="Enter your firstname" />
            <Input type="text" placeholder="Enter your lastname" />
            <Input type="text" placeholder="Enter your colege" />
            {person === "admin" && <AdminExtras />}
            <Input type="text" placeholder="Enter your email" />
            <Input type="password" placeholder="Enter your password" />
        </div>
        <Button variant="secondary" text={person === "user" ? "Register" : "Apply"} />
    </div>
}

const AdminExtras = () => {
    return <div className={`${inputSectionStyles}`}>
        <Input type="text" placeholder="Enter your society" />
        <div className="flex flex-col gap-0.5 mt-[-5px]">
            <Label text="Please provide Google Drive link containing proof of your society admin role below"/>
            <Input type="url" placeholder="Paste google drive URL here" />
        </div>
    </div>
}

export default RegisterCard