import {T,scene,box,cylinder,sphere,label,lineBetween,material,glow} from './scene.js';
export const solids=[];
export const city={collides(x,z,r=0){const sea=x>32&&z> -15,bridge=Math.abs(z-95)<12||Math.abs(x-140)<11||Math.abs(x-280)<11,pier=x>47&&x<73&&z> -8&&z<185,wheel=x>24&&x<86&&z>125&&z<185,point=Math.hypot(x-250,z-15)<35;if(sea&&!bridge&&!pier&&!wheel&&!point)return true;return solids.some(b=>Math.abs(x-b.x)<b.w/2+r&&Math.abs(z-b.z)<b.d/2+r);}};
export const nightMaterials=[];
export const roadMaterials=[];
let preCity=new Set();
export const water=box(scene,1300,.2,1400,0x057e9a,430,-1,0,material(0x0586a3,.8,.16));
export function palm(x,z,h=10){const g=new T.Group();g.position.set(x,0,z);scene.add(g);const trunk=cylinder(g,.23,.42,h,0x775638,0,h/2,0);trunk.rotation.z=.09;for(let k=0;k<7;k++){const a=k*Math.PI*2/7;const leaf=box(g,.8,.16,5,0x247c44,Math.sin(a)*1.7,h,Math.cos(a)*1.7);leaf.rotation.set(.28,a,.16);}return g;}
export function buildCity(){
 preCity=new Set(scene.children);
 box(scene,420,1,800,0xb69b72,-180,-.6,-110);box(scene,330,1,495,0xb69b72,195,-.6,-262.5);box(scene,47,.12,800,0x273344,0,.015,-110);box(scene,740,.12,23,0x303a4c,-10,.02,-60);box(scene,740,.12,23,0x303a4c,-10,.02,-210);box(scene,740,.12,23,0x303a4c,-10,.02,95);
 box(scene,60,.7,60,0xbb875d,55,-.1,155);cylinder(scene,35,40,9,0x94775a,250,-4.5,15,16);
 for(const x of [140,280])for(let z=25;z<240;z+=40){box(scene,18,.4,2,0xb1b3a2,x,-.2,z);box(scene,2,7,2,0x788a87,x-7,-3,z);box(scene,2,7,2,0x788a87,x+7,-3,z);}
 for(const x of [-140,-280,140,280])box(scene,21,.12,800,0x303a4c,x,.02,-110);
 for(let z=-490;z<280;z+=11){for(const x of [-8,8])box(scene,.13,.03,5,0xe4d8aa,x,.1,z);box(scene,.18,.03,6,0xffb44b,0,.11,z);}
 for(const x of [-27,27]){box(scene,5,.25,800,0xe5c5a0,x,.09,-110);for(let z=-460;z<280;z+=23){palm(x,z,9+(z%3));cylinder(scene,.12,.17,7,0x19414a,x,3.5,z+8);box(scene,2.2,.16,.6,0xffedb2,x+(x<0?1:-1),7,z+8,glow(0xffd788));}}
 const colors=[0xefb678,0xec7969,0x4da8ad,0xf1d3a0,0x799db0,0xda8e91];let i=0;
 for(let z=-450;z<250;z+=49){for(let x=-330;x<310;x+=55){if(Math.abs(x)<42||Math.abs(x-140)<24||Math.abs(x+140)<22||Math.abs(x+280)<22||Math.abs(z+60)<24||Math.abs(z+210)<24||Math.abs(z-95)<24||x>35&&z> -15)continue;
 const w=24+(i%3)*5,d=29,h=z< -200?22+(i%7)*9:9+(i%4)*5,c=colors[i%colors.length];i++;
 box(scene,w,h,d,c,x,h/2,z);solids.push({x,z,w,d});box(scene,w+1,.4,d+1,0xf8d3aa,x,h,z);
 for(let y=3;y<h-1;y+=4)for(let a=-w/2+3;a<w/2-1;a+=4){const mat=new T.MeshStandardMaterial({color:0x3b6975,emissive:0xffb75b,emissiveIntensity:.12,metalness:.6,roughness:.2});nightMaterials.push(mat);box(scene,2,2,.08,0,x+a,y,z+d/2+.06,mat);box(scene,2,2,.08,0,x+a,y,z-d/2-.06,mat);}
 if(h<25){box(scene,w,.9,3,0xeb584d,x,3.8,z+d/2+1);label(scene,['LUNA CAFÉ','SOL Y SAL','CASA AZUL','LA PERLA','MERCADO','COSTA CUSTOMS'][i%6],['#ffdf89','#7effed','#ff87bb'][i%3],x,5,z+d/2+.2,w*.92,2.5);}
 }}
 box(scene,24,.6,145,0xba8055,60,.1,64);box(scene,115,.6,14,0xc69161,104,.12,8);
 for(let z=0;z<140;z+=10){box(scene,.15,1.2,8,0xffe1a9,71,1,z);cylinder(scene,.09,.09,1.4,0xf8dcaf,71,1,z);}
 for(let k=0;k<7;k++){const x=99+k*17,z=26+(k%2)*15;const g=new T.Group();g.position.set(x,0,z);scene.add(g);box(g,5,1.2,12,0xf6eee1,0,0,0);box(g,3,2,5,0xffffff,0,1.2,-1);box(g,2.7,.8,2,0x23576c,0,2,-1);cylinder(g,.05,.05,10,0xe8debb,0,5,1);}
 for(let k=0;k<3;k++){const x=40+k*22,z=210+k*20;box(scene,4,1,10,0xf1dfcf,x,-.25,z);box(scene,2.6,1.6,4,0xf0c491,x,1,z-1);cylinder(scene,.06,.06,10,0xf1e6c4,x,5.5,z);const sail=new T.Mesh(new T.ConeGeometry(3,7,3,1,true),material(0xffe3ac));sail.position.set(x,6.5,z);sail.rotation.y=.6;scene.add(sail);}
 createFerris(55,155);
 cylinder(scene,3,5,33,0xf3e6ba,250,16,15);cylinder(scene,5,5,2,0xe65048,250,30,15);cylinder(scene,2.8,2.8,5,0xffd16b,250,34,15);sphere(scene,3.6,0xe05f48,250,38,15);
 for(let k=0;k<15;k++)box(scene,12,4,6,[0xde6441,0x229c9c,0xf0b947][k%3],-320+(k%3)*14,2+Math.floor(k/6)*4,-10-Math.floor(k/3)*8);
 for(let z=-30;z<100;z+=65){box(scene,2,32,2,0xe6a730,-315,16,z);box(scene,60,2,2,0xe6a730,-298,32,z);lineBetween(scene,new T.Vector3(-315,32,z),new T.Vector3(-270,19,z),0xf4c557,.13);}
 const ramp=box(scene,8,1.4,12,0xf4b137,17,.6,210);ramp.rotation.x=.2;label(scene,'LUNA PIER','#ffdf7b',55,5,115,18,3);
 box(scene,15,9,10,0x216f83,-35,4.5,67);label(scene,'LA PERLA / BAR','#ff69c0',-35,6,61.8,14,2.3);label(scene,'MARINA SOCIAL','#6cffe5',-35,3.2,61.7,13,1.4);solids.push({x:-35,z:67,w:15,d:10});
 for(const color of [0xff4cac,0x2adfd7]){const light=new T.PointLight(color,1.6,45,1.3);light.position.set(-29,5,color===0xff4cac?59:75);scene.add(light);}
 batchCityGeometry();
}
function batchCityGeometry(){
 scene.updateMatrixWorld(true);const groups=new Map(),remove=[];
 scene.traverse(m=>{let root=m;while(root.parent&&root.parent!==scene)root=root.parent;if(preCity.has(root)||!m.isMesh||m.material.map||m.material.transparent||m===water)return;const mat=m.material,key=[mat.color.getHex(),mat.emissive?.getHex(),mat.emissiveIntensity,mat.metalness,mat.roughness].join(':');if(!groups.has(key))groups.set(key,{material:mat,parts:[]});const geo=(m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone());geo.applyMatrix4(m.matrixWorld);groups.get(key).parts.push(geo);remove.push(m);});
 for(const group of groups.values()){const merged=new T.BufferGeometry();for(const attr of ['position','normal','uv']){const parts=group.parts.filter(g=>g.attributes[attr]);if(parts.length!==group.parts.length)continue;const length=parts.reduce((n,g)=>n+g.attributes[attr].array.length,0),array=new Float32Array(length);let offset=0;for(const g of parts){array.set(g.attributes[attr].array,offset);offset+=g.attributes[attr].array.length;}merged.setAttribute(attr,new T.BufferAttribute(array,parts[0].attributes[attr].itemSize));}const m=new T.Mesh(merged,group.material);if([0x273344,0x303a4c].includes(group.material.color.getHex()))roadMaterials.push(group.material);m.castShadow=true;m.receiveShadow=true;scene.add(m);group.parts.forEach(g=>g.dispose());}
 remove.forEach(m=>{m.parent.remove(m);m.geometry.dispose();});
}
export let ferris;
function createFerris(x,z){ferris=new T.Group();ferris.position.set(x,0,z);scene.add(ferris);const center=new T.Vector3(0,28,0);for(const s of [-1,1])lineBetween(ferris,new T.Vector3(s*12,0,0),center,0xf7d8b0,.6);const ring=new T.Mesh(new T.TorusGeometry(22,.36,8,80),glow(0xffc06c));ring.position.y=28;ferris.add(ring);for(let k=0;k<16;k++){const a=k*Math.PI/8,px=Math.cos(a)*22,py=28+Math.sin(a)*22;lineBetween(ferris,center,new T.Vector3(px,py,0),0xe6b1a5,.09);box(ferris,3,2.5,2.5,[0xff568a,0x4de9df,0xffbc54][k%3],px,py-1,0);sphere(ferris,.5,0xffe0a1,px,py,0);}label(ferris,'COSTA LUNA','#ffe6ae',0,1,1,22,3);}
