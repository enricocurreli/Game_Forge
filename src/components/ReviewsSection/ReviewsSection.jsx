/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from "react";
import Section from "../Section/Section";
import Article from "../Section/Article";
import Button from "../Button/Button";
import supabase from "../../database/supabase";
import Paragraph from "../Paragraph/Paragraph";
import Title from "../Title/Title";
import Img from "../Img/Img";

const ReviewsSection = ({ game, profile }) => {
  const [review, setReview] = useState(" ");
  const [reviews, setReviews] = useState();
  const formRef = useRef()
  const imgDefault =
  "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
  const URL_KEY = import.meta.env.VITE_SUPABASE_URL_KEY;


  //! LISTA DI TUTTE LE REVIEWS
  const getReviews = async () => {
    let { data: reviews } = await supabase
      .from("reviews")
      .select("*, profile_username: profiles(username), profile_avatar: profiles(avatar_url)");

    await setReviews(() => reviews);
  };

  useEffect(() => {
    getReviews();
  }, []);

  //! SET DELLA REVIEW
  const handleChange =  (e) => {
   setReview(e.target.value);
   
  };

  const handleClick = async () => {
    await supabase
      .from("reviews")
      .insert([
        {
          profile_id: profile.id,
          game_id: game.id,
          game_name: game.name,
          description: review,
        },
      ])
      .select();
    await getReviews();
    formRef.current.reset();
  };
  

  
  

  return (
    <>
      <Article classes={"mb-14  grid grid-rows-1"}>
        <form className=" gap-5 flex" ref={formRef} >
          <textarea
            className="textarea textarea-lg textarea-accent w-full"
            placeholder="Review the game"
            onChange={handleChange}
          ></textarea>
          <Button classes={"btn-accent text-white h-full"} type={"button"} click={handleClick}>
            Send
          </Button>
        </form>
      </Article>
      {/* LIST */}

      <Article classes={"grid md:grid-cols-4 gap-5 "}>
        {reviews ? (
          reviews.map((review) => {
            return (
              <div
                key={review.id}
                className={game.id == review.game_id ?  "card backdrop-blur-lg bg-accent/40 text-primary-content overflow-auto h-[250px]": " hidden"}
              >
              {
                game.id == review.game_id ?   
                <div className="card-body">
                {

                 review.profile_avatar.avatar_url ? <Img src={`${URL_KEY}/storage/v1/object/public/avatars/${review.profile_avatar.avatar_url}`} classes={"rounded-full w-14"}/> : <Img src={imgDefault} classes={"rounded-full w-14"} />

                }
                
                <Title tag={"h2"} classes={"card-title"}>
                  {review.profile_username.username} :
                </Title>
                <Paragraph>{review.description}</Paragraph>
              </div> 
              :
              null
              }
              </div>
              
            );
          })
        ) : (
          <Paragraph>Nothing reviews to show</Paragraph>
        )}
      </Article>
    </>
  );
};

export default ReviewsSection;
