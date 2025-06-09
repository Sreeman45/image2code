"use client"
import axios from "axios"
import React, {  FormEvent, useState } from "react"

const Uploadimage=()=>{
    const [file,setFile]=useState<File | null>(null)
    const [uploading,setUploading]=useState(false)
    const [imageUrl,setImageurl]=useState<string | null>(null)
   const upload=async(e:FormEvent)=>{
      e.preventDefault();
      if(!file)return;
      setUploading(true)
      const formData=new FormData()
      formData.append("file",file)
      formData.append('upload_preset','imagetocode')
      console.log(formData)
      try{
         const response:any=await axios.post('https://api.cloudinary.com/v1_1/dza3vsyso/upload',formData)
           setImageurl(response?.data?.secure_url)
           console.log(response)
         
      
      }
      catch(err){
        console.log(err)
       
      }
      finally{
 setUploading(false)

      }

   }
   const handleFile=(e:React.ChangeEvent<HTMLInputElement>)=>{
    e.preventDefault()
    if(e.target.files && e.target.files[0]){
        setFile(e.target.files[0])
    }
   }
    return(
        <div className="flex w-full justify-center items-center ">
            <form onSubmit={upload}>
            <input type="file" onChange={handleFile} accept="image/*,video/*"></input>
            <button type="submit">{uploading ? 'uploading' : 'upload'}</button>
            {
                imageUrl && 
                <img src={imageUrl}/>
            }
            </form>
        </div>
    )
}
export default Uploadimage