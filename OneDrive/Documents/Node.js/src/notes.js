import {inserdb,getdb,writedb} from "./db.js"
export const ajoutenote=async(note,tags)=>{
    const notes={
        tags,
        content:note,
        id:Date.now()
    }
    await inserdb(notes);
    return(notes)
}
export const getall=async()=>{
  const {notes}= await getdb()
  return(notes)
}
export const findnote=async(filter)=>{
  const notes=await getall();
  return notes.filter(note=>note.content.toLowerCase().includes(filter.toLowerCase()))//filter return an array
}
export const deletenote=async(id)=>{
    const notes=await getall()
    const notedeleted=notes.filter(note=>note.id === id)
    if(notedeleted){
      const Newnotes=notes.filter(note=>note.id !== id)
      await writedb({notes:Newnotes})
      return(id)
    }
}
export const removeall=()=>
  writedb({notes:[]})

