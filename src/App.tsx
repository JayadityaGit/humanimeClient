'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import SearchResults from "./customComponents/SearchResults"
import resultsType from "./types/searchResultsType"



export default function AnimeStreaming() {
  const [animeToSearch, setAnimeToSearch] = useState("")

  const [animeResults, setAnimeResults] = useState<resultsType[]>([]);
 

  const handleSearch = async () => {
      try {

        if(!animeToSearch){
          throw Error("please provide an anime name")
        }

         const results = await fetch(import.meta.env.VITE_ANIME_URL+"/search?q="+animeToSearch, {method: "GET"});

        

         const data = await results.json();

         if (!data || !data.animes || data.animes.length === 0) {
          alert(
            "Try giving a space, use a Japanese name, or the anime might not exist in the current servers."
          );
          return;
        }
         setAnimeResults(data.animes)
        
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-pink-300">Humanime</h1>
        <div className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              placeholder="Search for anime"
              className="flex-grow px-4 py-2 rounded-l-lg bg-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-pink-300"
              onChange={(e) => setAnimeToSearch(e.target.value)}
              value={animeToSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
            />
            <Button  onClick={handleSearch} className="rounded-l-none ">
              Search
            </Button>
          </div>
        </div>
        <SearchResults results={animeResults} />
      </div>
    </div>
  )
}