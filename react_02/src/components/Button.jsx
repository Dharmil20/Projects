const Button = ({ text, icon: Icon, isOutline, isButtton,isSubmit, ...rest }) => {
    return (
        <button {...rest}
            className={`flex py-2.5 px-4 justify-center items-center rounded-md gap-2 font-semibold text-base h-11 ${isOutline ? 'bg-white text-black border border-black w-100' : 'bg-black text-white w-56'} ${isSubmit ? 'ml-64': 'ml-0'}`}
        >
            {isButtton && <icon className="text-xl" />}
            {text}
            
        </button>
    )
}

export default Button