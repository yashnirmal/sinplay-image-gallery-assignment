import fs from 'fs';
import path from 'path';
import data from "../../data/data.json"

export default function handler(req, res) {
  if(req.method == "POST"){
    const newImage = req.body

    data.push({id:data.length,...newImage})

    console.log(data)

    fs.writeFile("./data/data.json",JSON.stringify(data),err=>{
       if (err) {
        console.error(err);
        res.status(500).json({ status:"error", msg: 'Failed to upload image' });
      } else {
        res.status(200).json({ status:'ok', msg: 'new image added successfully' });
      }
    })
  }
  else if(req.method == "GET"){
    res.status(200).send({status:"ok",data:data})
  }
  else{
    res.status(400).send({status:"error",msg:"this fetch method is not supported"})
  }
}
