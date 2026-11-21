import {createCar} from './vehicles.js';
import {helicopter} from './helicopter.js';
import {state} from './state.js';
export const units=[];
export function createDispatch(){const names=['AGUILA-7','BUHO-4','GAVILAN-11','HALCON-2','LECHUZA-9','MILANO-6','GARZA-3'];names.forEach((name,i)=>{const v=createCar((i%2?1:-1)*5, -5-i*12,0x172738,true,'Interceptor');Object.assign(v,{name,tactic:['RAMMING','BOXING IN','ROADBLOCK','CLOSING IN'][i%4],offset:i});units.push(v);});}
export function dispatchRows(){const list=state.wanted>=3?[helicopter,...units.filter(u=>u.mesh.visible)]:units.filter(u=>u.mesh.visible);return list.map(u=>({...u,distance:Math.round(Math.hypot(u.x-state.x,u.z-state.z,u.y||0))})).sort((a,b)=>a.name==='CONDOR-1'?-1:b.name==='CONDOR-1'?1:a.distance-b.distance);}
