import {T} from './scene.js';
import {state,notify,reward} from './state.js';
import {units} from './dispatch.js';
let escape=0;
export function updatePursuit(dt){
 state.heat=Math.max(0,state.heat-dt*.09);if(state.heat>2)state.wanted=Math.max(state.wanted,Math.min(5,Math.ceil(state.heat/4)));
 let close=false;
 units.forEach((u,i)=>{u.mesh.visible=i<state.wanted+2&&state.wanted>0;if(!u.mesh.visible)return;
 const side=i%2?1:-1,a=state.angle,behind=!state.inVehicle?15+i*8:i<2?3:15+(i-2)*12,across=!state.inVehicle?12:i<2?4.5:4+i%3;
 const tx=state.x+Math.sin(a)*behind+Math.cos(a)*across*side,tz=state.z+Math.cos(a)*behind-Math.sin(a)*across*side;
 const dist=Math.hypot(u.x-state.x,u.z-state.z);close ||= dist<45;
 const follow=state.smoke>0?.12:1.1;u.x+=Math.sin(a)*state.speed*dt+(tx-u.x)*Math.min(1,dt*follow);u.z+=Math.cos(a)*state.speed*dt+(tz-u.z)*Math.min(1,dt*follow);
 u.angle=T.MathUtils.lerp(u.angle,a,Math.min(1,dt*3));u.mesh.position.set(u.x,0,u.z);u.mesh.rotation.y=u.angle;
 u.lights.forEach((m,k)=>m.material.emissiveIntensity=(Math.sin(state.elapsed*15+k*3+i)>0?5:.15));
 if(dist<3&&Math.abs(state.speed)>8){state.condition=Math.max(0,state.condition-dt*3);state.speed*=Math.pow(.8,dt);}
 if(!state.inVehicle&&dist<18&&state.elapsed%2<dt&&state.smoke<=0){if(state.armour>0)state.armour=Math.max(0,state.armour-4);else state.health-=4;}
 });
 if(state.wanted&&(!close||state.smoke>0)){escape+=dt;if(escape>3.5){state.wanted=Math.max(0,state.wanted-1);state.heat=Math.min(state.heat,state.wanted*4);escape=0;if(!state.wanted){reward(300,80);state.heat=0;notify('Pursuit escaped • +80 RP');}}}else escape=0;
 state.detection=state.smoke>0?'SEARCHING — smoke breaks visual contact':state.wanted>=3?'AIR UNIT DEPLOYED • IN SIGHT':state.wanted?'IN SIGHT — search zone follows you':'CLEAR — no active pursuit';
}
export function stagePolice(){units.forEach((u,i)=>{u.x=state.x+(i%2?1:-1)*(state.inVehicle?4.5:12);u.z=state.z+(!state.inVehicle?15+i*8:i<2?3:15+(i-2)*12);u.angle=state.angle;u.mesh.position.set(u.x,0,u.z);u.mesh.rotation.y=u.angle;});}
