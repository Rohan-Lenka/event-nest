import Button from "../../../Button"
import Info from "../../../Info"
import ShinyCover from "../../../ShinyCover"

type ModeratorCardProps = {
    fname: string
    lname: string
    email: string
}

const defaultStyles = "bg-blue-900 flex flex-col gap-10 text-lg tracking-wide rounded-md p-4"

const ModeratorCard = ({ fname, lname, email }: ModeratorCardProps) => {
    return <ShinyCover childBorderRadius="rounded-md" coverType="secondary" >
        <div className={`${defaultStyles}`}>
        <div>
            <Info title="Firstname" content={fname} contentType="text" />
            <Info title="Lastname" content={lname} contentType="text" />
            <Info title="Email" content={email} contentType="text" />
        </div>
            <Button variant="delete" text="Remove" />
    </div>
    </ShinyCover>
}

export default ModeratorCard