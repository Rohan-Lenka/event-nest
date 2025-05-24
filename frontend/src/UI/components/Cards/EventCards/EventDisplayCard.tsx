import "../../../../styles/scrollbar.css"
import Button from "../../../Button"
import EditIcon from "../../../../icons/EditIcon"
import DeleteIcon from "../../../../icons/DeleteIcon"
import ShinyCover from "../../../ShinyCover"

type EventDisplayCardProps = {
    name: string,
    description: string,
    status: "Ongoing" | "Upcoming",
    date: string,
    society: string,
    event_URL: string,
    action: boolean 
}

const defaultStyles = "text-white tracking-wide flex flex-col gap-5 p-[18px] bg-blue-900 rounded-md max-h-100 max-w-72"
const eventTime = {
    "Ongoing": "ends in ",
    "Upcoming": "starts from ",
}

const EventDisplayCard = ({ name, description, status, date, society, event_URL, action }: EventDisplayCardProps) => {
    return <ShinyCover maxWidth="max-w-72" childBorderRadius="rounded-md" coverType="primary">
        <div className={`${defaultStyles} shiny-border`}>
        <Name name={name} />
        <Description text={description} />
        <div>
            <Date status={status} date={date} />
            <Society society={society} />
        </div>
        <Event_URL link={event_URL} />
        {action && <ActionSection />}
    </div>
    </ShinyCover>
}

const Name = ({ name }: { name: string }) => {
    return <div className="text-center text-2xl font-semibold">
        {name}
    </div>
}

const applyScroll = "max-h-[200px] overflow-y-auto"
const Description = ({ text }: { text: string }) => {
    return <div className={`text-xs ${applyScroll}`} >
        {text}
    </div>
}

const Date = ({ status, date }: { status: "Ongoing" | "Upcoming", date: string }) => {
    return <div className="">
        <span className={`text-sm uppercase font-bold ${status === "Ongoing" ? "text-green-300" : "text-yellow-300"} `}>
            {status}
        </span>
        <span className="text-xs">
            : {eventTime[status]} {date}
        </span>
    </div>
}

const Society = ({ society }: { society: string }) => {
    return <div className="">
        <span className="text-sm uppercase font-bold ">
            SOCIETY
        </span>
        <span className="text-xs">
            : {society}
        </span>
    </div>
}

const Event_URL = ({ link }: { link: string }) => {
    return <div className="text-center text-xs">
        Interested? <a className="hover:underline" href={link} target="_blank">Click here</a>
    </div>
}

const ActionSection = () => {
    return <div className="flex justify-between">
        <Button variant="edit" text="Edit" startIcon={<EditIcon />}/>
        <Button variant="delete" text="Delete" startIcon={<DeleteIcon />}/>
    </div>
}

export default EventDisplayCard