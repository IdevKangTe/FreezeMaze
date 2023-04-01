import * as THREE from 'three';
export {
  initMonsterBGM,
  initItemNotification,
  initFootstep,
  initBreath,
  initHeartbeat,
};

const audioLoader = new THREE.AudioLoader();

function initMonsterBGM(listner) {
  const audio = new THREE.PositionalAudio(listner);
  audioLoader.load('sound/monster/monster-bgm.wav', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
    audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
    audio.setRefDistance(0.5);
    audio.setDistanceModel('linear');
  });
  return audio;
}

function initItemNotification(listner) {
  const audio = new THREE.PositionalAudio(listner);
  audioLoader.load('sound/item/item_notification01.wav', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
    audio.setVolume(0.5); // 오디오 볼륨을 조절합니다.
    audio.setRefDistance(0.5);
    audio.setDistanceModel('linear');
  });
  return audio;
}

function initFootstep(listner) {
  const audio = new THREE.PositionalAudio(listner);
  audioLoader.load('sound/player/footstep.wav', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true); // 오디오를 루프(loop)시킵니다.
    audio.setVolume(0.3); // 오디오 볼륨을 조절합니다.
  });
  return audio;
}

function initBreath(listner) {
  const audio = new THREE.PositionalAudio(listner);
  audioLoader.load('sound/player/breath.wav', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(false);
    audio.setVolume(1); // 오디오 볼륨을 조절합니다.
  });
  return audio;
}

function initHeartbeat(listner) {
  const audio = new THREE.PositionalAudio(listner);
  audioLoader.load('sound/player/heartbeat_normal.wav', function (buffer) {
    audio.setBuffer(buffer);
    audio.setLoop(true);
    audio.setVolume(1); // 오디오 볼륨을 조절합니다.
  });
  return audio;
}
