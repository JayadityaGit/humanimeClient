import resultsType from "@/types/searchResultsType"
import { useNavigate } from "react-router-dom"

interface SearchResultsProps {
  results: resultsType[]
}

export default function SearchResults({ results }: SearchResultsProps) {

  const Navigate = useNavigate();




  return (
<div className="grid items-start grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">

{results.map((result) => (
  <div 
    className="border-solid border-2 border-black rounded-xl dark:border-white" 
    onClick={() => { Navigate("/stream", {state: result.id}) }} 
    key={result.id}
  >
    <div className="image">
      <img 
        className="rounded-t-md w-full h-48 object-cover lg:h-60"  // Ensure all images have the same size and maintain aspect ratio
        src={result.poster} 
        alt="poster" 
      />
    </div>

    <div className="px-3 py-2">
      <p className="text-xs truncate max-w-full" title={result.name}> 
        {result.name}
      </p>
    </div>

  </div>
))}

</div>

  )
}


