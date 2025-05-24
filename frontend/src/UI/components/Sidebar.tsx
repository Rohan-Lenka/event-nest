import type { ReactElement } from "react"

type SidebarProps = {
    children: ReactElement
}
type SidebarHeadingProps = {
    
}

const defaultStyles = "bg-blue-500 h-full fixed w-72 rounded-r-lg"

const Sidebar = ({ children }: SidebarProps) => {
    return <div className={`${defaultStyles}`}>
        <SidebarHeading />
        <div className="flex flex-col gap-1 mt-10">
            {children}
        </div>
    </div>
}

const SidebarHeading = ({}: SidebarHeadingProps) => {
    return <div className="text-2xl text-white font-extrabold text-center p-2">
        Event Nest
    </div>
}

export default Sidebar 