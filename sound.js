import * as THREE from 'three';
export default class Sound {
  audioLoader = new THREE.AudioLoader();
  footstep;
  breath;
  heartbeat;

  monsterBGM;
  itemNotification;

  constructor(player) {
    this.footstep = this.initFootstep(player.listner);
    this.breath = this.initBreath(player.listner);
    this.heartbeat = this.initHeartbeat(player.listner);
    this.monsterBGM = this.initMonsterBGM(player.listner);
    this.itemNotification = this.initItemNotification(player.listner);
  }

  initFootstep(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load('sound/player/footstep.wav', function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(0.3); // 오디오 볼륨을 조절합니다.
    });
    return audio;
  }

  initBreath(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load('sound/player/breath.wav', function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(1); // 오디오 볼륨을 조절합니다.
    });
    return audio;
  }

  initHeartbeat(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      'sound/player/heartbeat_normal.wav',
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(1); // 오디오 볼륨을 조절합니다.
      }
    );
    return audio;
  }

  initMonsterBGM(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load('sound/monster/monster-bgm.wav', function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel('linear');
    });
    return audio;
  }

  initItemNotification(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      'sound/item/item_notification01.wav',
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
        audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
        audio.setRefDistance(0.5);
        audio.setDistanceModel('linear');
      }
    );
    return audio;
  }

  loadPlayerSound(camera) {
    camera.add(this.footstep);
    camera.add(this.breath);
    camera.add(this.heartbeat);
    return camera;
  }

  loadMonsterSound(monster) {
    monster.add(this.monsterBGM);
    return monster;
  }

  loadItemSound(item){
    item.add(this.itemNotification);
    return item;
  }

  musicPlay() {
    this.monsterBGM.play(); // 오디오를 재생합니다.
    this.itemNotification.play();
    this.heartbeat.play();
  }

  run(){
    this.footstep.setVolume(1);
    this.footstep.setPlaybackRate(2);
  }

  notRun(){
    this.footstep.setVolume(0.3);
    this.footstep.setPlaybackRate(1.2);
  }

  staminaout(){
    if (!this.breath.isPlaying) {
      this.breath.play(); // 숨소리 재생
    }
  }
}
