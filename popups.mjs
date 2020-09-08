import { config } from "process";

//Configuration object for non-object relying purposes
const configMessages = {
  color: "4335dd",
  author: "by : yosh#1234",
  thumbnail: "https://i.redd.it/pz2riusi3cc51.jpg",
  sideimg:
    "https://i.pinimg.com/736x/15/80/d4/1580d4fbb55c8d6329c836201d90f95c.jpg",
  footer: "Made with Jinkan & Discord api",
};

//Object for various messages relating to the help embed fields
export const popMessages = {
  helpError: "Please try !help for a list of commands ( case sensitive ) ",
  helpErrorimg: "https://image.flaticon.com/icons/png/128/753/753345.png",
  image:
    "https://vignette.wikia.nocookie.net/youkoso-jitsuryoku-shijou-shugi-no-kyoushitsu-e/images/b/bf/Episode_012-07.jpg/revision/latest/scale-to-width-down/340?cb=20170928143111",
  description:
    "Below are a list of various commands that can be used to find certain animes standalone, or with their respective genres",
  colour: configMessages.color,
  author: configMessages.author,
  title: "Yoshi bot, Commands to be used",
  thumbnail: configMessages.thumbnail,
  sideimg: configMessages.sideimg,
  footer: configMessages.footer,
};

//Object related to the embed message fields
export const embedMessages = {
  embedHelp:
    "This command will display an embed of all commands availible to use",
  embedViewgs:
    "This command will allow you to view the most popular genres of anime",
  embedViewg:
    "This command will allow you to view the animes at that specific genre ( from the list availible ). ex: $view genre romance",
  embedViewa:
    "This command will allow you to view details on a specific anime. ex: $view naruto",
};

export const popularGenre = [
  "Action", //Remember this will be the first id in the api
  "Adventure",
  "Comedy",
  "Drama",
  "Historical",
  "Romance",
  "School",
  "Sci-Fi",
  "Shounen",
  "Slice of Life",
  "Supernatural",
  "Psychological",
  "Thriller",
  "Seinen",
];

export const GenreIDS = [1, 2, 4, 8, 13, 22, 23, 24, 27, 36, 37, 40, 41, 42];

export const GenreMessages = {
  title: "Most Popular Genres of Anime",
  image:
    "https://ahneemeh.files.wordpress.com/2018/07/3235211-9159803285-ivw5x.jpg?w=589&h=335",
  author: configMessages.author,
  color: configMessages.color,
  thumbnail: configMessages.thumbnail,
  sideimg: configMessages.sideimg,
  description:
    "Below are the most popular genres of animes according to myanimelist.com which displays anime based on number of searched and ratings",
  footer: configMessages.footer,
};

export const animeList = {
  image:
    "https://cdn.playbuzz.com/cdn/756634d9-12bf-4f1c-b1a2-1dc02efdda49/f1122f16-e1e1-4574-88d3-ba08930ea2d8_560_420.jpg",
  author: configMessages.author,
  color: configMessages.color,
  thumbnail: configMessages.thumbnail,
  sideimg: configMessages.sideimg,
  description:
    "Below are the most popular animes by ratings for the genre you have selected, surely you won't be disappointed",
  footer: configMessages.footer,
};

export const oneAnime = {
  image: configMessages.image,
  author: configMessages.author,
  color: configMessages.color,
  thumbnail: configMessages.thumbnail,
  sideimg: configMessages.sideimg,
  footer: configMessages.footer,
};
