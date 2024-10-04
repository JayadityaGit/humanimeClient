import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import getAnimeEpisodes from "@/api/getEpisodes";
import ButtonType from "@/types/ButtonType";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { MediaPlayer, MediaProvider, Track } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import getServers from '@/api/getServers';
import { mainServer, miniServer } from '@/types/serversType';
import getStreams from '@/api/getStreams';
import streamType from '@/types/streamType';
import { trackType } from '@/types/trackType';


const Streaming = () => {

  const location = useLocation();

  const navigate = useNavigate();

  

  const [episodes, setEpisodes] = useState<ButtonType[]>([])
  const [episodeId, setEpisodeId] = useState("")

  
  const [sub, setSub] = useState<miniServer[]>([]);
  const [dub, setDub] = useState<miniServer[]>([]);


  const [sources, setSources] = useState<streamType[]>([])
  const [tracks, setTracks] = useState<trackType[]>([])

  const [clickedSubServerButton, setClickedSubServerButton] = useState("")

  const [clickedDubServerButton, setClickedDubServerButton] = useState("")

  async function fetchServers(epId:string) {
    try {

      setSub([]);
      setDub([])

      const response: mainServer = await getServers(epId);

      setEpisodeId(epId)

      if(response.sub.length > 0){
        setSub(response.sub);
      }

      if(response.dub.length > 0){
         setDub(response.dub)
      }
      

    } catch (error) {
      
    }
  }



  useEffect(() => {
    const aId = location.state;

    if(!aId){
      navigate("/search")
      return;
    }


      async function fetchEpisodes() {
        const results = await getAnimeEpisodes(aId);
  
        setEpisodes(results.episodes)
        

      }
  
      fetchEpisodes()
  }, [])
  

  async function fetchStreams(episodeId: string, servername: string, category: string) {

    try {
      const response = await getStreams(episodeId, servername, category);

      if(!response || !response.sources || !response.tracks){
        alert("Stream not available. Please try another server.");
        return;
      }

      setSources(response.sources)
      setTracks(response.tracks)
    } catch (error) {
      console.error(error)
    }
   



    
    
  }
  

  return (
    <div className='streaming p-5 grid grid-cols-1 gap-y-11 lg:grid-cols-2 items-start lg:p-10 lg:gap-x-4 dark:bg-black dark:text-white min-h-screen'>

      <div className='playerlayout grid grid-cols-1 gap-y-6'>

      
      <MediaPlayer title="Sprite Fight" src={sources.length == 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : sources[0].url}>
        <MediaProvider />
        {
        tracks.length > 0 &&
        tracks.map((track)=>{
           return(
            <Track
            src={track.file}
            kind='subtitles'
            label={track.label != null ? track.label : ""}
            type="vtt"
            default
         />
           )
        })
        }
        <PlyrLayout  icons={plyrLayoutIcons} />
      </MediaPlayer>

     

      <div className='server grid grid-cols-1 gap-y-3 '>
          <div className='subservers flex space-x-3 items-center'>
             <div>
               Sub
             </div>

             <div className='actualSubButtons flex space-x-2'>
                 {
                  sub.length !==0 ? sub.map((value)=>{
                    return(
                      <button className={clickedSubServerButton==value.serverName?'border px-2 py-1 rounded-md text-sm bg-lime-300 dark:text-black':'border px-2 py-1 rounded-md text-sm'} onClick={
                        async()=>{
                          await fetchStreams(episodeId, value.serverName, "sub"); 
                          setClickedSubServerButton(value.serverName); 
                          setClickedDubServerButton("")
                        }} key={value.serverId}>{value.serverName}</button>
                    )
                  })

                  :

                  <p className=''>click an episode and the server button to stop getting rickrolled.</p>
                 }
             </div>

          </div>

          <div className='dubservers flex space-x-3 items-center'>
              <div>
                 Dub
              </div>

              <div className='actualDubButtons flex space-x-2'>
                  {
                   dub.length !== 0 ?  dub.map((value)=>{
                      return(
                        <button className={clickedDubServerButton==value.serverName?'border px-2 py-1 rounded-md text-sm bg-lime-300 dark:text-black':'border px-2 py-1 rounded-md text-sm'} onClick={
                          async()=>{
                            await fetchStreams(episodeId, value.serverName, "dub"); 
                            setClickedDubServerButton(value.serverName); 
                            setClickedSubServerButton("")
                          }} key={value.serverId}>{value.serverName}</button>
                      )
                    })

                    :

                    <p>kidnap the voice actors now !</p>
                  }
              </div>
          </div>
      </div>

      </div>


      
      
      <div className='buttons grid grid-cols-5 gap-2 md:grid-cols-7 '>
      {episodes.map((ep, index)=>{
          return(
            <button className={ep.episodeId == episodeId?'border py-1 bg-lime-300 dark:text-black':'border-solid border-2 py-1 rounded-lg'} onClick={
              async()=>{

                await fetchServers(ep.episodeId); 
                setEpisodeId(ep.episodeId); 
                setClickedDubServerButton(""); 
                setClickedSubServerButton(""); 
              }} key={index}>{ep.number}</button>
          )
       })}
       </div>
    
    
    </div>
  )
}

export default Streaming