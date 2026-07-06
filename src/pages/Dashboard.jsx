import {useState, useEffect} from "react";

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(()=>{
    fetch("https://jsonplaceholder.typicode.com/todos").then((response)=>response.json()).then((data)=>{
        console.log(data);
        setAppointments(data);
    })
    .catch((error)=>console.error("Fetch Failed: ", error));
  }, []);


  return(
    <div>
        <h1>Dashboard</h1>
        <p>Total appointments: {appointments.length}</p>
    </div>
  )
}