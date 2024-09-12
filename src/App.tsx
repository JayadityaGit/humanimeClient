import { useState } from "react"
import getSearchResults from "./api/searchResults"
import SearchResults from "./customComponents/SearchResults";
import resultsType from "./types/searchResultsType";


const App = () => {

  const[animeToSearch, setAnimeToSearch] = useState("");

  const[animeResults, setAnimeResults] = useState<resultsType[]>([]);

  return (
    <div>
      <input 
      
      type="text" 
      placeholder="search for anime" 
      onChange={(e)=>{setAnimeToSearch(e.target.value)}} 
      value={animeToSearch}
      onKeyDown={
        async(e)=>{
          if(e.key === "Enter"){
            
           const animes = await getSearchResults(animeToSearch);

           setAnimeResults(animes)

           setAnimeToSearch("")
          
          }
        
        }}

      />

      <button onClick={
        
        async()=>{ 
        
        const animes = await getSearchResults(animeToSearch)

        setAnimeResults(animes)
        
        setAnimeToSearch("")
        
        }}>search</button>


      <div>
          {animeResults.length==0 ?<h1>Search for anime to get started</h1> : <SearchResults results = {animeResults}/> }
      </div>

    </div>
  )
}

export default App