import type { ReactElement } from "react"

type ShinyCoverProps = {
    childBorderRadius: string;
    coverType: "primary" | "secondary";
    children: ReactElement;
}

const cover = {
    "primary": "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
    "secondary": "bg-gradient-to-br from-cyan-300 to-indigo-600",
}

const ShinyCover = ({ childBorderRadius, children, coverType }: ShinyCoverProps) => {
    return <div className={`w-[320px] ${childBorderRadius} ${cover[coverType]} p-[2px]`}>
        {children}
    </div>
}
export default ShinyCover