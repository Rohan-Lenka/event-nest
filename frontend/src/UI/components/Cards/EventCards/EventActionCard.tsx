import Button from "../../../Button"
import Input from "../../../Input"
import "../../../../styles/radio.css"

type EventActionCardProps = {
    name?: string,
    description?: string,
    status?: "Ongoing" | "Upcoming",
    date?: string,
    event_URL?: string,
}

const defaultStyles = "flex flex-col gap-10 p-[12px] bg-blue-800 w-[400px]"
const inputSectionStyles = "flex flex-col gap-4"

// checked={status === "Upcoming"} 
const EventActionCard = ({ name, description, status, date, event_URL }: EventActionCardProps) => {
    return <div className={`${defaultStyles}`}>
        <div className={`${inputSectionStyles}`} >
            <Input type="text" placeholder="Event name" value={name} />
            <Input type="bigtext" placeholder="Event description" value={description} />
            <div className="text-gray-400 flex gap-6">
                <div className="">
                    <Input type="date" value={date} />
                </div>
                <div className="flex gap-5">
                    <div>
                        <input type="radio" name="status" value="Ongoing"  />
                        <label htmlFor=""> Ongoing</label>
                    </div>
                    <div>  
                        <input type="radio" name="status" value="Upcoming"  />
                        <label htmlFor=""> Upcoming </label>
                    </div>
                </div>
            </div>
            <Input type="url" placeholder="Paste event webiste URL here" value={event_URL} />
        </div>
        <Button variant="primary" text="Done" />
    </div>
}

export default EventActionCard