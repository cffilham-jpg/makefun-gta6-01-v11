import {state,notify} from './state.js';
export const tracks=['Marisol Vega · Neon Tide','Los Satélites · Costa de Oro','Noche Azul · Last Ferry'];
let context=null,timer=null,beat=0;
export function startRadio(){if(context){context.resume();return;}context=new (window.AudioContext||window.webkitAudioContext)();timer=setInterval(()=>{if(!state.radio||state.paused)return;const now=context.currentTime,step=beat%16,root=[110,130.81,98,146.83][Math.floor(beat/16)%4];tone(root,now,.21,'sawtooth',.065);if(step%2===0)tone(root*[2,2.5,3,4,3,2.5,2,1.5][step/2],now,.16,'triangle',.1);if(step%4===0)tone(55,now,.09,'sine',.2);if(step%2)tone(4200,now,.025,'square',.015);beat++;},160);}
function tone(f,t,d,type,volume){const o=context.createOscillator(),g=context.createGain();o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(volume*state.volume,t);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(context.destination);o.start(t);o.stop(t+d);}
export function radioTrack(){return tracks[Math.floor(state.elapsed/90)%tracks.length];}
export function toggleRadio(){state.radio=!state.radio;startRadio();notify(state.radio?'Luna FM • radio on':'Radio muted');}
