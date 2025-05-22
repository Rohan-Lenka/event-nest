type InputProps = {
    type: "text" | "password" | "url" | "date" | "bigtext"
    placeholder?: string,
    value?: string
    overiddenStyles?: string
    // onChange: 
}

const defaultStyles = "text-white outline-none rounded-md px-[10px] py-[6px] bg-blue-500 tracking-wide"

const Input = ({ type, placeholder, value, overiddenStyles }: InputProps) => {
    return <>
            {type === "bigtext" ? <textarea rows={10} cols={25} placeholder={placeholder} value={value} className={`${defaultStyles} resize-none`}></textarea> :
            <input type={type} placeholder={placeholder} value={value} className={`${defaultStyles} ${overiddenStyles}`} />}
        </>
}
export default Input