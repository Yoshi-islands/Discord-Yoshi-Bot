//Imports
import {
  //Object and configuration export
  popMessages,
  embedMessages,
  popularGenre,
  GenreMessages,
  GenreIDS,
  animeList,
  oneAnime,
} from "./popups.mjs";
import Discord from "discord.js";
import fileURLToPath from "url";
import genreSearch from "./searchGenre.mjs";
import animeSearch from "./searchAnime.mjs";
import identity from "./identification.mjs";

//Discord api
const client = new Discord.Client();

/*MAIN CONTROLLER*/

//Checking if the bot has received any messages, with the message event
client.on("message", (receivedMessage) => {
  if (receivedMessage.author === client.user) {
    //preventing bot from responding to its own messages

    return;
  }

  if (receivedMessage.content.startsWith("$")) {
    handleCommand(receivedMessage); //sending the full command
  }
});

/*COMMAND HANDLER*/

function handleCommand(receivedMessage) {
  /*Ex : 
         input : !view genres
         normal command = view genres
         main command = view
         primary arg = genres
 */

  let normalCommand = receivedMessage.content.substr(1);
  let splitCommand = normalCommand.split(" ");
  let mainCommand = splitCommand[0];

  let primaryArgument = splitCommand.slice(1); //Will not be utilized for the help command

  if (primaryArgument.length > 2) {
    let newPrimary = primaryArgument.slice(1); //Creare a copy of the array before ( genres, genre, and anime)
    const multiString = newPrimary.join(" "); //Need to include space
    primaryArgument.splice(1); //Remove everything other than 0th index ( command )
    primaryArgument[1] = multiString;
  }

  //Handle everything in lower case
  mainCommand = mainCommand.toLowerCase();

  /*
  console.log(`Command received: ${mainCommand}`);
  console.log(`arguments: ${primaryArgument}`);
  console.log(`normal command ${normalCommand}`);
  console.log(`message received ${receivedMessage}`);
  */

  //help command
  if (mainCommand === "help") {
    helpCommand(receivedMessage);
  }
  //view command controller
  else if (mainCommand === "view") {
    viewCommand(receivedMessage, primaryArgument);
  } else {
    embedError(receivedMessage);
  }
}

/*POPUP CONTROLLER*/

//Function for creating embed errors
function embedError(receivedMessage) {
  //Create embed and send the error message
  const errorEmbed = new Discord.MessageEmbed()
    .setTitle("Sorry, that's invalid!")
    .setDescription(popMessages.helpError)
    .setThumbnail(popMessages.helpErrorimg)
    .setColor("#f81c24 ");

  receivedMessage.channel.send(errorEmbed);
}

//Function will compute the arguments of the view command
function viewCommand(receivedMessage, primaryArgument) {
  if (primaryArgument[0] === "genres" && primaryArgument.length === 1) {
    viewGenres(receivedMessage);
  } else if (
    primaryArgument[0] === "genre" &&
    popularGenre.includes(primaryArgument[1]) //if it exists within the genre array ( case sensi-tive )
  ) {
    viewSingleGenre(receivedMessage, primaryArgument);
  } else if (primaryArgument[0] === "anime") {
    viewAnime(receivedMessage, primaryArgument);
  } else {
    embedError(receivedMessage);
  }
}

//Function will compute first api call for a specific genre of anime ( list )
async function viewSingleGenre(receivedMessage, primaryArgument) {
  //Get the anime genre id
  const GenreIndex = popularGenre.indexOf(primaryArgument[1]);
  const GenreID = GenreIDS[GenreIndex];

  try {
    const genreResult = await genreSearch(receivedMessage, GenreID);

    //try scope code
    //Embed to display the anime list
    const animes = new Discord.MessageEmbed(animeList);
    animes.setTitle(
      `Most popular anime for the ${popularGenre[GenreIndex]} genre`
    );
    animes.setImage(animeList.image);
    animes.setThumbnail(animeList.thumbnail);
    animes.setFooter(animeList.footer, animeList.sideimg);
    animes.setTimestamp();

    for (let i = 0; i < genreResult.data.results.length; i++) {
      animes.addFields({
        name: `${i + 1}.${genreResult.data.results[i].title}`,
        value: `score: ${genreResult.data.results[i].score}/10`,
      });
    }

    receivedMessage.channel.send(animes);
  } catch (error) {
    receivedMessage.channel.send("Something went wrong");
  }
}

//This function will compute information for a single anime
async function viewAnime(receivedMessage, primaryArgument) {
  const animeQuery = primaryArgument[1]; //name of the anime
  console.log(animeQuery);

  try {
    //Get api information and parse embed
    const animeResults = await animeSearch(receivedMessage, animeQuery);

    const singleAnime = new Discord.MessageEmbed(oneAnime);
    singleAnime.setTitle(`Anime search: ${animeQuery}`);
    singleAnime.setImage(oneAnime.image);
    singleAnime.setThumbnail(oneAnime.thumbnail);
    singleAnime.setFooter(oneAnime.footer, oneAnime.sideimg);
    singleAnime.setTimestamp();

    //Populate the fields
    for (let i = 0; i < 5; i++) {
      singleAnime.addFields({
        name: `${i + 1}.${animeResults.data.results[i].title}`,
        value: `score: ${animeResults.data.results[i].score}/10, episodes: ${animeResults.data.results[i].episodes}, type: ${animeResults.data.results[i].type}, plot: ${animeResults.data.results[i].synopsis} `,
      });
    }

    receivedMessage.channel.send(singleAnime);
  } catch (error) {
    receivedMessage.channel.send(
      "Something went wrong with the database ( or invalid search )"
    );
  }
}

function viewGenres(receivedMessage) {
  //Create an embed for the genre display
  const GenresEmbed = new Discord.MessageEmbed(GenreMessages);

  //Parameters that need to be secluded from the object
  GenresEmbed.setAuthor(GenreMessages.author, GenreMessages.sideimg);
  GenresEmbed.setImage(GenreMessages.image);
  GenresEmbed.setThumbnail(GenreMessages.thumbnail);
  GenresEmbed.setFooter(GenreMessages.footer, GenreMessages.sideimg);
  GenresEmbed.setTimestamp();

  //iterate and print out the genres
  for (let i = 0; i < popularGenre.length; i++) {
    GenresEmbed.addFields({
      name: popularGenre[i],
      value: "\u200b", //Creates a blank field
      inline: true,
    });
  }

  receivedMessage.channel.send(GenresEmbed);
}

//Function will show am embed for the help command
function helpCommand(receivedMessage) {
  const helpEmbed = new Discord.MessageEmbed(popMessages);

  helpEmbed.setAuthor(popMessages.author, popMessages.sideimg);
  helpEmbed.setImage(popMessages.image);
  helpEmbed.setThumbnail(popMessages.thumbnail);
  helpEmbed.setFooter(popMessages.footer, popMessages.sideimg);
  helpEmbed.setTimestamp();
  helpEmbed.addFields(
    {
      name: "$help",
      value: embedMessages.embedHelp,
    },
    {
      name: "$view genres",
      value: embedMessages.embedViewgs,
    },
    {
      name: "$view genre [genre] ",
      value: embedMessages.embedViewg,
    },
    {
      name: "$view anime [anime]",
      value: embedMessages.embedViewa,
    }
  );

  //Send this embed to the received message channel
  receivedMessage.channel.send(helpEmbed);
}

client.login(identity.token);
