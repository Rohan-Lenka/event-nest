import Button from "../../../Button"
import Input from "../../../Input"

type AddModeratorCardProps = {}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

const AddModeratorCard = ({ }: AddModeratorCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className={`${inputSectionStyles}`}>
            <Input type="text" placeholder="Enter moderator firstname" />
            <Input type="text" placeholder="Enter moderator lastname" />
            <Input type="text" placeholder="Enter moderator email" />
        </div>
        <Button variant="primary" text="Add" />
    </div>
}

export default AddModeratorCard