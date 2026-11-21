const T = window.THREE;
export { T };
export const scene = new T.Scene();
export const camera = new T.PerspectiveCamera(58, innerWidth / innerHeight, .1, 1100);
export const renderer = new T.WebGLRenderer({canvas:document.querySelector('#world'),antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(1);renderer.setSize(innerWidth,innerHeight);
renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFShadowMap;renderer.shadowMap.autoUpdate=false;
renderer.outputEncoding=T.sRGBEncoding;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=.85;
export const sun=new T.DirectionalLight(0xffc078,2.5);
sun.position.set(-65,80,-50);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);
Object.assign(sun.shadow.camera,{left:-110,right:110,top:110,bottom:-110,near:1,far:350});sun.shadow.bias=-.0005;scene.add(sun);
export const ambient=new T.HemisphereLight(0x9bdfff,0x844e50,.65);scene.add(ambient);
export function material(color,metalness=0,roughness=.7){return new T.MeshStandardMaterial({color,metalness,roughness});}
export function box(parent,w,h,d,color,x=0,y=0,z=0,mat){const m=new T.Mesh(new T.BoxGeometry(w,h,d),mat||material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;}
export function cylinder(parent,r1,r2,h,color,x=0,y=0,z=0,sides=12){const m=new T.Mesh(new T.CylinderGeometry(r1,r2,h,sides),material(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
export function sphere(parent,r,color,x,y,z){const m=new T.Mesh(new T.SphereGeometry(r,12,8),material(color));m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
export function glow(color){return new T.MeshStandardMaterial({color,emissive:color,emissiveIntensity:2,roughness:.25});}
export function label(parent,text,color,x,y,z,width=10,height=2){const c=document.createElement('canvas');c.width=1024;c.height=160;const q=c.getContext('2d');q.fillStyle='#101b29';q.fillRect(0,0,1024,160);q.strokeStyle=color;q.lineWidth=12;q.strokeRect(7,7,1010,146);q.font='bold 85px sans-serif';q.textAlign='center';q.textBaseline='middle';q.fillStyle=color;q.fillText(text,512,82);const m=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({map:new T.CanvasTexture(c),side:T.DoubleSide}));m.position.set(x,y,z);m.rotation.y=Math.PI;parent.add(m);return m;}
export function lineBetween(parent,a,b,color,r=.08){const v=new T.Vector3().subVectors(b,a),m=new T.Mesh(new T.CylinderGeometry(r,r,v.length(),6),material(color));m.position.copy(a).add(b).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),v.normalize());parent.add(m);return m;}
export function batchModel(root,keep=[]){root.updateMatrixWorld(true);const inverse=new T.Matrix4().copy(root.matrixWorld).invert(),groups=new Map(),remove=[];root.traverse(m=>{if(!m.isMesh||keep.includes(m)||m.material.map)return;const mat=m.material,key=[mat.color.getHex(),mat.emissive?.getHex(),mat.emissiveIntensity,mat.metalness,mat.roughness].join(':');if(!groups.has(key))groups.set(key,{mat,parts:[]});const geo=m.geometry.index?m.geometry.toNonIndexed():m.geometry.clone();geo.applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,m.matrixWorld));groups.get(key).parts.push(geo);remove.push(m);});for(const {mat,parts} of groups.values()){const g=new T.BufferGeometry();for(const attr of ['position','normal','uv']){const n=parts.reduce((v,p)=>v+p.attributes[attr].array.length,0),array=new Float32Array(n);let at=0;parts.forEach(p=>{array.set(p.attributes[attr].array,at);at+=p.attributes[attr].array.length;});g.setAttribute(attr,new T.BufferAttribute(array,parts[0].attributes[attr].itemSize));}const mesh=new T.Mesh(g,mat);mesh.castShadow=true;mesh.receiveShadow=true;root.add(mesh);parts.forEach(p=>p.dispose());}remove.forEach(m=>{m.parent.remove(m);m.geometry.dispose();});}
addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight);});
