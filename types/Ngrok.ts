class Ngrok {
    static urls: { [key: string]: string } = {
        httpx: "http://localhost:8000",
        asynchttpx: "http://localhost:8000",
        threadhttpx: "http://localhost:8000",
        playwright: "http://localhost:8000",
        playwrighthttpx: "http://localhost:8000",
        selenium: "http://localhost:8000",
        seleniumhttpx: "http://localhost:8000",
      };
  
    static getUrl(key: string): string | undefined {
        return this.urls[key];
    }
  }
  
  export default Ngrok;