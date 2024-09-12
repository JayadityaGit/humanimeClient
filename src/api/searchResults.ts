
async function getSearchResults(animeToSearch: string){
    const animeUrl = import.meta.env.VITE_ANIME_URL
    try {

        if(!animeToSearch){
            throw Error("Please provide anime name")
        }
        const response = await fetch(animeUrl+"/search?q="+animeToSearch);
        const data = await response.json();

        return data.animes;

    } catch (error) {
        console.error(error)
    }
    
}


export default getSearchResults;