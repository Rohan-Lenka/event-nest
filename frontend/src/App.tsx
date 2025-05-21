import DeleteIcon from "./icons/DeleteIcon"
import EditIcon from "./icons/EditIcon"
import PlusIcon from "./icons/PlusIcon"
import Button from "./UI/components/Button"
import LoginCard from "./UI/components/Cards/LoginCard"
import Card from "./UI/components/Cards/LoginCard"
import TextInput from "./UI/components/TextInput"

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
    <LoginCard person="moderator"/>
    </div>
  </div>
}
export default App