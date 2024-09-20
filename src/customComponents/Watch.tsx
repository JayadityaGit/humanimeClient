
import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import getAnimeEpisodes from "@/api/getEpisodes"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sheet,
    SheetTitle,
    SheetContent,
    SheetDescription,
  } from "@/components/ui/sheet"


import ButtonType from "@/types/ButtonType"
import { useEffect, useState } from "react"

import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import streamType from '@/types/streamType';
import getServers from '@/api/getServers';
import ServerButton from './serverButton';


// Base styles for media player and provider (~400B).



  interface WatchComponentProps{
    isOpen: boolean,
    onClose: ()=>void,
    animeId: string,
  }


   
const WatchComponent = ({isOpen, onClose, animeId}: WatchComponentProps) => {

  const[buttons, setButtons] = useState<ButtonType[]>([])

  const[streams, setStreams] = useState<streamType[]>([])

  const[dubServers, setDubServers] = useState([])

  const [presentEpId, setPresentEpId] = useState("");


  async function fetchDubServers(epId: string) {
     try {

      const data = await getServers(epId);

      if (!data || !data.dub) {
        alert("maybe the dub is not available for this ep, i am working on the sub feature thanks senpai!");
        return;
      }

      setDubServers(data.dub)
      
      setPresentEpId(epId)

      
     } catch (error) {
      console.error("Error fetching dub servers:", error);
      alert("An error occurred while fetching servers. Please try again later.");
     }
  }
  

  useEffect(()=>{
     
    async function renderButtons() {
      try {
       const buttonsData = await getAnimeEpisodes(animeId)

       setButtons(buttonsData.episodes)
      } catch (error) {
        console.error(error)
      }
    }


    renderButtons()


  }, [animeId])
  

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      
    <SheetContent side="bottom" className="h-[80vh] sm:h-[90vh]">
    <SheetTitle >Click the episode button and then the server button of your choice, otherwise old ep or even old anime will play</SheetTitle>
      <SheetDescription>
        {dubServers.length===0? "there seem to be no dub server for this ep":<ServerButton dubs={dubServers} epId={presentEpId} streamSetter={(stream)=>{setStreams(stream)}}/>}
      </SheetDescription>
      <div className="mt-4 h-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-2/3 aspect-video bg-muted rounded-lg mb-4 lg:mb-0 lg:mr-4">
          {/* Player placeholder */}
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <MediaPlayer title="Sprite Fight" src={streams.length===0? "https://youtu.be/dQw4w9WgXcQ?si=_Ue6va9U3DbOjPe5": streams[0].url}>
            <MediaProvider />
            <PlyrLayout  icons={plyrLayoutIcons} />
          </MediaPlayer>
          </div>
        </div>
    <div className="w-full h-[300px] md:h-[400px] lg:h-[500px] lg:w-1/3 flex flex-col p-4 border rounded-lg shadow-sm text-white">
      <h2 className="text-lg font-semibold mb-2">Episodes</h2>
      <ScrollArea className="flex-grow">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-2">
          {buttons.map((value, index) => (
            <Button onClick={()=>{fetchDubServers(value.episodeId);  setDubServers([])}} key={index} variant="outline" className="w-full">
              {value.number}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
      </div>
    </SheetContent>
  </Sheet>
  )
}

export default WatchComponent



