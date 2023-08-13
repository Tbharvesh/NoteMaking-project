const btnEl=document.getElementById("btn");
const appEl=document.getElementById("app");

//to saave note even after refreshing the page
getNote().forEach((note) => {
    const noteEl=createNoteEl(note.id,note.content)
    appEl.insertBefore(noteEl,btn) //inserting a textarea 
    
});

function createNoteEl(id,content){
    const elem = document.createElement("textarea")
    elem.classList.add("note")
    elem.placeholder="Empty Note"
    elem.value=content

    elem.addEventListener("dblclick",()=>{
        const warning =confirm("Do you want to delete this note?")
        if(warning){
            deleteNote(id,elem)
        }
    })

    elem.addEventListener("input",()=>{
        updateNote(id,elem.value)
    });

    return elem;
}

function deleteNote(id,elem){
    const notes=getNote().filter((note)=>note.id!=id)
    saveNote(notes)
    appEl.removeChild(elem)


}

function updateNote(id,content){
    const notes=getNote()
    const target= notes.filter((note)=>note.id=id)[0]
    target.content=content
    saveNote(notes)


 
}

function addNote(){
    // const notesObj=[] we will get all the present notes inside the new object
    const notesObj=getNote()
    // console.log("clicked");
    const noteObj={
        id:Math.floor(Math.random()*10000),
        content:"",
    };
    // const noteEl = createNoteEl(noteObj.id,noteObj.content)
    appEl.insertBefore(createNoteEl(noteObj.id,noteObj.content),btnEl);  // insert the new node before btnEl(+)

    notesObj.push(noteObj)
    saveNote(notesObj)
}
btnEl.addEventListener("click",addNote)
function saveNote(notesObj){
    localStorage.setItem("note-app",JSON.stringify(notesObj))
}
function getNote(){
    return JSON.parse(localStorage.getItem("note-app") || "[]")
}