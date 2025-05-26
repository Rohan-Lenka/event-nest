import type { ReactElement } from "react"
import "../../styles/overlay.css"
import CloseIcon from "../../icons/CloseIcon"

type ModalProps = {
    children: ReactElement
    open: boolean | string 
    onClose: () => void
}

const overlayStyles = "w-full h-full fixed z-3 top-0 left-0 overlay-color flex justify-center items-center text-white"
const modalStyles = "relative"
const closeIconStyles = "absolute top-[-12px] right-[-12px] text-neonblue-100 opacity-50 hover:opacity-100"

const Modal = ({ children, open, onClose }: ModalProps) => {
    return <>
        {open && <div className={`${overlayStyles} `}>
            <div className={`${modalStyles}`}>
                <div onClick={onClose} className={`${closeIconStyles}`}>
                    <CloseIcon />
                </div>
                {children}
            </div>
        </div>}
    </>
}

export default Modal