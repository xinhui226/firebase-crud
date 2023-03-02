import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateAge = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const updatedAge = { age: age + 1 };
    await updateDoc(userDoc, updatedAge);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs);
    };
    getUsers();
  }, []);

  return (
    <div className="App">
      <input
        placeholder="Name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        placeholder="Age"
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />
      <button onClick={createUser}>Create User</button>

      {users.map((user) => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateAge(user.id, user.age);
              }}
            >
              Age+1
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
