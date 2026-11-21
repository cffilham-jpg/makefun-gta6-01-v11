import {T,scene,sphere,glow} from './scene.js';
export const particles=[];
export function burst(x,y,z,color=0xffbf45,count=12,life=.5){for(let i=0;i<count;i++){const m=sphere(scene,.12+Math.random()*.25,color,x,y,z);m.material=glow(color);particles.push({m,life,max:life,vx:(Math.random()-.5)*8,vy:Math.random()*6,vz:(Math.random()-.5)*8});}}
export function smokeCloud(x,z){for(let i=0;i<18;i++){const m=sphere(scene,1.4,0x9ca8b6,x+(Math.random()-.5)*5,1+Math.random()*2,z+(Math.random()-.5)*6);m.material.transparent=true;m.material.opacity=.5;particles.push({m,life:6,max:6,vx:Math.random()-.5,vy:.5,vz:-.5});}}
export function updateEffects(dt){for(let i=particles.length-1;i>=0;i--){const p=particles[i];p.life-=dt;p.m.position.x+=p.vx*dt;p.m.position.y+=p.vy*dt;p.m.position.z+=p.vz*dt;p.m.scale.multiplyScalar(1+dt*.5);if(p.m.material.transparent)p.m.material.opacity=.5*p.life/p.max;if(p.life<=0){scene.remove(p.m);p.m.geometry.dispose();p.m.material.dispose();particles.splice(i,1);}}}
