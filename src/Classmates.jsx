import { useState } from "react";

export const Classmates = () => {
  const [classmates, setClassmates] = useState([])
  const [newMate, setNewMate] = useState("");

  const addClassmateHandler = () => {
    if(newMate.trim() === "") return;

    setClassmates([newMate, ...classmates])
    setNewMate("")
  }
  

  return (
    <div>
      <h1>Classmates</h1> 
      <input
        type="text"
        value={newMate}
        onChange={(e) => setNewMate(e.target.value)}
      />
      <button onClick={addClassmateHandler}>Add Classmate</button>
      <ul>
        {classmates.map((classmate, index) => (
          <li key={index}>{classmate}</li>  
        ))}
      </ul>
    </div>
  );
}