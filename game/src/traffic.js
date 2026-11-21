import {createCar} from './vehicles.js';
import {state} from './state.js';
export const traffic=[];
export function createTraffic(){for(let i=0;i<24;i++){const lane=i%4,car=createCar([-16,-10,10,16][lane],(i*31)%700-400,[0x30bab8,0xffbc55,0xe9e2ce,0xa94167,0x427ac5][i%5],false,['Marina LX','Sol Coupe','Costa Taxi','Brisa Wagon'][lane]);car.angle=lane<2?0:Math.PI;car.mesh.rotation.y=car.angle;traffic.push(car);}}
export function updateTraffic(dt){traffic.forEach((v,i)=>{if(v===state.vehicle&&state.inVehicle)return;const dir=i%4<2?1:-1;let speed=7+i%5;if(Math.hypot(v.x-state.x,v.z-state.z)<8)speed=1;v.z+=dir*dt*speed;if(v.z>270)v.z=-470;if(v.z< -480)v.z=260;v.mesh.position.set(v.x,0,v.z);});}
