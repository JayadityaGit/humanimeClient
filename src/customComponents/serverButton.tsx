import getStreams from "@/api/getStreams"
import { Button } from "@/components/ui/button"
import streamType from "@/types/streamType"

interface dubsType{
    serverName: string,
    serverId: number
}

interface serverButtonProps{
    dubs: dubsType[],
    epId: string,
    streamSetter:(stream:streamType[])=>void
}

const ServerButton = ({dubs, epId, streamSetter}: serverButtonProps) => {

    async function fetchStreams(servername: string, epId: string) {
        try {
          const data = await getStreams(epId, servername)

          if (!data || !data.sources) {
            alert("Stream not available. Please try another server.");
            return;
          }

          streamSetter(data.sources)

        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
      {
        dubs.map((value)=>{
            return(
                <Button key={value.serverId} onClick={async()=>{await fetchStreams(value.serverName, epId)}}>{value.serverName}</Button>
            )
        })
      }
    </div>
  )
}

export default ServerButton