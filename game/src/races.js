import {T,scene,glow} from './scene.js';
import {state,notify,reward} from './state.js';
const route=[[0,95],[140,95],[140,-60],[0,-60],[0,180]];
export const race={active:false,index:0,time:0};
const gate=new T.Mesh(new T.TorusGeometry(5,.22,8,48),glow(0xff7aab));scene.add(gate);
export function startRace(){race.active=true;race.index=0;race.time=100;notify('BOARDWALK SPRINT • pass through all 5 rings');}
export function updateRace(dt){gate.visible=race.active;if(!race.active)return;const p=route[race.index];gate.position.set(p[0],4,p[1]);race.time-=dt;if(Math.hypot(state.x-p[0],state.z-p[1])<7){race.index++;if(race.index===route.length){race.active=false;state.races++;reward(1200,150);notify('SPRINT WON • $1,200 +150 RP');}}if(race.time<0){race.active=false;notify('Race timed out • T to retry');}}
