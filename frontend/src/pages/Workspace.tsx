import Button from "../UI/Button"
import EventDisplayCard from "../UI/components/Cards/EventCards/EventDisplayCard"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"

const Workspace = ({ person }: { person: "admin" }) => {
    return <div className="w-full h-full">
        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button variant="primary" text="Add Event" />
                        <Button variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex gap-2 pl-5 flex-wrap ">
                    {/* admin events */}
                </div>
            </>
        </MainContent>
    </div>
}
export default Workspace