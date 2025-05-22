import type { ReactElement } from "react"

const ShinyCover = ({ childBorderRadius, children }: { childBorderRadius: string, children: ReactElement }) => {
    return <div className={`w-[320px] rounded-${childBorderRadius} bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px]`}>
        {children}
    </div>
}
export default ShinyCover