
export default async function getServers(epId: string) {
    try {

        const url = import.meta.env.VITE_ANIME_URL;

        const response = await fetch(url+"/servers?episodeId="+epId);

        if (!response.ok) {
            throw new Error(`Failed to fetch servers: ${response.status} ${response.statusText}`);
          }

        const data = await response.json();

        return data;
        
    } catch (error) {
        console.error("Error in getServers:", error);
        // Throw the error to be caught by the calling function
        throw error;
    }
}