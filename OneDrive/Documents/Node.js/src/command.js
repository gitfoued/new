import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import{ajoutenote,deletenote,getall,findnote,removeall} from './notes.js'
const listNotes = (notes) => {
  notes.forEach(note => {
    console.log('\n')
    console.log('id: ', note.id)
    console.log('tags: ', note.tags.join(', ')),
    console.log('note: ', note.content)
  })
}//il faut l'ecrire dans un autre fichier et l'importer dans cette cas seulement je fais ca
yargs(hideBin(process.argv))
  .command('new <note>', 'create a new note', yargs => {
    return yargs.positional('note', {
      describe: 'The content of the note you want to create',
      type: 'string'
    })
  }, async (argv) => {
    const tags=argv.tags ? argv.tags.split(','):[]
    const note=await ajoutenote(argv.note,tags)
    console.log('new note',note)
    
  })
  .option('tags', {
    alias: 't',
    type: 'string',
    description: 'tags to add to the note'
  })
  .command('all', 'get all notes', () => {}, async (argv) => {
    const data=await getall();
    listNotes(data)
    
  })
  .command('find <filter>', 'get matching notes', yargs => {
    return yargs.positional('filter', {
      describe: 'The search term to filter notes by, will be applied to note.content',
      type: 'string'
    })
  }, async (argv) => {
    const data=await findnote(argv.filter)
    listNotes(data)
  })
  .command('remove <id>', 'remove a note by id', yargs => {
    return yargs.positional('id', {
      type: 'number',
      description: 'The id of the note you want to remove'
    })
  }, async (argv) => {
    const data=await deletenote(argv.id)
    console.log(" voici le note est supprime",data)
  })
  .command('web [port]', 'launch website to see notes', yargs => {
    return yargs
    .positional('port', {
        describe: 'port to bind on',
        default: 5000,
        type: 'number'
      })
  }, async (argv) => {
    
  })
  .command('clean', 'remove all notes', () => {}, async (argv) => {
    await removeall()
    console.log("success de remove")
  })
  .command('ajout',"ajouter new things",()=>{},async(argv)=>{})
  .demandCommand(1)
  .parse()
