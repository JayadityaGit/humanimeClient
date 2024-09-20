

async function getAnimeEpisodes(animeID: string){
    const animeUrl = import.meta.env.VITE_ANIME_URL
    try {

        if(!animeID){
            throw Error("Please provide anime name")
        }
        
        const response = await fetch(animeUrl+"/episodes/"+animeID);

        const data = await response.json();

        return data;

    } catch (error) {
        console.error(error)
    }
    
}


export default getAnimeEpisodes;