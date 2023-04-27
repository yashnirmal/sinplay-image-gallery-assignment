import Image from "next/image";
import Preview from "./preview";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function Grid({filterText}){

	const [allImages,setAllImages] = useState([])
	const [filteredImage,setFilteredImages] = useState([])
	const [openedImage,setOpenedImage] = useState(null)
	const [page,setPage] = useState(1)

	useEffect(()=>{
		fetchAllImages()
	},[])

	useEffect(()=>{
		if(filterText.length==0){
			setFilteredImages(allImages)
		}
		else {
			const temp = allImages.filter(img=>{
				return img.description.toLowerCase().includes(filterText.toLowerCase())
			})
			setFilteredImages(temp)
		}
	},[filterText])


	useEffect(()=>{
		console.log(allImages)
	},[allImages])


	function fetchAllImages(){
		fetch("/api/images")
		.then(res=>res.json())
		.then(data=>{
			console.log(data)
			if(data.status=='ok'){
				console.log(data.data)
				setAllImages(data.data)
				setFilteredImages(data.data)
			}
			else{
				console.log("Fetch error")
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}


	function handleOnDragEnd(result){
		if(!result.destination) return
		const items = Array.from(filteredImage)
		const [reorderedItem] = items.splice(result.source.index,1);
		items.splice(parseInt(result.destination.index),0,reorderedItem)

		setFilteredImages(items)
		setAllImages(items)
		console.log(items)
	}

	if(filteredImage.length==0){
		return (
			<p className="text-center">
				Loading...
			</p>
		)
	}

	return (
		<div className="max-w-[1000px] w-full p-2 flex flex-col items-center justify-center">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="grid-images">
					{
						(provided)=>(
						<ul className="w-full grid sm:grid-cols-3 grid-cols-2 gap-1" {...provided.droppableProps} ref={provided.innerRef} >
							{
								filteredImage.map((el,idx)=>(
									<Draggable key={el.id} draggableId={el.id.toString()} index={idx} >
										{(provided)=>(
											<li className="relative aspect-square" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} onClick={()=>setOpenedImage(el)}>
												<Image className="object-cover" src={el.url} fill />
											</li>
										)}
									</Draggable>
								))
							}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
			
			<div className="flex items-center mb-20 mt-16">
			</div>

			{
				openedImage && <Preview openedImage={openedImage} setOpenedImage={setOpenedImage} />
			}
			
		</div>
	)
}