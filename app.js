const yargs = require('yargs');
const {listNotes, addNote, removeNote, readNote} = require('./notes');

// Create add command
yargs.command({
  //command name
  command: 'add',
  //what the command does
  description: 'Add a new note',
  // structure of inputs
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string',
    },
    body: {
      description: 'Note content',
      required: true,
      type: 'string',
    },
  },
  //function that will be executed when 'add' command is used with our node.js file.
  handler: (argv) => {
    addNote(argv.title, argv.body)
  }
});

// Create remove command
yargs.command({
  command: 'remove',
  description: 'Remove a note',
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string'
    },
  },
  handler: (argv) => removeNote(argv.title)
});

// Create read command
yargs.command({
  command: 'read',
  description: 'Read the content of a note',
  builder: {
    title: {
      description: 'Note title',
      required: true,
      type: 'string',
    },
  },
  handler: (argv) => readNote(argv.title)
});

// Create list command
yargs.command({
  command: 'list',
  description: 'list all notes',
  handler: () => listNotes()
});

yargs.parse()
