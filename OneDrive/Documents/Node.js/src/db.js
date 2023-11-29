import fs from "node:fs/promises"

const pathdb="c:\\Users\\alama\\OneDrive\\Documents\\Node.js\\src\\db.js"

console.log(pathdb);
export const getdb=async()=>{
    const data=await fs.readFile(pathdb,"utf-8")
    return(JSON.parse(data))
}
export const writedb=async(db)=>{
    await fs.writeFile(pathdb,JSON.stringify(db,null,2))
    return(db)
}
export const inserdb=async(notes)=>{
    const data=await getdb();
    data.notes.push(notes);
    await writedb(data)
    return(notes)
}