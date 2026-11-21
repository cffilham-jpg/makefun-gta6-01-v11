import {state,notify} from './state.js';
import {enterExit} from './vehicles.js';
import {selectWeapon} from './weapons.js';
import {useCrew} from './crew.js';
import {startActivity,shop,repair} from './activities.js';
import {startRace} from './races.js';
import {saveGame} from './save.js';
import {startRadio,toggleRadio} from './radio.js';
import {startEngineAudio} from './audio.js';
export const input=new Set();
export function beginPlay(){state.menu='';state.paused=false;startRadio();startEngineAudio();notify('Welcome to Costa Luna • M chapters • E enter / exit');}
addEventListener('keydown',e=>{if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Tab'].includes(e.code))e.preventDefault();input.add(e.code);if(e.repeat)return;
 if(e.code==='Enter'&&state.menu==='start'){beginPlay();return;}
 if(e.code==='Escape'){state.menu=state.menu?'':'pause';state.paused=!!state.menu;saveGame();return;}
 if(e.code==='KeyM'){state.menu=state.menu==='chapters'?'':'chapters';state.paused=!!state.menu;return;}
 if(state.menu)return;
 if(e.code==='KeyE')enterExit();if(/^Digit[1-6]$/.test(e.code))selectWeapon(Number(e.code.slice(5))-1);
 if(e.code==='KeyZ')useCrew(0);if(e.code==='KeyX')useCrew(1);if(e.code==='KeyC')useCrew(2);
 if(e.code==='KeyJ')startActivity('taxi');if(e.code==='KeyV')startActivity('vigilante');if(e.code==='KeyL')startActivity('delivery');if(e.code==='KeyT')startRace();if(e.code==='KeyB')shop();if(e.code==='KeyR')repair();if(e.code==='KeyN')toggleRadio();
 if(e.code==='KeyG'){state.menu='garage';state.paused=true;}if(e.code==='KeyP'){const choices=['golden','rain','clear'];state.weather=choices[(choices.indexOf(state.weather)+1)%3];notify('Weather: '+state.weather);}if(e.code==='KeyH'){state.time=state.isNight?17.5:22;}
});
addEventListener('keyup',e=>input.delete(e.code));addEventListener('blur',()=>input.clear());
addEventListener('mousedown',e=>{if(e.button===0)input.add('Mouse0');if(!state.menu)startRadio();});addEventListener('mouseup',()=>input.delete('Mouse0'));
