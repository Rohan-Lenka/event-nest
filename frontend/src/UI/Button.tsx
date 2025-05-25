import type { ReactElement } from "react"

type ButtonProps = {
    variant: "primary" | "secondary" | "edit" | "delete",
    text: string,
    startIcon?: ReactElement,
    onClick?: () => void
}

const variantClasses = {
    "primary": "bg-neonblue-100",
    "secondary": "bg-neongreen",
    "edit": "bg-neonyellow",
    "delete": "bg-neonred",
}
const defaultStyles = "text-blue-900 text-base font-medium cursor-pointer flex justify-center items-center gap-2 px-[10px] py-[6px] rounded-md"
const hoverEffects = "hover:opacity-75"

const Button = ({ variant, text, startIcon, onClick }: ButtonProps) => {
    return <button onClick={onClick} className={`${variantClasses[variant]} ${defaultStyles} ${hoverEffects}`}>
        {startIcon}
        {text}
    </button>
}

export default Button