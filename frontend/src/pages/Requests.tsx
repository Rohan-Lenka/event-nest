import Button from "../UI/Button"
import Header from "../UI/components/Header"
import MainContent from "../UI/components/MainContent"
import Sidebar from "../UI/components/Sidebar"

const Requests = ({ person }: { person: "moderator" }) => {
    return <div className="w-full h-full">
        <Sidebar person={person} />
        <MainContent>
            <>
                <Header>
                    <div className="flex justify-center gap-2 items-center">
                        <Button variant="delete" text="Logout" />
                    </div>
                </Header>
                <div className="flex flex-col pl-5">
                    {/* admin Requests */}
                </div>
            </>
        </MainContent>
    </div>
}
export default Requests