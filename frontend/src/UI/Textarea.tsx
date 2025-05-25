type TextareaProps = {
    placeholder?: string,
    value?: string
    overiddenStyles?: string
    reference?: React.Ref<HTMLTextAreaElement>
}

const defaultStyles = "text-white outline-none rounded-md px-[10px] py-[6px] bg-blue-500 tracking-wide"

const Textarea = ({ reference, placeholder, value, overiddenStyles }: TextareaProps) => {
    return <textarea ref={reference} rows={10} cols={25} placeholder={placeholder} value={value} className={`${defaultStyles} resize-none ${overiddenStyles}`}></textarea>
}

export default Textarea