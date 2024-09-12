import resultsType from "../types/searchResultsType"

interface SearchResultsProps{
  results: resultsType[]
}

const SearchResults: React.FC<SearchResultsProps> = ({results}) => {
  return (
    <div>{JSON.stringify(results)}</div>
  )
}

export default SearchResults