import Section from "../components/Section/Section";
import Article from "../components/Section/Article";
import Form from "../components/Form/Form";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { Link, Navigate } from "react-router-dom";
import routes from "../router/routes";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const SignUpView = () => {
  const { signUp, user } = useContext(UserContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
    options: {
      data: {
        first_name: "",
        last_name: "",
        username: "",
      },
    },
  });

  const profileHandleChange = (e)=>{
    setForm((prev)=>{ return {...prev, options:{
        data: {
            ...prev.options.data,
            [e.target.name] : e.target.value
        }
    }}});

}

  const handleChange = (e) => {
    setForm((prev) => { return { ...prev, [e.target.name]: e.target.value }});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(form);
  };

  return (

    <main className="w-full grid md:grid-cols-2 grid-cols-1 max-h-screen ">


      <Section classes={"md:h-screen relative"}>
        {/* TITLE SUB-ROW*/}
        <div className=" w-full flex justify-center pt-20 md:pt-0">
          <Article classes={"md:content-center px-10 md:h-screen h-[520px]"}>
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
                Sign-Up
              </Title>
              <div className="flex w-full flex-col">
                <div className="divider divider-accent m-0 mb-1"></div>
              </div>
              <Form.Input
                classes={
                  "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
                }
                placeholder={"First name"}
                type={"text"}
                id={"first_name"}
                name={"first_name"}
                change={profileHandleChange}
                required={true}
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
                required={true}
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
                required={true}
              />
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
              <Link to={routes.login} className="hover:text-accent mt-4 w-3/4">
                  Already have an account?
              </Link>
            </Form>              
           
            </div>
          </Article>
        </div>
      </Section>

      <Section classes={"h-screen md:block hidden signupBG"}>
        
      </Section>
    </main>



  //   <main className="w-full grid md:grid-cols-2 grid-cols-1 ">
  //   {/* <Navigate  to="/" /> */}

  //   <Section classes={"h-screen"}>
      
  //     {/* TITLE SUB-ROW*/}
  //     <Article classes={"w-full  h-20 pt-[34.5px]"}>
  //       <Link to={routes.home} className="text-center  ps-5 text-2xl ">
  //         Game
  //         <span className="text-accent px-1 font-[Electrolize]">FORGE</span>
  //       </Link>
  //     </Article>

  //     {/* FORM */}
  //       <div className=" w-full xl:h-[605px] lg:h-[1162px] h-[659px] flex justify-center">
  //       <Article classes={" flex justify-center "}>
        // <Form
        //       classes={"content-center grid grid-cols- gap-5 w-80"}
        //       submit={handleSubmit}
        //     >
        //       {user && <Navigate to={routes.home} />}
        //       <Title
        //         tag={"h3"}
        //         classes={"text-white text-2xl text-center md:text-start "}
        //       >
        //         Sign-Up
        //       </Title>
        //       <div className="flex w-full flex-col">
        //         <div className="divider divider-accent m-0 mb-1"></div>
        //       </div>
        //       <Form.Input
        //         classes={
        //           "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        //         }
        //         placeholder={"First name"}
        //         type={"text"}
        //         id={"first_name"}
        //         name={"first_name"}
        //         change={profileHandleChange}
        //       />
        //       <Form.Input
        //         classes={
        //           "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        //         }
        //         placeholder={"Last name"}
        //         type={"text"}
        //         id={"last_name"}
        //         name={"last_name"}
        //         change={profileHandleChange}
        //       />
        //       <Form.Input
        //         classes={
        //           "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        //         }
        //         placeholder={"Username"}
        //         type={"text"}
        //         id={"username"}
        //         name={"username"}
        //         change={profileHandleChange}
        //       />
        //       <Form.Input
        //         classes={
        //           "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        //         }
        //         placeholder={"Email"}
        //         type={"email"}
        //         id={"email"}
        //         change={handleChange}
        //         name={"email"}
        //       />
        //       <Form.Input
        //         classes={
        //           "input focus:border-accent focus:bg-slate-700 hover:bg-slate-700  border-white"
        //         }
        //         placeholder={"*******"}
        //         type={"password"}
        //         id={"password"}
        //         change={handleChange}
        //         name={"password"}
        //       />
        //       <Button
        //         classes={"bg-accent text-white hover:border-accent"}
        //         type={"submit"}
        //       >
        //         Submit
        //       </Button>
        //       <Link to={routes.login} className="hover:text-accent mt-4 w-3/4">
        //           Already have an account?
        //       </Link>
        //     </Form>
  //     </Article>
  //       </div>
  //   </Section>

  //   <Section
  //     classes={"h-screen md:block hidden signupBG"}
  //   ></Section>
  // </main>
  );
};

export default SignUpView;

    