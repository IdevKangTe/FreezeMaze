import * as THREE from 'three';
export default class Sound {
  audioLoader = new THREE.AudioLoader();
  footstep;
  breath;
  heartbeat;

  monsterBGM;
  suspense;
  monsterScream;

  itemNotification;

  isBGMPlaying;

  constructor(player) {
    this.footstep = this.initFootstep(player.listner);
    this.breath = this.initBreath(player.listner);
    this.heartbeat = this.initHeartbeat(player.listner);
    this.monsterBGM = this.initMonsterBGM(player.listner);
    this.itemNotification = this.initItemNotification(player.listner);
    this.suspense = this.initSuspense(player.listner);
    this.monsterScream = this.initMonsterScream(player.listner);

    this.isBGMPlaying = false;
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

  initSuspense(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load('sound/game/suspense_hard.wav', function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(1.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel('linear');
    });
    return audio;
  }

  initMonsterScream(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      'sound/monster/monster_chase-start.wav',
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
        audio.setRefDistance(0.5);
        audio.setDistanceModel('linear');
      }
    );
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
    camera.add(this.suspense);
    return camera;
  }

  loadMonsterSound(monster) {
    monster.add(this.monsterBGM);
    monster.add(this.monsterScream);
    return monster;
  }

  loadItemSound(item) {
    item.add(this.itemNotification);
    return item;
  }

  musicPlay() {
    if (this.isBGMPlaying) {
      return;
    }
    this.monsterBGM.play(); // 오디오를 재생합니다.
    this.itemNotification.play();
    this.heartbeat.play();
    this.isBGMPlaying = true;
  }

  run() {
    this.footstep.setVolume(1);
    this.footstep.setPlaybackRate(2);
  }

  notRun() {
    this.footstep.setVolume(0.3);
    this.footstep.setPlaybackRate(1.2);
  }

  chase() {
    this.suspense.play();
    this.monsterScream.play();
    this.heartbeat.setVolume(1.5);
    this.heartbeat.setPlaybackRate(1.5);
  }

  notChase() {
    this.suspense.pause();
    this.heartbeat.setVolume(1);
    this.heartbeat.setPlaybackRate(1.5);
  }

  staminaout() {
    if (!this.breath.isPlaying) {
      this.breath.play(); // 숨소리 재생
    }
  }

  footstepSoundPlay() {
    if (!this.footstep.isPlaying) {
      this.footstep.play();
    }
  }

  update(player, monster, item) {
    // let camera = new THREE.Vector3();
    // let item = new TH
    
    if (player.isMoving || player.isRotating) {
      this.footstepSoundPlay();
    } else {
      this.footstep.pause();
    }
    if (player.isRunning) {
      this.run();
    } else {
      this.notRun();
    }

    let itemDiff = item.mini.position.distanceTo(player.camera.position);
    this.itemNotification.setVolume(
      1 / itemDiff < 0.1 ? 0 : 1 / itemDiff > 0.8 ? 0.8 : 1 / itemDiff
    );
  }

  pause() {
    this.footstep.pause();
    this.breath.pause();
    this.heartbeat.pause();
    this.monsterBGM.pause();
    this.itemNotification.pause();
    this.suspense.pause();
    this.monsterScream.pause();
  }
}
