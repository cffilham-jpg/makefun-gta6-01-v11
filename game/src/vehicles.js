import {T,scene,box,cylinder,material,glow,label,batchModel} from './scene.js';
import {state,notify} from './state.js';
export const vehicles=[];
export function createCar(x,z,color=0xf05b2e,police=false,name='Luna GT'){
 const g=new T.Group();g.position.set(x,0,z);scene.add(g);
 const paint=material(color,.32,.3),glass=material(0x112b3b,.65,.13);
 box(g,2.35,.63,4.9,color,0,.72,0,paint);box(g,2.24,.34,4.7,color,0,.38,0,paint);
 const cabin=box(g,1.94,.72,2.25,color,0,1.27,-.15,glass),positions=cabin.geometry.attributes.position;for(let i=0;i<positions.count;i++)if(positions.getY(i)>0){positions.setX(i,positions.getX(i)*.9);positions.setZ(i,positions.getZ(i)*.65);}positions.needsUpdate=true;cabin.geometry.computeVertexNormals();box(g,1.8,.13,1.5,color,0,1.68,-.12,paint);
 box(g,2.28,.16,1.2,color,0,1.02,1.65,paint);box(g,2.34,.13,.75,color,0,1.1,-1.96,paint);
 box(g,2.45,.09,.28,0x0a1320,0,1.26,-2.05);box(g,2.42,.2,.14,0x172330,0,.45,-2.48);
 for(const s of [-1,1]){box(g,.8,.16,.06,0xff283c,s*.7,.85,-2.49,glow(0xff172c));box(g,.68,.17,.06,0xfff3b5,s*.73,.8,2.49,glow(0xfff2b9));box(g,.1,.16,.62,color,s*1.17,1.22,.62,paint);for(const z0 of [-1.55,1.5]){const w=cylinder(g,.49,.49,.29,0x10131c,s*1.2,.48,z0,16);w.rotation.z=Math.PI/2;const hub=cylinder(g,.26,.26,.31,0xc0c8d0,s*1.22,.48,z0,10);hub.rotation.z=Math.PI/2;}}
 label(g,police?'POLICIA':'COSTA • 07','#e8f1dd',0,.66,-2.505,.75,.19);
 const lights=[];
 if(police){box(g,2.39,.38,2.5,0xe8eef0,0,.76,0);box(g,1.65,.12,.5,0x111725,0,1.83,-.1);lights.push(box(g,.7,.16,.45,0xff183c,-.45,1.95,-.1,glow(0xff173e)),box(g,.7,.16,.45,0x1a8cff,.45,1.95,-.1,glow(0x168fff)));label(g,'POLICIA','#172635',-1.206,.92,0,1.5,.35).rotation.y=-Math.PI/2;}
 batchModel(g,lights);const v={mesh:g,x,z,angle:0,speed:0,condition:100,police,name,lights,kind:'car'};vehicles.push(v);return v;
}
export function enterExit(){if(state.inVehicle){state.inVehicle=false;state.speed=0;state.x+=Math.cos(state.angle)*3;notify('On foot • E to enter a nearby vehicle');return;}let nearest=null,d=7;for(const v of vehicles){if(v.police)continue;const n=Math.hypot(v.x-state.x,v.z-state.z);if(n<d){nearest=v;d=n;}}if(nearest){state.vehicle=nearest;state.inVehicle=true;state.angle=nearest.angle;state.condition=nearest.condition;notify(nearest.name+' • engine on');}else notify('Move closer to a vehicle to enter');}
export function updateDriving(dt,input,city){
 if(!state.inVehicle)return;
 const throttle=(input.has('KeyW')||input.has('ArrowUp')?1:0)-(input.has('KeyS')||input.has('ArrowDown')?1:0);
 state.speed+=throttle*dt*18;state.speed*=Math.pow(input.has('Space')?.14:.73,dt);state.speed=T.MathUtils.clamp(state.speed,-13,state.vehicle.kind==='bike'?48:42);
 const steer=(input.has('KeyA')||input.has('ArrowLeft')?1:0)-(input.has('KeyD')||input.has('ArrowRight')?1:0);
 state.angle+=steer*dt*(input.has('Space')?2.2:1.15)*Math.min(1,Math.abs(state.speed)/5)*Math.sign(state.speed||1);
 const nx=state.x+Math.sin(state.angle)*state.speed*dt,nz=state.z+Math.cos(state.angle)*state.speed*dt;
 if(city.collides(nx,nz,1.3)){state.speed*=-.38;state.condition=Math.max(0,state.condition-2);state.heat+=1;}else {state.x=nx;state.z=nz;}
 if(state.x>340||state.x< -360||state.z>260||state.z< -500){state.speed*=-.5;state.x=T.MathUtils.clamp(state.x,-359,339);state.z=T.MathUtils.clamp(state.z,-499,259);}
 state.distance+=Math.abs(state.speed)*dt;const v=state.vehicle;v.x=state.x;v.z=state.z;v.angle=state.angle;v.condition=state.condition;v.mesh.position.set(v.x,v.mesh.position.y,v.z);v.mesh.rotation.y=v.angle;
 if(state.condition===0){state.health-=dt*4;state.speed*=.95;}
}
