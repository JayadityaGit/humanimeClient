interface resultsType{
    id: string | null,
    name: string | null,
    jname: string | null,
    poster: string | null,
    duration: string | null,
    type: string | null,
    rating: string | null,
    episodes: {
      sub: string | null,
      dub: string | null,
    }
  }

  export default resultsType;