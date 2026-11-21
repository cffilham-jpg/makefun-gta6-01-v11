import {T,scene,box,cylinder,sphere,batchModel} from './scene.js';
import {state} from './state.js';
export const pedestrians=[];
export function person(color=0xf4a455){const g=new T.Group();box(g,.57,.8,.34,color,0,1.25,0);sphere(g,.23,0xc68b65,0,1.92,0);box(g,.48,.15,.45,0x192536,0,2.1,0);const legs=[];for(const s of [-1,1]){legs.push(box(g,.21,.8,.24,0x253c50,s*.16,.45,0));box(g,.18,.75,.2,0xc68b65,s*.4,1.2,0);}g.userData.legs=legs;batchModel(g,legs);return g;}
export function createPedestrians(){for(let i=0;i<48;i++){const p=person([0xef784f,0x3ed7c8,0xf0d276,0xd77ca7][i%4]);const x=i%2?26:-26,z=(i*17)%700-420;p.position.set(x,0,z);scene.add(p);pedestrians.push({mesh:p,x,z,dir:i%2?1:-1});}}
export function updatePedestrians(dt){pedestrians.forEach((p,i)=>{p.z+=dt*p.dir*(state.wanted?2:1);if(p.z>260)p.z=-450;if(p.z< -460)p.z=250;p.mesh.position.z=p.z;p.mesh.rotation.y=p.dir<0?Math.PI:0;p.mesh.userData.legs.forEach((l,k)=>l.rotation.x=Math.sin(state.elapsed*7+i+k*Math.PI)*.45);});}
