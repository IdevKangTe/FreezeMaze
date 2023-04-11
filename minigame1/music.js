// mini1Canvas의 UI중 네번째 (4/4)

export default
class Music{
    #audio;
    #isBgmPlay
    
    constructor(a="bgm_basic.wav", b=1){
    this.#audio = new Audio(a);  
    this.#audio.volume = b;

    this.#isBgmPlay = false;
    }




    playMusic(){
        this.#audio.play();
    }

    playBgmMusic(){

        if(!this.#isBgmPlay){
            const bgmAudio = new Audio();
            bgmAudio.play();
            bgmAudio.volume = 0.35;
            this.#isBgmPlay = true;
        }

    }

}