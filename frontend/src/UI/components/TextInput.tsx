type TextInputProps = {
    placeholder: string
    // onChange: 
}

const defaultStyles = "text-white outline-none rounded-md px-[10px] py-[6px] bg-blue-500 tracking-wide"

const TextInput = ({ placeholder }: TextInputProps) => {
    return <input type="text" placeholder={placeholder} className={`${defaultStyles} `}/>
}
export default TextInput