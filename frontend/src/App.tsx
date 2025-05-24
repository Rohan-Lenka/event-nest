import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import PlusIcon from "./icons/PlusIcon"
import Button from "./UI/Button"
import EventCard from "./UI/components/Cards/EventCards/EventDisplayCard"
import LoginCard from "./UI/components/Cards/AuthCards/LoginCard"
import Card from "./UI/components/Cards/AuthCards/LoginCard"
import RegisterCard from "./UI/components/Cards/AuthCards/RegisterCard"
import TextInput from "./UI/Input"
import EventDisplayCard from "./UI/components/Cards/EventCards/EventDisplayCard"
import Info from "./UI/Info"
import RequestsCard from "./UI/components/Cards/ModCards/RequestsCard"
import AddModeratorCard from "./UI/components/Cards/ModCards/AddModeratorCard"
import ModeratorCard from "./UI/components/Cards/ModCards/ModeratorsCard"
import Modal from "./UI/Modal"
import Input from "./UI/Input"
import EventActionCard from "./UI/components/Cards/EventCards/EventActionCard"
import { useState } from "react"
import MainContent from "./UI/components/MainContent"
import Sidebar from "./UI/components/Sidebar"
import SidebarItem from "./UI/components/SidebarItem"
import EventsIcon from "./icons/EventsIcon"
import AboutIcon from "./icons/AboutIcon"
import WorkshopIcon from "./icons/workshopIcon"

const App = () => {
  const [s, ss] = useState(true)

  return <div className="w-screen h-screen">
    <div className="w-full h-full ">
      {/* <RegisterCard person="admin"/> */}

      {/* <LoginCard person="moderator"/> */}

      {/* <EventDisplayCard name="Dummy Contest"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor commodo eleifend. Ut fermentum efficitur quam, a tincidunt ex. In ipsum nunc, sagittis mollis iaculis eu, aliquet id mauris. Donec euismod enim vel turpis dictum tincidunt. Nunc nec nunc in nisi euismod accumsan id feugiat tortor. Sed nec lacinia nisl. Vestibulum vel lobortis dui, a molestie purus. In et neque pharetra arcu malesuada rutrum. "
        status="Upcoming"
        date="22-12-2025"
        society="dummy society"
        event_URL="https://www.youtube.com/"
        action={true}
      /> */}

      {/* <EventActionCard 
        /> */}

      {/* <RequestsCard
        fname="Rohan"
        lname="Lenka"
        email="abc@gmail.com"
        college="abc" 
        society="abcdef"
        proof_link="https://www.youtube.com/fewifjsbfgjdvhfb" 
        /> */}

      {/* <AddModeratorCard /> */}

      {/* <ModeratorCard fname="Rohan" lname="Lenka" email="aguydgwyde7dgew7dedeg8degbc@gmail.com" /> */}
      {/* <Modal onClose={() => { ss(s => !s) }} open={s} >
        <AddModeratorCard />
      </Modal> */}
      <Sidebar>
        <>
          <SidebarItem onClick={() => {}} color="text-white" text="Events" icon={<EventsIcon />} />
          <SidebarItem onClick={() => {}} color="text-white" text="About" icon={<AboutIcon />} />
          <SidebarItem onClick={() => {}} color="text-white" text="Workshop" icon={<WorkshopIcon />} />
        </>
      </Sidebar>

        <MainContent>
<ModeratorCard fname="Rohan" lname="Lenka" email="aguydgwyde7dgew7dedeg8degbc@gmail.com" />
        </MainContent>
    </div>
  </div>
}
export default App