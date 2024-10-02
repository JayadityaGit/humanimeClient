'use client'

import SearchResults from "@/customComponents/SearchResults";
import resultsType from "@/types/searchResultsType";
import { useState } from "react"
import { Input } from "@/components/ui/input";

export default function Searching() {
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
         setAnimeToSearch("")
        
      } catch (error) {
        console.error(error)
      }
  }

  return (
     <div className="p-6 space-y-6 lg:p-16">

      <div className="space-y-5">

        <div className="title text-center">
         <p className="text-2xl font-extrabold md:text-3xl lg:text-4xl">humanime.in</p>
        </div>

        <div className="input-box flex items-center justify-center ">
        
            <Input
              type="text"
              placeholder="Search for anime"
              className="rounded-r-none border-solid w-72"
              onChange={(e) => setAnimeToSearch(e.target.value)}
              value={animeToSearch}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch()
              }}
            />
            <button   onClick={handleSearch} className=" px-2 py-2 rounded-r-md text-sm bg-lime-300 font-semibold">
              search
            </button>

          </div>

          </div>

          <div>

          <SearchResults results={animeResults} />

          </div>

        </div>

  )
}