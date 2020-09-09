async function genreSearch() {
  //Error handle

  try {
    const result = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.jikan.moe/v3/search/anime?q=Naruto&order_by=score`
    );
    const data = await result.json(); //data.results would be the array within the anime object we are looking for
    console.log(data);
    return data;
  } catch (error) {
    console.log("Sorry something went wrong connecting to the anime database");
  }
}

genreSearch();
