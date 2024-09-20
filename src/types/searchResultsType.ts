interface resultsType{
    id: string,
    name: string ,
    jname: string ,
    poster: string ,
    duration: string,
    type: string ,
    rating: string ,
    episodes: {
      sub: string ,
      dub: string ,
    }
  }

  export default resultsType;