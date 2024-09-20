import Section from "../components/Section/Section";
import Article from "../components/Section/Article";
import Form from "../components/Form/Form";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { Link, Navigate } from "react-router-dom";
import routes from "../router/routes";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const LoginView = () => {

    
  const { login, user } = useContext(UserContext);

  const [form, setForm] = useState({

    email:'',
    password:''

  });

  const handleChange = (e) =>{

    setForm((prev)=>{ 
      
      return {...prev, [e.target.name]: e.target.value }
  
  
    })

  }

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    await login(form);
    
  };

  return (
    <main className="w-full grid md:grid-cols-2 grid-cols-1 max-h-screen ">


      <Section classes={"md:h-screen relative"}>
        {/* TITLE SUB-ROW*/}
        <div className=" w-full flex justify-center pt-20 md:pt-0">
          <Article classes={"md:content-center px-10 md:h-screen h-[520px]  overflow-hidden"}>
          <Link to={routes.home} className="text-center  ps-5  text-2xl absolute top-5 left-0">
            Game
            <span className="text-accent px-1 font-[Electrolize]">FORGE</span>
          </Link>

            <div className="grid grid-cols-1 md:grid-cols-2">

              <Form
              classes={"content-center grid grid-cols- gap-5 md:w-80 w-72 mt-10 md:mt-0"}
              submit={handleSubmit}
            >
              {user && <Navigate to={routes.home} />}
              <Title
                tag={"h3"}
                classes={"text-white text-2xl text-center md:text-start "}
              >
                Login-In
              </Title>
              <div className="flex w-full flex-col">
                <div className="divider divider-accent m-0 mb-1"></div>
              </div>
              <Form.Input
                classes={
                  "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
                }
                placeholder={"Email"}
                type={"email"}
                id={"email"}
                change={handleChange}
                name={"email"}
                required={true}
              />
              <Form.Input
                classes={
                  "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
                }
                placeholder={"*******"}
                type={"password"}
                id={"password"}
                change={handleChange}
                name={"password"}
                required={true}
              />
              <Button
                classes={"bg-accent text-white hover:border-accent"}
                type={"submit"}
              >
                Submit
              </Button>
            </Form>              
           
            </div>
          </Article>
        </div>
      </Section>

      <Section classes={"h-screen md:block hidden loginBG"}>
        
      </Section>
    </main>
  );
};

export default LoginView;
