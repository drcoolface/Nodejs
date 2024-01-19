import { useState } from 'react'

import UserForm from './Components/UserForm'
import { UserType } from './Constants/types';
import UserList from './Components/UserList';


function App() {

  const [formData, setFormData] = useState<UserType[]>([]);

  const handleFormSubmit = (values: UserType) => {
    setFormData([...formData, values]);
  };



  return (
    
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column"}}>
        <UserForm onFinish={handleFormSubmit}/>
        <UserList data={formData} />
        </div>
   
  )
}

export default App
