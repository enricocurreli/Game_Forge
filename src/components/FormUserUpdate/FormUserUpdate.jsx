import Form from "../Form/Form"
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import supabase from "../../database/supabase";


const FormUserUpdate = ({setEdit}) => {

  const {userUpdate, profile, avatarUpdate } = useContext(UserContext);

  const [form, setForm] = useState({

    first_name: profile.first_name,
    last_name: profile.last_name ,
    username: profile.username,
      
  });

  const [file , setFile] = useState();


  const profileHandleChange =  async (e)=> {
    
    await setForm((prev)=>{ 
      
      return {...prev,[e.target.name] : e.target.value}
    }


  )};
  
 const fileHandleChange = (e)=>{

  setFile(e.target.files[0]);
  
 }

  const handleSubmit = async (e) =>{

    e.preventDefault();
    await userUpdate(form)
    setEdit(false)
    const fileExt =  file.name.split('.').pop();
    const fileName = `${profile.id}${Math.random()}.${fileExt}`;
    await supabase.storage.from('avatars').upload(fileName, file)
    await avatarUpdate({ id: profile.id , avatar_url: fileName });
  
    
  }
  

  return (
    <Form
    classes={"content-center grid md:grid-cols-2 gap-5  mt-5"}
    submit={handleSubmit}
  >
   
    <Form.Input
        classes={
          "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        }
        placeholder={"First name"}
        type={"text"}
        id={"first_name"}
        name={"first_name"}
        change={profileHandleChange}
      />

    <Form.Input
        classes={
          "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        }
        placeholder={"Last name"}
        type={"text"}
        id={"last_name"}
        name={"last_name"}
        change={profileHandleChange}
      />

    <Form.Input
        classes={
          "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        }
        placeholder={"Username"}
        type={"text"}
        id={"username"}
        name={"username"}
        change={profileHandleChange}
      />
      <Form.Input
        classes={
          "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white file-input file-input-bordered file-input-accent w-full max-w-xs p-0 text-white"
        }
        type={"file"}
        id={"avatar"}
        name={"avatar"}
        change={fileHandleChange}
      />
    <Button
      classes={"bg-accent text-white hover:border-accent"}
      type={"submit"}
    >
      Save changes
    </Button>
  </Form>
  )
}

export default FormUserUpdate