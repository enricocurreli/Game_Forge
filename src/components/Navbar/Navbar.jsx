import { Link, useNavigate } from "react-router-dom";
import useScroll from "../../hooks/useScroll";
import "./Navbar.css";
import Img from "../Img/Img";
import DropGenre from "../Dropdown/DropGenre";
import routes from "../../router/routes";
import { IoHome } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import Button from "../Button/Button";
import { useContext, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import DropPlatforms from "../Dropdown/DropPlatforms";
import { FaComputer } from "react-icons/fa6";
import { BsNintendoSwitch } from "react-icons/bs";
import { FaPlaystation } from "react-icons/fa";
import { FaXbox } from "react-icons/fa";
import { CgMenuMotion } from "react-icons/cg";
import Form from "../Form/Form";
import { UserContext } from "../../context/UserContext";
import userIcon from "../../assets/media/user-64.png";


const Navbar = () => {
  const [scrolled, scrollY] = useScroll();
  const [search, setSearch] = useState(false);
  const [isParentOpen, setIsParentOpen] = useState(false);

  const toggleParentDropdown = () => setIsParentOpen((prev) => !prev);
  
  const [searchQuery, setSearchQuery] = useState(" ");
  const navigate = useNavigate();


  const handleSearch =  (e) => {
    
    setSearchQuery(e.target.value)

  }


  const handleSearchQuery = () =>{

    if(searchQuery) {
      navigate(`/results/${searchQuery}`)
    }
  }

  

  const { user, logout, profile } = useContext(UserContext);

  const imgDefault =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const URL_KEY = import.meta.env.VITE_SUPABASE_URL_KEY;

  const showSearch = () => {
    setSearch(!search);
  };


  return (
    <div
      className={(scrollY > 30 ? "scrolledY " : " ") + "  navbar py-3"}
      ref={scrolled}
    >
      <div className="navbar-start ">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={toggleParentDropdown}
          >
            <CgMenuMotion className="h-8 w-8" />
          </div>

          {isParentOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-4 shadow"
            >
              <li className="my-2 justify-center rounded-full  hover:bg-violet-700">
                <Link to={routes.home}>
                  <IoHome />
                  Home
                </Link>
              </li>
              <li className="justify-center rounded-full hover:bg-yellow-600">
                <DropPlatforms
                  index={0}
                  textDecoration={"text-yellow-600"}
                  title={<FaComputer className="mt-[2px]" />}
                  text={"PC"}
                />
              </li>
              <li className="justify-center rounded-full hover:bg-[#165AAD] ">
                <DropPlatforms
                  index={1}
                  textDecoration={"text-[#165AAD]"}
                  title={<FaPlaystation className="mt-[2px]" />}
                  text={"PlayStation"}
                />
              </li>
              <li className="justify-center rounded-full hover:bg-[#14630D]">
                <DropPlatforms
                  index={2}
                  textDecoration={"text-[#14630D]"}
                  title={<FaXbox className="mt-[2px]" />}
                  text={"Xbox"}
                />
              </li>
              <li className="justify-center rounded-full hover:bg-red-600">
                <DropPlatforms
                  index={7}
                  textDecoration={"text-red-600"}
                  title={<BsNintendoSwitch className="mt-[2px]" />}
                  text={"Nintendo"}
                />
              </li>
              <li className="my-2 justify-center rounded-full hover:bg-[#CD4300]">
                <DropGenre />
              </li>
              <li className="my-2 justify-center rounded-full grid grid-cols-2 gap-3">
                <Form  classes={"ps-0"}>
                  <Form.Input
                    type={"text"}
                    placeholder={"Search here"}
                    classes={
                      "input focus:border-orange-600 focus:bg-slate-700 hover:bg-slate-700  border-white w-[130px]"
                    }
                    change={handleSearch}
                    value={searchQuery}
                  />

                  
                    <Button
                      classes={
                        "rounded-full bg-orange-600 hover:bg-orange-600 border-none "
                      }
                      click={handleSearchQuery}
                     
                    >
                      {" "}
                      <IoIosSearch className="hover:scale-150 transition-transform" />
                    </Button>
                  
                </Form>
              </li>
            </ul>
          )}
        </div>
        <div className="navbar-end px-1">
          <Link
            to={routes.home}
            className=" w-[100px] text-center lg:block hidden ps-1 text-2xl"
          >
            Game
            <span className="text-accent px-1 font-[Electrolize]">FORGE</span>
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex rounded-full ">
        <ul className="menu menu-horizontal xl:px-10 ">
          <li className="justify-center rounded-full hover:bg-yellow-600">
            <DropPlatforms
              index={0}
              textDecoration={"text-yellow-600"}
              title={<FaComputer className="mt-[2px]" />}
              text={"PC"}
            />
          </li>
          <li className="justify-center rounded-full hover:bg-[#165AAD] ">
            <DropPlatforms
              index={1}
              textDecoration={"text-[#165AAD]"}
              title={<FaPlaystation className="mt-[2px]" />}
              text={"PlayStation"}
            />
          </li>
          <li className="justify-center rounded-full hover:bg-[#14630D]">
            <DropPlatforms
              index={2}
              textDecoration={"text-[#14630D]"}
              title={<FaXbox className="mt-[2px]" />}
              text={"Xbox"}
            />
          </li>
          <li className="justify-center rounded-full hover:bg-red-600">
            <DropPlatforms
              index={7}
              textDecoration={"text-red-600"}
              title={<BsNintendoSwitch className="mt-[2px]" />}
              text={"Nintendo"}
            />
          </li>
          <li className="justify-center rounded-full hover:bg-[#CD4300]">
            <DropGenre />
          </li>
          <li className="justify-center rounded-full px-5">
            {search && scrollY < 30 ? (
              <>
                <Form
                  classes={"absolute -bottom-[0px] left-20 p-0"}
                >
                  <Form.Input
                    type={"text"}
                    placeholder={"Search here"}
                    classes={
                      "input focus:border-orange-600 focus:bg-slate-700 hover:bg-slate-700  border-white w-[200px] z-50"
                    }
                    change={handleSearch}
                    value={searchQuery}
                  />
                    <Button
                      classes={
                        "rounded-full bg-orange-600 hover:bg-orange-600 border-none  absolute bottom-[0px] left-[220px] z-50"
                      }
                     click={handleSearchQuery}
                    >
                      {" "}
                      <IoIosSearch className="hover:scale-150 transition-transform" />
                    </Button>
                </Form>
              </>
            ) : (
              ""
            )}

            {search && scrollY > 30 ? (
              <>
                <Form
                  classes={"absolute -bottom-[0px] left-20 p-0"}
                >
                  <Form.Input
                    type={"text"}
                    placeholder={"Search here"}
                    classes={
                      "input focus:border-orange-600 focus:bg-slate-700 hover:bg-slate-700  border-white w-[220px] z-50"
                    }
                    change={handleSearch}
                    value={searchQuery}
                  />
                    <Button
                      classes={
                        "rounded-full bg-orange-600 hover:bg-orange-600 border-none  absolute bottom-[0px] left-[240px] z-50 "
                      }
                     click={handleSearchQuery}
                    >
                      {" "}
                      <IoIosSearch className="hover:scale-150 transition-transform" />
                    </Button>
                  
                </Form>
              </>
            ) : (
              ""
            )}

            {search ? (
              <Button
                classes={"rounded-full border-none bg-transparent"}
                click={showSearch}
              >
                <IoCloseOutline />
              </Button>
            ) : (
              <Button
                classes={
                  "rounded-full bg-orange-600 hover:bg-orange-600  border-none"
                }
                click={showSearch}
              >
                <IoIosSearch className="hover:scale-150 transition-transform" />
              </Button>
            )}
          </li>
        </ul>
      </div>
      <div className="navbar-end flex justify-center">
        {(user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar "
            >
              <Link className="rounded-full myAvatar">
                {profile && profile.avatar_url ? (
                  <Img
                    alt="Tailwind CSS Navbar component"
                    src={`${URL_KEY}/storage/v1/object/public/avatars/${profile.avatar_url}`}
                    classes={"rounded-full w-full overflow-hidden"}
                  />
                ) : (
                  <Img
                    alt="Tailwind CSS Navbar component"
                    src={imgDefault}
                    classes={
                      "rounded-full md:w-[160px] md:h-[160px] w-[130px] h-[130px] mt-7 sm:mt-0"
                    }
                  />
                )}
              </Link>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li className="ps-3 py-2 text-accent">
                {profile && profile.username}
              </li>
              <li>
                <Link to={routes.profile}>Profile</Link>
              </li>
              <li>
                <Link onClick={() => logout()}>Logout</Link>
              </li>
            </ul>
          </div>
        )) || (
          <Link to={routes.signUp} className="w-8 rounded-full">
            <Img
              alt="Tailwind CSS Navbar component"
              src={userIcon}
              classes={"rounded-full"}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
