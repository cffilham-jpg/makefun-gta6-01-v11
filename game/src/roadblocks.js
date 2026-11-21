import {T,scene,box,glow} from './scene.js';
import {state} from './state.js';
export const roadblock=new T.Group();scene.add(roadblock);roadblock.position.set(0,0,185);
for(let i=-2;i<=2;i++){box(roadblock,3.1,.85,.7,0xeeeecc,i*4,.6,0);const stripe=box(roadblock,1,.9,.72,0xf39724,i*4,.6,0);stripe.rotation.z=.3;box(roadblock,.2,.2,.2,0xff6249,i*4,1.2,0,glow(0xff6249));}
export function updateRoadblock(dt){roadblock.visible=state.wanted>=4;if(roadblock.visible&&Math.abs(state.z-185)<2&&Math.abs(state.x)<11){state.speed*=-.5;state.z-=3;state.condition=Math.max(0,state.condition-12);}}
