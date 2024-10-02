import ButtonType from "@/types/ButtonType"
import streamType from "@/types/streamType"
import getServers from "@/api/getServers"


interface EpisodeButtonsProps{
    buttons: ButtonType[],
    streamSet: (data: streamType[])=>void,
   
}

const EpisodeButtons = ({buttons}: EpisodeButtonsProps) => {

async function fetchServers(epId: string) {
    try {
        const response = await getServers(epId);

        if(!response){
            throw Error("could not fetch any servers on the anime")
        }        
        console.log(response.dub);

    } catch (error) {
        console.error()
    }
}



  return (
    <div className="">
        {
            buttons.map((value, index)=>{
                return(
                    <button onClick={async()=>{await fetchServers(value.episodeId)}} className="" key={index}>{value.number}</button>
                )
            })
        }
    </div>
  )
}

export default EpisodeButtons