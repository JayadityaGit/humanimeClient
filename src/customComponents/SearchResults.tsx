import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Film, Star, Tv, Watch } from "lucide-react"
import resultsType from "@/types/searchResultsType"
import WatchComponent from "./Watch"
import { useState } from "react"




interface SearchResultsProps {
  results: resultsType[]
}

export default function SearchResults({ results }: SearchResultsProps) {

  const [open, setOpen] = useState(false);

  const [presentAnimeId, setAnimeId] = useState<string >("");


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {results.map((result) => (
        <Card onClick={()=>{setOpen(true); setAnimeId(result.id)}} key={result.id} className="flex flex-col h-full">
          <CardHeader className="p-0">
            <div className="relative aspect-[3/4] w-full">
              <img
               src={result.poster}
               alt={result.name}
               className="rounded-t-lg object-cover w-full h-full"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow p-4">
            <CardTitle className="text-lg font-bold mb-2">{result.name}</CardTitle>
            <p className="text-sm text-muted-foreground mb-2">{result.jname}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                {result.type === "TV" ? (
                  <Tv className="w-3 h-3" />
                ) : result.type === "Movie" ? (
                  <Film className="w-3 h-3" />
                ) : (
                  <Star className="w-3 h-3" />
                )}
                {result.type}
              </Badge>
              {result.rating && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="w-3 h-3" />
                  {result.rating}
                </Badge>
              )}
              <Badge variant="secondary" className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {result.duration}
              </Badge>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="flex justify-between w-full text-sm">
              <span>Sub: {result.episodes.sub ?? "N/A"}</span>
              <span>Dub: {result.episodes.dub ?? "N/A"}</span>
            </div>
          </CardFooter>
        </Card>
      ))}

      <WatchComponent isOpen={open} onClose={()=>{setOpen(false)}} animeId={presentAnimeId}/>
    </div>
  )
}