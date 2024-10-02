

export default async function getStreams(episodeId: string, serverName: string, category: string) {

    const url = import.meta.env.VITE_ANIME_URL
    
    try {
        
        if(!episodeId){
            throw Error("waiting for the episodeId")
        }

        const response = await fetch(url+"/episode-srcs?id="+episodeId+"&category="+category+"&server="+serverName)
        

      
        const data = await response.json();

        return data;
        
    } catch (error) {
       console.error()
    }
}