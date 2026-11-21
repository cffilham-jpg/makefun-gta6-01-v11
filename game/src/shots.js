import {state} from './state.js';
import {stagePolice} from './pursuit.js';
import {stageShootout} from './combat.js';
export function stageShot(){const shot=new URLSearchParams(location.search).get('shot');if(!shot)return;state.shot=shot;state.menu='';state.paused=false;state.x=0;state.z=55;state.angle=0;state.time=17.5;state.wanted=5;state.heat=20;state.chapter=8;state.dialogue=0;state.stage=1;state.timer=118;state.speed=0;
 if(shot==='shootout'){state.chapter=6;state.dialogue=6;stageShootout();state.time=18.7;}
 if(shot==='night'){state.time=22;state.weather='rain';state.wanted=2;state.heat=7;state.chapter=4;state.dialogue=4;state.z=30;}
 if(shot==='progress'){state.menu='chapters';state.paused=true;state.completed=[0,1,2,3,4];state.chapter=5;state.rp=1670;state.cash=12450;state.races=3;state.deliveries=7;state.owned=['Luna GT','Brisa 900'];state.wanted=0;}
 if(shot==='chase')state.speed=28;
 state.vehicle.x=shot==='shootout'?-12:state.x;state.vehicle.z=shot==='shootout'?25:state.z;state.vehicle.mesh.position.set(state.vehicle.x,0,state.vehicle.z);stagePolice();
}
