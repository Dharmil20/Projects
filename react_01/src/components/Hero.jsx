const Hero = () => {
    return (
        <div className="flex max-w-6xl h-h-screen mx-auto pt-24 items-center">
            <div className="flex flex-col gap-y-9 max-w-1.5xl">
                <div className="text-heroSize">YOUR FEET DESERVE THE BEST</div>
                <div className="text-base font-semibold max-w-mid text-para-gray">YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR SHOES.</div>
                <div className="flex gap-x-10">
                    <button className="bg-btn-red text-white px-4 py-1.5">Shop Now</button>
                    <button className="inner-border inner-border-black text-para-gray px-4 py-1.5">Category</button>
                </div>
                <div>
                    <p className="text-sm mb-2 text-para-gray">Also Available on</p>
                    <div className="flex gap-x-4">
                        <img src="/assets/flipkart.png" alt="" />
                        <img src="/assets/amazon.png" alt="" />
                    </div>
                </div>
            </div>
            <div className="flex">
                <img src="/assets/shoe_image.png" alt="" />
            </div>
        </div>
    );
}

export default Hero;