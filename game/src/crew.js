import {state,notify} from './state.js';
import {smokeCloud} from './effects.js';
export const crew=[{name:'Dario',role:'Driver',ability:'SMOKE SCREEN',key:'Z',cooldown:30},{name:'Sofia',role:'Mechanic',ability:'FIELD REPAIR',key:'X',cooldown:40},{name:'Mateo',role:'Lookout',ability:'EAGLE EYE',key:'C',cooldown:25}];
export function useCrew(i){if(state.crew[i]>0){notify(crew[i].name+' is recovering');return;}state.crew[i]=crew[i].cooldown;if(i===0){state.smoke=18;smokeCloud(state.x,state.z-3);}if(i===1){state.condition=Math.min(100,state.condition+40);state.health=Math.min(100,state.health+20);}if(i===2){state.eagle=15;state.timer+=15;}notify(crew[i].name+': '+crew[i].ability+' activated');}
export function updateCrew(dt){state.crew=state.crew.map(v=>Math.max(0,v-dt));state.smoke=Math.max(0,state.smoke-dt);state.eagle=Math.max(0,state.eagle-dt);}
