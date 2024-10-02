export interface miniServer {
    serverId: number;
    serverName: string;
  }
  
  // Define the main episode structure
 export interface mainServer{
    episodeId: string;
    episodeNo: number;
    sub: miniServer[]; // List of servers for subtitled version
    dub: miniServer[]; // List of servers for dubbed version
    raw: miniServer[]; // List of servers for raw version
  }