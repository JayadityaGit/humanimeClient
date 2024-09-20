

export default async function getStreams(episodeId: string, serverName: string) {

    const url = import.meta.env.VITE_ANIME_URL
    
    try {
        
        if(!episodeId){
            throw Error("waiting for the episodeId")
        }

        const response = await fetch(url+"/episode-srcs?id="+episodeId+"&category=dub"+"&server="+serverName)

      
        const data = await response.json();

        console.log(data)

        return data;
        
    } catch (error) {
       console.error()
    }
}