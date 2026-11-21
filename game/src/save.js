import {state,notify} from './state.js';
const fields=['x','z','angle','cash','rp','standing','completed','owned','unlocked','ammo','health','armour','condition','chapter','stage','timer','mission','time','weather','races','deliveries','kills','distance'];
export function saveGame(){const data={};fields.forEach(k=>data[k]=state[k]);try{localStorage.setItem('costa-luna-save',JSON.stringify(data));notify('Progress saved • Costa Luna');return true;}catch(e){notify('Save unavailable in this browser');return false;}}
export function loadGame(){try{const d=JSON.parse(localStorage.getItem('costa-luna-save'));if(!d)return false;fields.forEach(k=>{if(d[k]!==undefined)state[k]=d[k];});state.ammo[0]=Infinity;notify('Welcome back, Maya');return true;}catch(e){return false;}}
