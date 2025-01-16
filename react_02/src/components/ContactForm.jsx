import Button from "./Button";
import { MdMessage } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";

const ContactForm = () => {
    return (
        <section className="flex font-poppins max-w-1.5xl mx-auto mt-9 gap-9">
            <div className="flex items-center">
                <div className=" flex flex-col gap-y-4">
                    <div className="flex gap-x-8">
                        <Button text="VIA SUPPORT CHAT" icon={MdMessage} />
                        <Button text="VIA CALL" icon={MdCall} />
                    </div>
                    <Button isOutline={true} text="VIA EMAIL FORM" icon={MdEmail} />
                </div>
            </div>
            <div>
                <img src="src/assets/hero.svg" alt="" />
            </div>
        </section>
    );
}

export default ContactForm;