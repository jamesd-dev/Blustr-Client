import React from "react";
import axios from "axios";
import config from "../../config";

export default function LoremSeed() {

    let seedImages = [
        "https://images.unsplash.com/photo-1592931028644-4de74fcb1cae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592999373293-c27500b8c293?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592155296151-947a1b18843c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=60",
        "https://images.unsplash.com/photo-1592858321831-dabeabc2dd65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592966991098-d057fe53ef01?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592989847276-d9d6a8dab73d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592965157589-14fbd8cc1b47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592962999600-5fcb0488ec4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1586283893587-a537c0f2fe70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592854366537-9964ab64ad70?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592817707098-cfa915cd4d79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1592810249740-a434315b5e49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    ];

  console.log("Starting Lorem Seed...");
  console.log("Creating user...");

  axios
    .post(`${config.API_URL}/signup`, {
      username: "Nettle",
      email: "nettle@gmail.com",
      password: "bhjb5jb23iu5b34iuh53hbubi3iu4&(YGJH",
    }, { withCredentials: true})
    .then((user) => {
      console.log("Successfully created user: ", user.data.username);

      let content = [
        "Banh mi XOXO salvia tumblr, fixie mixtape lomo af wolf offal flannel sartorial pabst shabby chic. Cray cardigan cold-pressed man bun, pok pok biodiesel prism distillery irony gastropub photo booth. Fashion axe lyft wayfarers truffaut asymmetrical put a bird on it pug distillery authentic ugh. Vice heirloom hell of fixie church-key, drinking vinegar twee tousled four dollar toast lomo fanny pack gluten-free sustainable sriracha. Enamel pin plaid meggings activated charcoal flexitarian. Glossier photo booth enamel pin wolf adaptogen. Offal hashtag knausgaard, master cleanse distillery occupy iPhone XOXO microdosing enamel pin taxidermy. Chia 90's adaptogen distillery, kickstarter hoodie tacos mixtape shoreditch stumptown iceland jean shorts. Gochujang fingerstache raclette bespoke. Retro tbh scenester keytar.",
      ];

      for (let i = 0; i < 1000; i++) {
        let title = "Lorem Hipsum " + i;
        let coverImg = seedImages[Math.floor(Math.random() * seedImages.length)];

        axios
          .post(`${config.API_URL}/story/create`, {
            title: title,
            content: content,
            coverImg: coverImg,
          }, { withCredentials: true})
          .then(() => {
            console.log("Successfully created seed story ");
          })
          .catch(() => {
            console.log("Failed to create seed story");
          });
      }
    })
    .catch(() => {
      console.log("Failed to create user");
    });

  console.log("Ending Lorem Seed");

  return <></>;
}
