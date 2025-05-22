import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import PlusIcon from "./icons/PlusIcon"
import Button from "./UI/components/Button"
import EventActionCard from "./UI/components/Cards/EventActionCard"
import EventCard from "./UI/components/Cards/EventCard"
import LoginCard from "./UI/components/Cards/LoginCard"
import Card from "./UI/components/Cards/LoginCard"
import RegisterCard from "./UI/components/Cards/RegisterCard"
import TextInput from "./UI/components/Input"

const App = () => {
  return <div className="w-screen h-screen">
    {/* <Button text="Click me" variant="primary" startIcon={<PlusIcon />} />
    <br />
    <br />
    <TextInput placeholder="search"/>
    <br />
    <br />
    <br /> */}
    <div className="w-full h-full flex justify-center items-center ">
      {/* <RegisterCard person="admin"/> */}

      {/* <EventCard name="Dummy Contest"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent porttitor commodo eleifend. Ut fermentum efficitur quam, a tincidunt ex. In ipsum nunc, sagittis mollis iaculis eu, aliquet id mauris. Donec euismod enim vel turpis dictum tincidunt. Nunc nec nunc in nisi euismod accumsan id feugiat tortor. Sed nec lacinia nisl. Vestibulum vel lobortis dui, a molestie purus. In et neque pharetra arcu malesuada rutrum. "
        status="Upcoming"
        date="22-12-2025"
        society="dummy society"
        event_URL="https://www.youtube.com/"
        action={true}
      /> */}

        <EventActionCard 
        />
    </div>
  </div>
}
export default App