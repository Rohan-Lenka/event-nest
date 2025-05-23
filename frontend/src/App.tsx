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

const App = () => {
  return <div className="w-screen h-screen">
    <div className="w-full h-full flex justify-center items-center ">
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

          <ModeratorCard fname="Rohan" lname="Lenka" email="aguydgwyde7dgew7dedeg8degbc@gmail.com" />

    </div>
  </div>
}
export default App