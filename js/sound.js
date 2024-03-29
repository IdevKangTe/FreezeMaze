import * as THREE from "three";
export default class Sound {
  audioLoader = new THREE.AudioLoader();
  footstep;
  breath;
  heartbeat;

  monsterBGM;
  suspense;
  monsterScream;

  itemNotification;
  escapeOpen;
  mini1BG;
  mini2BG;
  miniBG;

  isBGMPlaying;
  isChasePlaying;

  constructor(player) {
    this.footstep = this.initFootstep(player.listner);
    this.breath = this.initBreath(player.listner);
    this.heartbeat = this.initHeartbeat(player.listner);
    this.monsterBGM = this.initMonsterBGM(player.listner);
    this.itemNotification = this.initItemNotification(player.listner);
    this.suspense = this.initSuspense(player.listner);
    this.monsterScream = this.initMonsterScream(player.listner);
    this.escapeOpen = this.initEscapeOpen(player.listner);
    this.miniClear = this.initMiniClear(player.listner);
    this.miniBG = this.initMiniBG(player.listner);
    this.mini1BG = this.initMini1BG(player.listner);
    this.mini2BG = this.initMini2BG(player.listner);

    this.isBGMPlaying = false;
    this.isChasePlaying = false;
  }

  initFootstep(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/player/footstep.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(0.3); // 오디오 볼륨을 조절합니다.
    });
    return audio;
  }

  initBreath(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/player/breath.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(false);
      audio.setVolume(1.7); // 오디오 볼륨을 조절합니다.
    });
    return audio;
  }

  initHeartbeat(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      "sound/player/heartbeat_normal.wav",
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true);
        audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      }
    );
    return audio;
  }

  initMonsterBGM(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/monster/monster-bgm.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel("linear");
    });
    return audio;
  }

  initSuspense(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/game/suspense_hard.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
      audio.setVolume(1.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel("linear");
    });
    return audio;
  }

  initMonsterScream(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      "sound/monster/monster_chase-start.wav",
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
        audio.setRefDistance(0.5);
        audio.setDistanceModel("linear");
      }
    );
    return audio;
  }

  initItemNotification(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      "sound/item/item_notification01.wav",
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
        audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
        audio.setRefDistance(0.5);
        audio.setDistanceModel("linear");
      }
    );
    return audio;
  }

  initEscapeOpen(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/game/escapedoor_open.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel("linear");
    });
    return audio;
  }

  initMiniClear(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/item/mini-clear.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel("linear");
    });
    return audio;
  }

  initMiniBG(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load("sound/item/mini3/bgm_basic.wav", function (buffer) {
      audio.setBuffer(buffer);
      audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
      audio.setRefDistance(0.5);
      audio.setDistanceModel("linear");
    });
    return audio;
  }

  initMini1BG(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      "sound/item/mini1/mini1-conveyorbelt-bgm.mp3",
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setVolume(1); // 오디오 볼륨을 조절합니다.
        audio.setLoop(true);
        audio.setRefDistance(0.5);
        audio.setDistanceModel("linear");
      }
    );
    return audio;
  }

  initMini2BG(listner) {
    const audio = new THREE.PositionalAudio(listner);
    this.audioLoader.load(
      "sound/item/mini2/mini2_electric_base.wav",
      function (buffer) {
        audio.setBuffer(buffer);
        audio.setVolume(1); // 오디오 볼륨을 조절합니다.
        audio.setLoop(true);
        audio.setRefDistance(0.5);
        audio.setDistanceModel("linear");
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
    item.add(this.miniBG);
    item.add(this.mini1BG);
    return item;
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
    if (this.isChasePlaying) {
      return;
    }
    this.isChasePlaying = true;
    this.suspense.play();
    this.monsterScream.play();
    this.heartbeat.setVolume(1);
    this.heartbeat.setPlaybackRate(1.5);
  }

  notChase() {
    this.isChasePlaying = false;
    this.suspense.pause();
    this.heartbeat.setVolume(0.5);
    this.heartbeat.setPlaybackRate(1);
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

  escapeOpenPlay() {
    if (!this.escapeOpen.isPlaying) {
      this.escapeOpen.play();
    }
  }

  miniClearPlay() {
    if (!this.miniClear.isPlaying) {
      this.miniClear.play();
    }
  }

  miniBGPlay() {
    if (!this.miniBG.isPlaying) {
      this.miniBG.play();
    }
  }

  miniBGPause() {
    this.miniBG.pause();
  }

  mini1BGPlay() {
    if (!this.mini1BG.isPlaying) {
      this.mini1BG.play();
    }
  }

  mini1BGPause() {
    this.mini1BG.pause();
  }

  mini2BGPlay() {
    if (!this.mini2BG.isPlaying) {
      this.mini2BG.play();
    }
  }

  mini2BGPause() {
    this.mini2BG.pause();
  }

  itemNotificationPause() {
    this.itemNotification.pause();
  }

  update(player, enemy, item, check) {
    if (player.isMoving || player.isRotating) {
      this.footstepSoundPlay();
    } else {
      this.footstep.pause();
    }

    if (player.stamina <= 0) {
      if (!this.breath.isPlaying) {
        this.breath.play();
      }
    }

    if (player.isRunning) {
      this.run();
    } else {
      this.notRun();
    }

    if (enemy.isNearDistance) {
      this.chase();
    } else {
      this.notChase();
    }

    if (!check) {
      let itemDiff = item.mini.position.distanceTo(player.camera.position);
      this.itemNotification.setVolume(
        1 / itemDiff < 0.1 ? 0 : 1 / itemDiff > 0.8 ? 0.8 : 1 / itemDiff
      );
    } else {
      this.itemNotification.setVolume(0);
    }

    let MonsterDiff = enemy.monster.position.distanceTo(player.camera.position);
    this.monsterBGM.setVolume(1 / MonsterDiff < 0.07 ? 0 : 1 / MonsterDiff);
  }

  musicPlay() {
    if (this.isBGMPlaying) {
      return;
    }
    if (this.isChasePlaying) {
      this.suspense.play();
      this.isChasePlaying = false;
    }
    this.monsterBGM.play();
    this.itemNotification.play();
    this.heartbeat.play();
    this.isBGMPlaying = true;
  }

  pause() {
    this.footstep.pause();
    this.breath.pause();
    this.heartbeat.pause();
    this.monsterBGM.pause();
    this.itemNotification.pause();
    this.monsterScream.pause();
    if (this.suspense.isPlaying) {
      this.isChasePlaying = true;
      this.suspense.pause();
    }
    this.isBGMPlaying = false;
  }

  quite() {
    this.footstep.setVolume(0);
    this.breath.setVolume(0);
    this.heartbeat.setVolume(0);
    this.monsterBGM.setVolume(0);
    this.suspense.setVolume(0);
    this.monsterScream.setVolume(0);
    this.itemNotification.setVolume(0);
    this.escapeOpen.setVolume(0);
    this.mini1BG.setVolume(0);
    this.miniBG.setVolume(0);
  }
}
