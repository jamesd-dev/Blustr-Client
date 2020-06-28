import React from "react";
import axios from "axios";
import config from "../../config";

export default function LoremSeed() {
  console.log("Starting Lorem Seed...");
  console.log("Creating user...");

  let seedImages = [
    "https://images.unsplash.com/photo-1514866546504-0c2bbda5f16d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1510191250627-6fdf443cfec4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1554174532-48b37f80a254?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1530800633399-2d35227b35b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1512237260610-23782f4c1bfe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1572989753782-accb88ad01f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
  ]

  axios
    .post(
      `${config.API_URL}/signup`,
      {
        username: "Nettle",
        email: "nettle@gmail.com",
        password: "bhjb5jb23iu5b34iuh53hbubi3iu4&(YGJH",
      },
      { withCredentials: true }
    )
    .then((user) => {
      console.log("Successfully created user: ", user.data.username);

      let seedContent = [
        "Banh mi XOXO salvia tumblr, fixie mixtape lomo af wolf offal flannel sartorial pabst shabby chic. Cray cardigan cold-pressed man bun, pok pok biodiesel prism distillery irony gastropub photo booth. Fashion axe lyft wayfarers truffaut asymmetrical put a bird on it pug distillery authentic ugh. Vice heirloom hell of fixie church-key, drinking vinegar twee tousled four dollar toast lomo fanny pack gluten-free sustainable sriracha. Enamel pin plaid meggings activated charcoal flexitarian. Glossier photo booth enamel pin wolf adaptogen. Offal hashtag knausgaard, master cleanse distillery occupy iPhone XOXO microdosing enamel pin taxidermy. Chia 90's adaptogen distillery, kickstarter hoodie tacos mixtape shoreditch stumptown iceland jean shorts. Gochujang fingerstache raclette bespoke. Retro tbh scenester keytar.",
      ];

      for (let i = 0; i < 1000; i++) {
        let content = [...seedContent];
        let coverImage = content.find((elem) => {
          return /(http(s?):)/.test(elem);
        });

        if (!coverImage)
          content.unshift(
            seedImages[
              Math.floor(Math.random() * seedImages.length)
            ]
          );

        // create story on database
        axios
          .post(
            `${config.API_URL}/story/create`,
            { content },
            { withCredentials: true }
          )
          .then(() => {
            console.log("created seed post");
          })
          .catch((err) => {
            console.log("failed to create seed post");
            console.log("error: ", err);
          })
      }
    })
    .catch(() => {
      console.log("Failed to create user");
    });

  console.log("Ending Lorem Seed");

  return <></>;
}
