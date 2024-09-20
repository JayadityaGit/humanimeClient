import { Button } from "@/components/ui/button"
import ButtonType from "@/types/ButtonType"
import getStreams from "@/api/getStreams"
import streamType from "@/types/streamType"
import getServers from "@/api/getServers"


interface EpisodeButtonsProps{
    buttons: ButtonType[],
    streamSet: (data: streamType[])=>void,
   
}

const EpisodeButtons = ({buttons, streamSet}: EpisodeButtonsProps) => {

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
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2 text-white">
        {
            buttons.map((value, index)=>{
                return(
                    <Button onClick={async()=>{fetchServers(value.episodeId)}} className={value.isFiller ? "bg-red-300": ""} key={index}>{value.number}</Button>
                )
            })
        }
    </div>
  )
}

export default EpisodeButtons