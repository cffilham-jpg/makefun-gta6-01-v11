import {T,scene,glow} from './scene.js';
import {state,notify,reward} from './state.js';
export const activityMarker=new T.Mesh(new T.TorusGeometry(3,.16,8,32),glow(0xffdc6b));activityMarker.rotation.x=Math.PI/2;scene.add(activityMarker);
export function startActivity(type){state.activity=type;state.activityTarget=type==='vigilante'?{x:-140,z:-60}:type==='taxi'?{x:140,z:95}:{x:-280,z:95};notify(type.toUpperCase()+' • follow the gold marker');}
export function shop(){if(state.cash<250){notify('Supplies cost $250');return;}state.cash-=250;state.health=100;state.armour=100;state.ammo=state.ammo.map((a,i)=>state.unlocked[i]?i===0?Infinity:a+60:a);notify('Supplies restocked • armour, health, ammunition');}
export function repair(){if(state.cash<150){notify('Repair costs $150');return;}state.cash-=150;state.condition=100;notify('Costa Customs • vehicle repaired');}
let stuntReady=true;
export function updateActivities(dt){activityMarker.visible=!!state.activity;if(state.activityTarget){const p=state.activityTarget;activityMarker.position.set(p.x,.3,p.z);if(Math.hypot(state.x-p.x,state.z-p.z)<7){if(state.activity==='vigilante'){state.wanted=0;state.heat=0;}reward(state.activity==='taxi'?450:650,70);state.deliveries++;notify(state.activity+' complete • paid');state.activity=null;state.activityTarget=null;}}
 if(state.inVehicle&&Math.abs(state.x-17)<5&&Math.abs(state.z-210)<8&&state.speed>16&&stuntReady){state.jump=1.8;stuntReady=false;reward(400,100);notify('STUNT JUMP • Marina flight • +100 RP');}if(state.jump>0){state.jump-=dt;state.vehicle.mesh.position.y=Math.sin(Math.max(0,state.jump)/1.8*Math.PI)*5;}else if(state.vehicle)state.vehicle.mesh.position.y=0;if(Math.abs(state.z-210)>30)stuntReady=true;}
