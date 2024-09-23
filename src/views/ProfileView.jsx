import Section from "../components/Section/Section";
import Article from "../components/Section/Article";
import Button from "../components/Button/Button";
import Title from "../components/Title/Title";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Paragraph from "../components/Paragraph/Paragraph";
import Img from "../components/Img/Img";
import FormUserUpdate from "../components/FormUserUpdate/FormUserUpdate";
import supabase from "../database/supabase";
import Navbar from "../components/Navbar/Navbar";
import { ChangePage } from "../context/ChangePage";

const ProfileView = () => {

  const {startPage} = useContext(ChangePage)

  const { profile } = useContext(UserContext);

  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const imgDefault =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  const URL_KEY = import.meta.env.VITE_SUPABASE_URL_KEY;

  const [favouritesList, setFavouritesList] = useState();

  const getUserFavourites = async () => {
    let { data: favourites } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", profile.id);

    await setFavouritesList(() => favourites);
  };

  const [userReviews, setUserReviews] = useState();

  const getUserReviews = async () => {
    let { data: reviews } = await supabase
      .from("reviews")
      .select("*, profile_username: profiles(username)")
      .eq("profile_id", profile.id);

    setUserReviews(() => reviews);
  };

  useEffect(() => {
    getUserFavourites();
    getUserReviews();
  }, []);

  return (
    <>
      <Navbar />
      <Section classes={"imgSection profileBGActive"}></Section>

      <Section classes={"grid md:grid-cols-2 justify-center"}>
        {/* PRIMA COLONNA */}
        <Article classes={" px-10 "}>
          <Title
            tag={"h3"}
            classes={
              "text-white text-2xl text-center md:text-start md:ps-3 xl:ps-0"
            }
          >
            Profile
          </Title>
          <div className="flex md:w-1/2 flex-col mb-6">
            <div className="divider divider-accent m-0 mb-1"></div>
          </div>
          <Article>
            {profile && profile.avatar_url ? (
              <Img
                alt="Tailwind CSS Navbar component"
                src={`${URL_KEY}/storage/v1/object/public/avatars/${profile.avatar_url}`}
                classes={
                  "rounded-full md:w-[170px] md:h-[170px] w-[130px] h-[130px] mt-7 sm:mt-0"
                }
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
            <div className="my-4">
              {profile && (
                <>
                  <Paragraph classes={"text-2xl"}>
                    {" "}
                    <span className="text-accent text-lg">
                      First name:
                    </span>{" "}
                    {profile.first_name}
                  </Paragraph>
                  <Paragraph classes={"text-2xl my-2"}>
                    {" "}
                    <span className="text-accent text-lg">Last name:</span>{" "}
                    {profile.last_name}
                  </Paragraph>
                  <Paragraph classes={"text-2xl"}>
                    {" "}
                    <span className="text-accent text-lg">Username:</span>{" "}
                    {profile.username}
                  </Paragraph>
                </>
              )}
              <Button
                classes={"bg-accent text-white hover:border-accent w-1/2 my-4"}
                click={handleEdit}
              >
                Edit
              </Button>
            </div>
          </Article>
          <Article>
            {edit && (
              <div className="my-10">
                <Title
                  tag={"h3"}
                  classes={"text-white text-3xl text-center md:text-start"}
                >
                  Edit
                </Title>
                <div className="flex w-full flex-col">
                  <div className="divider divider-accent m-0 mb-1"></div>
                </div>

                <FormUserUpdate setEdit={setEdit} />
              </div>
            )}
          </Article>
        </Article>

        {/* SECONDA COLONNA */}
        <Article classes={"px-10"}>
          <div className="min-h-52">
            <Title
              tag={"h3"}
              classes={
                "text-white text-2xl text-center md:text-start md:ps-3 xl:ps-0"
              }
            >
              Your favourite games
            </Title>
            <div className="flex md:w-1/2 flex-col mb-6">
              <div className="divider divider-accent m-0 mb-1"></div>
            </div>
            <ul className="mb-10 grid grid-cols-2">
              {favouritesList &&
                favouritesList.map((game) => {
                  return (
                    <li key={game.id}>
                      <span className="text-accent"> - </span>
                      {game.game_name}
                    </li>
                  );
                })}
            </ul>
          </div>
          <div className="min-h-52 mb-12">
            <Title
              tag={"h3"}
              classes={
                "text-white text-2xl text-center md:text-start md:ps-3 xl:ps-0"
              }
            >
              Your reviews
            </Title>
            <div className="flex md:w-1/2 flex-col mb-6">
              <div className="divider divider-accent m-0 mb-1"></div>
            </div>
            <div className="grid md:grid-cols-2 h-[280px] overflow-auto">
              {userReviews &&
                userReviews.map((review) => {
                  return (
                    <Link key={review.id} to={`/detail/${review.game_id}`} onClick={startPage}>
                      <div className="card backdrop-blur-lg bg-accent/40 text-primary-content w-52 my-3">
                        <div className="card-body">
                          <Title tag={"h2"} classes={"card-title"}>
                            {review.game_name}
                          </Title>
                          <Paragraph>{review.description}</Paragraph>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          </div>
        </Article>
      </Section>
    </>
  );
};

export default ProfileView;
