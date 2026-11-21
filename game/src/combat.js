import {T,scene,camera,box,glow} from './scene.js';
import {state,notify,reward} from './state.js';
import {person} from './pedestrians.js';
import {weapons} from './weapons.js';
import {burst,smokeCloud} from './effects.js';
export const player=person(0xe55335);scene.add(player);
const gun=box(player,.15,.18,.65,0x15232b,.44,1.4,.4);
const muzzle=new T.Mesh(new T.OctahedronGeometry(.33),glow(0xffd15d));muzzle.position.set(0,0,.5);muzzle.scale.set(.7,.7,1.7);gun.add(muzzle);muzzle.visible=false;
export const hostiles=[];let cooldown=0,lastShot=-10;let aimX=0,aimY=0;
addEventListener('mousemove',e=>{aimX=e.clientX/innerWidth*2-1;aimY=1-e.clientY/innerHeight*2;});
export function createHostiles(){for(let i=0;i<8;i++){const mesh=person(0x67365f);mesh.position.set(-17+(i%4)*7,0,39+Math.floor(i/4)*12);scene.add(mesh);box(mesh,.15,.15,.7,0x121a25,.4,1.4,.5);hostiles.push({mesh,health:100,cooldown:i});}}
export function fire(){if(state.inVehicle||cooldown>0||state.menu)return;const w=weapons[state.weapon];if(state.ammo[state.weapon]<=0){notify('Empty magazine • B to restock');return;}state.ammo[state.weapon]--;cooldown=w.rate;lastShot=state.elapsed;muzzle.visible=true;state.heat+=1;state.wanted=Math.max(state.wanted,1);burst(state.x+.5,1.5,state.z+.6,0xffdd77,8,.13);
 const ray=new T.Raycaster();ray.setFromCamera(new T.Vector2(aimX,aimY),camera);let target=null,best=Infinity;
 for(const h of hostiles){if(h.health<=0)continue;const p=h.mesh.position.clone();p.y=1;const d=p.distanceTo(player.position);const near=ray.ray.distanceToPoint(p);if(d<w.range&&near<2.5&&d<best){best=d;target=h;}}
 if(!target)target=hostiles.filter(h=>h.health>0&&h.mesh.position.distanceTo(player.position)<w.range).sort((a,b)=>a.mesh.position.distanceTo(player.position)-b.mesh.position.distanceTo(player.position))[0];
 if(target){target.health-=w.damage;burst(target.mesh.position.x,1.4,target.mesh.position.z,0xff6b44,6,.3);if(target.health<=0){target.mesh.rotation.z=Math.PI/2;target.mesh.position.y=.3;state.kills++;reward(50,25);}}
}
export function updateCombat(dt,input,city){cooldown=Math.max(0,cooldown-dt);player.visible=!state.inVehicle;gun.position.y=state.cover?1.8:1.4;muzzle.visible=state.elapsed-lastShot<.13;
 if(!state.inVehicle){let dx=(input.has('KeyD')||input.has('ArrowRight')?1:0)-(input.has('KeyA')||input.has('ArrowLeft')?1:0),dz=(input.has('KeyW')||input.has('ArrowUp')?1:0)-(input.has('KeyS')||input.has('ArrowDown')?1:0);const staged=state.shot==='shootout'&&state.elapsed<6,covering=input.has('Space')||staged;state.cover=covering;const speed=covering?1.8:input.has('ShiftLeft')?8:4.5;if(dx||dz){const len=Math.hypot(dx,dz);dx/=len;dz/=len;const nx=state.x+dx*dt*speed,nz=state.z+dz*dt*speed;if(!city.collides(nx,nz,.4)){state.x=nx;state.z=nz;}state.angle=Math.atan2(dx,dz);}player.position.set(state.x,covering?-.5:0,state.z);player.rotation.y=state.angle;player.userData.legs.forEach((l,k)=>l.rotation.x=(dx||dz)?Math.sin(state.elapsed*9+k*Math.PI)*.5:0);if(input.has('KeyF')||input.has('Mouse0')||staged)fire();}
 hostiles.forEach(h=>{h.mesh.visible=state.shot==='shootout'||state.wanted>0&&!state.inVehicle;if(h.health<=0||!h.mesh.visible)return;const d=Math.hypot(h.mesh.position.x-state.x,h.mesh.position.z-state.z);h.mesh.lookAt(state.x,0,state.z);h.cooldown-=dt;if(d<35&&h.cooldown<=0){h.cooldown=2.5;burst(h.mesh.position.x,1.4,h.mesh.position.z,0xffc35b,4,.1);if(!state.inVehicle&&!state.cover&&state.smoke<=0){if(state.armour>0)state.armour=Math.max(0,state.armour-3);else state.health-=3;}}});
 if(state.health<=0){state.health=100;state.armour=25;state.wanted=0;state.heat=0;state.cash=Math.max(0,state.cash-300);state.x=0;state.z=-35;state.condition=100;notify('Recovered at Luna Clinic • medical bill $300');}
}
export function stageShootout(){state.inVehicle=false;state.x=0;state.z=30;state.angle=0;state.wanted=3;state.weapon=2;box(scene,5,1.1,1.5,0x2b7783,-.6,.55,32);state.cover=true;smokeCloud(3,39);burst(.6,1.4,31,0xffd75b,20,.6);}
