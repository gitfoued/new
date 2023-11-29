import fs from "fs/promises"

const readfile=async()=>{
  
  const Pathref="c:\\Users\\alama\\OneDrive\\Documents\\Node.js\\package.json"
  console.log(JSON.parse(await fs.readFile(Pathref,'utf-8')))
}
readfile()
const writefile=async()=>{
  const newFile=new URL('./demo.js',import.meta.url).pathname
  await fs.writeFile(newFile,`console.log("hi les gens")`)
}
writefile()
const pathrep=new URL('./essai',import.meta.url)
fs.mkdir(pathrep)
fs.rm(pathrep)