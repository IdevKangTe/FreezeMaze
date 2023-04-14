// inOutroCanvas의 UI중 세번째 (3/3)

export default
class Music{
    #audio;
    
    constructor(a, b){
    this.#audio = new Audio(a);  
    this.#audio.currentTime = b;
    }


    playMusic(){
        this.#audio.play();
    }

    stopMusic() {
        this.#audio.pause();
    }

    volumeDown() {
        this.#audio.volume -= 0.1;
    }

}