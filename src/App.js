import React, {useState, useEffect} from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Todo from './Todo';
import db from './firebase';
import firebase from 'firebase';
// Author: Subham Bakshi
// Start Date: 26/07/21
// Finish Date: 27/07/21 
function App() {
  const [todos, //array inside useState(mapped), short term -- state
          setTodos //keep appending this to the array, dynamically.
        ] = useState([]);
  const [input, setInput] = useState('');
  //console.log(input);

  //when the app loads, we need to listen to the database & fetch new todos as they get added/removed
        useEffect(() => {
          //this code here fires when the app.js loads
          db.collection('todos').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
            //'docs' refers to the data(array) in the database; 'doc' refers to the element in the array
            setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo}) )) //doc.data will give us an object
          })
        }, []);
  

  const addTodo = (event) =>{
    //this will fire off when we click the button
    event.preventDefault(); //stop page refresh

    //dynamically adding to the database
    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, // '...' = spread, so as to keep the old array, and then add the new ones
              input  //pushing new items to the array
            ]);
    setInput(''); //making the input box blank again, once the button is clicked
  }

  return (
    <div className="App">
     <h1>Todo App</h1>
     <form>
       <FormControl>
         <InputLabel>✔Write a Todo</InputLabel>
         <Input value={input} onChange={event => setInput(event.target.value)}/>
       </FormControl>
        <br />
        <br />
        <Button variant="contained" color="primary"  type="submit" disabled={!input}
            onClick={addTodo}>Add Todo</Button>
            
     </form>
     
     <br />
     <br />
      <ul>
        {todos.map(todo => ( //looping through the array 'todos'
          <Todo todo={todo}/>
        //  <li>{todo}</li>
        ))}
      </ul>

    </div>
  );
}

export default App;
