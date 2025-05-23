import Button from "../../../Button"
import Info from "../../../Info"
import ShinyCover from "../../../ShinyCover"

type RequestCardProps = {
    fname: string
    lname: string
    email: string
    college: string
    society: string
    proof_link: string
}

const defaultStyles = "bg-blue-900 flex flex-col gap-10 text-lg tracking-wide rounded-md p-4"

const RequestsCard = ({ fname, lname, email, college, society, proof_link }: RequestCardProps) => {
    return <ShinyCover childBorderRadius="rounded-md" coverType="secondary" >
        <div className={`${defaultStyles}`}>
            <div>
                <Info title="Firstname" content={fname} contentType="text" />
                <Info title="Lastname" content={lname} contentType="text" />
                <Info title="Email" content={email} contentType="text" />
                <Info title="College" content={college} contentType="text" />
                <Info title="Society" content={society} contentType="text" />
                <Info title="Proof" content={proof_link} contentType="url" />
            </div>
            <div className="flex justify-between">
                <Button variant="secondary" text="Approve" />
                <Button variant="delete" text="Reject" />
            </div>
        </div>
    </ShinyCover>
}

export default RequestsCard