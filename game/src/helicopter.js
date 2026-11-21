import {T,scene,box,cylinder,sphere,material,glow,label} from './scene.js';
import {state} from './state.js';
export const helicopter={name:'CONDOR-1',tactic:'SPOTLIGHT',x:0,z:0,y:15,mesh:new T.Group()};
const h=helicopter.mesh;scene.add(h);
const body=sphere(h,1.6,0x15313e,0,0,0);body.scale.set(1,1,2.05);
const cockpit=sphere(h,1.3,0x67bdd0,0,.15,1.2);cockpit.scale.set(.9,.8,1.2);cockpit.material=material(0x24657b,.7,.18);
box(h,.45,.6,6.5,0x142b37,0,.25,-4);box(h,3,.16,1,0x183543,0,.4,-6.4);box(h,.16,2.4,1.2,0xe8bf72,0,1.2,-6.6);
for(const s of [-1,1]){box(h,.15,.15,5,0x09131e,s*1.45,-1.6,0);box(h,.15,1,.15,0x09131e,s*1.45,-1.1,s);}
cylinder(h,.16,.16,1.4,0xb8cbd0,0,1.6,0);const rotor=new T.Group();rotor.position.y=2.3;h.add(rotor);box(rotor,.24,.06,14,0x172733);box(rotor,14,.06,.24,0x172733);
label(h,'CONDOR 1','#f5dfb2',0,-.2,2.7,2.2,.5);
const beam=new T.Mesh(new T.ConeGeometry(9,15,48,1,true),new T.MeshBasicMaterial({color:0xfff4b2,transparent:true,opacity:.2,depthWrite:false,side:T.DoubleSide,blending:T.AdditiveBlending}));beam.position.set(0,-8,.6);h.add(beam);
const light=new T.SpotLight(0xffe7ae,4,75,.55,.6,1);light.position.set(0,-1,1);h.add(light);scene.add(light.target);
export function updateHelicopter(dt){h.visible=state.wanted>=3;if(!h.visible)return;const a=state.angle;helicopter.x=state.x-Math.cos(a)*10+Math.sin(a)*28;helicopter.z=state.z+Math.sin(a)*10+Math.cos(a)*28;h.position.set(helicopter.x,15+Math.sin(state.elapsed)*.5,helicopter.z);h.rotation.y=a+.35;rotor.rotation.y+=dt*37;light.target.position.set(state.x,0,state.z);}
