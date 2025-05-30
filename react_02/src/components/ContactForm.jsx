import { useState } from "react";
import Button from "./Button";
import { MdMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [text, setText] = useState("");

    const onSubmit = (event) =>{
        event.preventDefault();
        setName(event.target[0].value);
        setEmail(event.target[1].value);
        setText(event.target[2].value);
    }
    return (
        <section className="flex font-poppins max-w-1.5xl mx-auto mt-9 gap-9">
            <div className="flex items-center">
                <div className=" flex flex-col gap-y-4">
                    <div className="flex gap-x-8">
                        <Button text="VIA SUPPORT CHAT" icon={MdMessage} />
                        <Button text="VIA CALL" icon={MdCall} />
                    </div>
                    <Button isOutline={true} text="VIA EMAIL FORM" icon={MdEmail} />
                    <form className="flex flex-col gap-y-5" onSubmit={onSubmit}>
                        <div className="relative">
                            <label htmlFor="name" className="absolute bg-white left-7 top-10 px-3">Name</label>
                            <input className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" type="text" name="name" />
                        </div>
                        <div className="relative">
                            <label htmlFor="email" className="absolute bg-white left-7 top-10 px-3">Email</label>
                            <input className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" type="email" name="name" />
                        </div>
                        <div className="relative">
                            <label htmlFor="text" className="absolute bg-white left-7 top-10 px-3">Text</label>
                            <textarea rows={8} className="bg-white border border-black text-gray-900 text-sm rounded-lg block w-full p-2.5" name="name" />
                        </div>
                        <Button isSubmit={true} text="SUBMIT"/>
                    </form>
                    <div>
                        {name + " " + email + " " + text}
                    </div>
                </div>
            </div>
            <div>
                <img src="src/assets/hero.svg" alt="" />
            </div>
        </section>
    );
}

export default ContactForm;