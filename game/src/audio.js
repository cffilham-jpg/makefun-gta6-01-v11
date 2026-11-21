import {state} from './state.js';
let audio,osc,gain;
export function startEngineAudio(){if(audio)return;audio=new AudioContext();osc=audio.createOscillator();gain=audio.createGain();osc.type='sawtooth';osc.connect(gain);gain.connect(audio.destination);gain.gain.value=0;osc.start();}
export function updateAudio(){if(!audio)return;osc.frequency.setTargetAtTime(35+Math.abs(state.speed)*3,audio.currentTime,.1);gain.gain.setTargetAtTime(state.inVehicle&&!state.paused?.018*state.volume:0,audio.currentTime,.2);}
