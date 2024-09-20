import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Img from "../Img/Img";
import Paragraph from "../Paragraph/Paragraph";
import Section from "../Section/Section";
import Title from "../Title/Title";
import send from "../../assets/media/send-50.png"
import routes from "../../router/routes";

const Banner = () => {
    
  return (
    <Section classes={"w-full  bg-[#323232] footer footer-center p-8 mt-40"}>
      <aside className="">
        <Img src={send} classes={"mb-4"} />
        <Title tag={"h4"} classes={"text-2xl text-center"}>
        Don't miss any offers and promotions!
        </Title>
        <Paragraph classes={"text-slate-300"}>And be the first to receive our private offers, newsletters and deals of the week</Paragraph>
       <Link to={routes.signUp}>
            <Button classes={"rounded-full bg-accent hover:bg-orange-500 border-none text-white p-4 mt-4"}>Sign up</Button>
       </Link>
      </aside>
    </Section>
  );
};

export default Banner;
