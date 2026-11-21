import {T,scene,glow} from './scene.js';
import {state,notify,reward} from './state.js';
export const chapterTitles=['First Run','The Costa Deal','Lights of Punta Alba','Roadblock at Dawn','Midnight Getaway','Harbor Debts','Moonlight Heist','Storm Chaser','Coastal Run','Queen of Costa Luna'];
const routes=[[[0,60],[60,95],[60,145]],[[-140,-60],[-140,95],[0,95]],[[140,-60],[250,-60],[280,15]],[[0,-210],[140,-210],[140,95]],[[-140,-210],[0,-210],[0,95]],[[-280,-60],[-280,95],[-140,95]],[[0,-350],[-140,-350],[-280,-210]],[[140,-210],[0,-210],[0,210]],[[280,95],[140,95],[60,95]],[[0,-350],[0,95],[60,145]]];
const verbs=['Collect the sealed cargo','Lose the tail at the rendezvous','Deliver to the extraction point'];
export const objectiveRing=new T.Mesh(new T.TorusGeometry(4,.15,8,48),glow(0x6affc5));objectiveRing.rotation.x=Math.PI/2;scene.add(objectiveRing);
export function objective(){const p=routes[state.chapter][state.stage];return {x:p[0],z:p[1],text:verbs[state.stage]};}
export function startChapter(i){state.chapter=i;state.stage=0;state.timer=180+i*20;state.mission=true;state.menu='';state.paused=false;state.dialogue=i;notify('Job accepted: '+chapterTitles[i]);}
export function updateMissions(dt){const o=objective();objectiveRing.visible=state.mission;objectiveRing.position.set(o.x,.35,o.z);objectiveRing.rotation.z+=dt;
 if(!state.mission)return;state.timer-=dt;
 if(state.timer<=0){state.mission=false;notify('Job expired • M to retry the chapter');return;}
 if(Math.hypot(state.x-o.x,state.z-o.z)<7){reward(150,40);state.stage++;if(state.stage>=3){if(!state.completed.includes(state.chapter))state.completed.push(state.chapter);reward(900+state.chapter*250,180);state.mission=false;state.stage=2;notify('JOB COMPLETE • payout received • M for next chapter');}else{state.wanted=Math.max(state.wanted,Math.min(5,1+Math.floor(state.chapter/2)));state.heat=state.wanted*4;notify('Stage complete • '+verbs[state.stage]);}}
}
export function nextObjective(){return state.stage<2?verbs[state.stage+1]:'Collect payout & unlock the next job';}
