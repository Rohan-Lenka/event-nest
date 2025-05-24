import type { ReactElement } from "react"

type MainContentProps = {
    children: ReactElement
}

const MainContent = ({ children }: MainContentProps) => {
    return <div className="h-full ml-72 pl-2">
        {children}
    </div>
}

export default MainContent