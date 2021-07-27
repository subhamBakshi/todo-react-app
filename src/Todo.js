//Enter 'rfce' (react functional component with an export) to autofill your component {ES7 feature, install seperate}
//Component is something we can write once but use it several times & in several places, i.e, makes the code reusable.
import React, {useState} from 'react'
import { Button, List, ListItem, ListItemText, Modal } from '@material-ui/core';
import './Todo.css';
import db from './firebase';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: theme.spacing.unit * 50,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 5,
      outline: 'none',
    },
  }));

function Todo(props) {
    //props (properties) helps us to differentiate one component with anothe
   const classes = styles();
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    const updateTodo = () => {
        //update the todo with the new input text

        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true}) //prevents from overriding existing data
        setOpen(false);
    }

    return (
        <>
        <Modal className="modal"
            open={open}
            onClose={e => setOpen(false)}
            >
                <div className={classes.paper}>
                    <h1>Update Task 🔁</h1>
                    <br />
                    <input placeholder={props.todo.todo} value={input} onChange={event => setInput(event.target.value)}/>
                    <Button disabled={!input} onClick={updateTodo}>Done</Button>
                </div>
            
        </Modal>
        
        <List className= "todo_list">
            <ListItem>
                  <ListItemText
                    primary={props.todo.todo} //{todo.todo} => {text part, object}
                    secondary=""
                    /* 'todo' is a dynamic variable & to access it, we use it with props */
                  />
            </ListItem>
            <Button onClick={e => setOpen(true)}>Edit</Button>
            <DeleteForeverIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            
        </List>
        <hr />
        </>
    )
}

export default Todo;
