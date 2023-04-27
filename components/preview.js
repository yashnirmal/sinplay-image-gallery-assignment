import Image from "next/image"


export default function Preview({openedImage,setOpenedImage}){

	function close(e){
		if(e.target=== e.currentTarget)
		setOpenedImage(null)
	}

	return (
		<div onClick={close} className="fixed top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
			<div className="max-w-[1400px] w-[90%] aspect-video flex flex-col">
				<h1 className="lg:text-6xl md:text-4xl sm:text-2xl text-white">{openedImage.description}</h1>
				<div className="relative flex-grow">
					<Image className="h-full w-auto object-cover" src={openedImage.url} fill />
				</div>
			</div>
			
		</div>
	)
}