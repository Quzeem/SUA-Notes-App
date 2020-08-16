const fs = require('fs');
const chalk = require('chalk');

// LIST
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.green.inverse('Your Notes'));
  notes.forEach(note => {
    console.log(note.title)
  }
)}

// ADD
const addNote = (title, body) => {
  const notes = loadNotes(); //[] --- assigned at first function call

  //check if an existing note has thesame title as the incoming note
  // Find Method - returns the first match(if found) or undefined(if not found)
  const duplicateNote = notes.find(note => note.title === title);

  if(!duplicateNote) {
    //push the note object to notes array
    notes.push({title, body}); //ES6
    //save the notes array
    saveNotes(notes)
    console.log(chalk.green.inverse('Note added successfully'));
   } else {
    console.log(chalk.red.inverse('Note title has been taken'));
  }
}

//A function to save notes 
const saveNotes = (notes) => {
  const notesJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', notesJSON);
}

// Always load existing notes from data store to avoid overwritten
const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('notes.json');
    const jsonData = bufferData.toString();
    const data = JSON.parse(jsonData);
    return data;
  } catch(err) {
    return [];
  }
}

// REMOVE
const removeNote = (title) => {
  const notes = loadNotes();

  // filtered out a note with the title that matches the specified title parameter
  const filteredNotes = notes.filter(note => note.title !== title);

  // check if trully note was removed
  if( notes.length > filteredNotes.length) {
    console.log(chalk.green.inverse(`Note with title: '${title}' deleted successfully`))
  // save the notes with title that doesn't match the title parameter
    saveNotes(filteredNotes);
  }else {
    // otherwise --- nothing was removed
    console.log(
      chalk.red.inverse(`Note with title: '${title}' doesn't exist`)
    );
  }
}

// READ
const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if(note) {
    console.log(`Title: ${chalk.green(note.title)}`);
    console.log(`Body: ${chalk.green(note.body)}`);
  } else {
    console.log(chalk.red('Error: Not Found!'));
  }
}

module.exports = {listNotes, addNote, removeNote, readNote}