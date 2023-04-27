import { useState } from "react"

export default function UploadImgModal({setUploadModalOpen}){

	const [image,setImage] = useState(null)
	const [description,setDescription] = useState("")

	function fileUploaded(e){
		setImage(e.target.files[0])
	}

	async function uploadImage(){
		if(!description.length) return
		const base64 = await convertTobase64(image)
		console.log(base64)

		const newImage = {
			'url':base64,
			'description':description
		}

		fetch('/api/images', {
	      method: 'POST',
	      headers: { 'Content-Type': 'application/json' },
	      body: JSON.stringify(newImage),
	    })
		.then(res => res.json())
		.then(data => console.log(data))
		.catch(error => console.error(error));

		setUploadModalOpen(false)
	}

	function convertTobase64(file){
	    return new Promise((resolve,reject)=>{
	      const fileReader = new FileReader();
	      fileReader.readAsDataURL(file)
	      fileReader.onload=()=>{
	        resolve(fileReader.result)
	      }
	      fileReader.onerror=(err)=>{
	        reject(err)
	      }
	    })
	  }

	return (
		<div className="w-full h-full fixed top-0 left-0 bg-black/60 flex items-center justify-center">
			<div className="max-w-[400px] w-full p-2 flex flex-col gap-6 bg-gray-100 rounded-2xl p-4">

				<div className="relative w-full h-40">
					<label htmlFor="input-img" className="w-full h-full flex flex-col items-center justify-center border-2 border-dotted border-black/90 rounded-xl">
						{
							(!image)?<p className="text-center">Drag and drop the file<br />OR<br /> Click to Upload<br/>(Max 1MB)</p>
							:<p className="text-center">Selected : {image?.name}</p>
						}
					</label>
					<input onChange={fileUploaded} className="absolute top-0 left-0 w-full h-full opacity-0" name='input-img' id='input-img' type="file" accept=".jpg,.png,.jpeg" />
				</div>

				<textarea onChange={e=>setDescription(e.target.value)} value={description} type="text" placeholder="Enter image description" />

				<div className="flex justify-end gap-4">
				    <button onClick={()=>setUploadModalOpen(false)} className="bg-red-500">Close</button>
					<button onClick={uploadImage}>Submit</button>
				</div>
			</div>
		</div>
	)
}