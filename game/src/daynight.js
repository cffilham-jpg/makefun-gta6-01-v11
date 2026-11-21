import {T,scene,sun,ambient} from './scene.js';
import {state} from './state.js';
import {nightMaterials} from './city.js';
const sky=new T.Mesh(new T.SphereGeometry(850,24,16),new T.ShaderMaterial({side:T.BackSide,depthWrite:false,uniforms:{night:{value:0}},vertexShader:'varying vec3 p;void main(){p=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}',fragmentShader:'varying vec3 p;uniform float night;void main(){float t=clamp(normalize(p).y*2.0,0.0,1.0);vec3 day=mix(vec3(1.0,.48,.22),vec3(.23,.24,.52),t);vec3 dark=mix(vec3(.15,.23,.40),vec3(.025,.055,.15),t);gl_FragColor=vec4(mix(day,dark,night),1.0);}'}));scene.add(sky);
export function updateSky(){sky.position.set(state.x,0,state.z);sky.material.uniforms.night.value=state.isNight?1:0;}
export function updateDayNight(dt){state.time=(state.time+dt*.007)%24;const night=state.time<6||state.time>19;scene.background=new T.Color(night?0x10284f:0xf5825e);sun.intensity=night?.3:1.7;ambient.intensity=night?.95:.65;ambient.color.setHex(night?0x7ab0ed:0x9bdfff);nightMaterials.forEach(m=>m.emissiveIntensity=night?1.7:.12);state.isNight=night;}
