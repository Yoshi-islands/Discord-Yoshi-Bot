import Discord from "discord.js";
import axios from "axios";

export default async function animeSearch(receivedMessage, animeSearched) {
  //Error handle

  try {
    //Here we will give parameters resulting in a single anime search rather than the genre
    const result = await axios(
      `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?q=${animeSearched}`,
      {
        headers: {
          origin: "null",
        },
      }
    );
    //data.results would be the array within the anime object we are looking for

    return result; //return data since we are not using axios in this case
  } catch (error) {
    receivedMessage.channel.send(
      "Sorry something went wrong connecting to the anime database, or you have an invalid search"
    );
  }
}
