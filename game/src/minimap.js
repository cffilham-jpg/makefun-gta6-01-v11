import {state} from './state.js';
import {units} from './dispatch.js';
import {traffic} from './traffic.js';
import {objective} from './missions.js';
export function drawMinimap(canvas){const q=canvas.getContext('2d'),s=canvas.width,c=s/2,scale=.58;q.clearRect(0,0,s,s);q.save();q.beginPath();q.arc(c,c,c-4,0,Math.PI*2);q.clip();q.fillStyle='#142938';q.fillRect(0,0,s,s);
 const px=x=>c+(x-state.x)*scale,pz=z=>c-(z-state.z)*scale;
 q.fillStyle='#187b8b';q.fillRect(px(45),0,s,s);q.strokeStyle='#66808a';q.lineWidth=8;
 for(const x of [-280,-140,0,140,280]){q.beginPath();q.moveTo(px(x),0);q.lineTo(px(x),s);q.stroke();}for(const z of [-350,-210,-60,95,210]){q.beginPath();q.moveTo(0,pz(z));q.lineTo(s,pz(z));q.stroke();}
 if(state.wanted){q.strokeStyle='#ff527c';q.lineWidth=2;q.beginPath();q.arc(c,c,58+Math.sin(state.elapsed*2)*3,0,Math.PI*2);q.stroke();}
 function dot(x,z,color,r){q.fillStyle=color;q.beginPath();q.arc(px(x),pz(z),r,0,Math.PI*2);q.fill();}
 traffic.forEach(v=>dot(v.x,v.z,'#95bdc4',2));units.filter(u=>u.mesh.visible).forEach(u=>dot(u.x,u.z,'#ff5675',4));const o=state.activityTarget||objective();dot(o.x,o.z,'#ffda72',6);
 q.translate(c,c);q.rotate(-state.angle);q.fillStyle='#f6ffff';q.beginPath();q.moveTo(0,-9);q.lineTo(6,7);q.lineTo(0,4);q.lineTo(-6,7);q.fill();q.restore();q.strokeStyle='#b3e2df';q.lineWidth=3;q.beginPath();q.arc(c,c,c-4,0,Math.PI*2);q.stroke();q.fillStyle='#fff4da';q.font='bold 18px sans-serif';q.textAlign='center';q.fillText('N',c,21);
}
