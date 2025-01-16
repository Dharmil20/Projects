const Button = (props) => {
    return (
        <button
            className={`flex py-2.5 px-4 justify-center items-center rounded-md gap-2 font-semibold text-base h-11 ${props.isOutline ? 'bg-white text-black border border-black w-100' : 'bg-black text-white w-56'}`}
        >
            <props.icon className="text-xl" />{props.text}
        </button>
    )
}

export default Button