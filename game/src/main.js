import {T,scene,camera,renderer,sun} from './scene.js';
import {state} from './state.js';
import {buildCity,city} from './city.js';
import {createCar,updateDriving} from './vehicles.js';
import {createMotorcycle} from './motorcycles.js';
import {createTraffic,updateTraffic} from './traffic.js';
import {createPedestrians,updatePedestrians} from './pedestrians.js';
import {createDispatch} from './dispatch.js';
import {updatePursuit} from './pursuit.js';
import {updateHelicopter} from './helicopter.js';
import {updateRoadblock} from './roadblocks.js';
import {createHostiles,updateCombat} from './combat.js';
import {updateMissions} from './missions.js';
import {updateActivities} from './activities.js';
import {updateRace} from './races.js';
import {updateCrew} from './crew.js';
import {updateEffects} from './effects.js';
import {updateDayNight,updateSky} from './daynight.js';
import {updateWeather} from './weather.js';
import {updateAudio} from './audio.js';
import {input} from './input.js';
import {updateHUD} from './hud.js';
import {stageShot} from './shots.js';
buildCity();state.vehicle=createCar(0,0,0xff4c2b);createMotorcycle(5,35);createMotorcycle(-24,-35);createTraffic();createPedestrians();createDispatch();createHostiles();stageShot();renderer.shadowMap.needsUpdate=true;
const target=new T.Vector3(),desired=new T.Vector3();let previous=performance.now(),hudClock=0,shadowClock=0;
function updateCamera(dt){const a=state.angle;const distance=state.inVehicle?9.3:8;desired.set(state.x-Math.sin(a)*distance+Math.cos(a)*1.7,state.inVehicle?4.7:4.2,state.z-Math.cos(a)*distance-Math.sin(a)*1.7);camera.position.lerp(desired,Math.min(1,dt*8));target.set(state.x+Math.sin(a)*17,1.1,state.z+Math.cos(a)*17);camera.lookAt(target);}
function frame(now){const dt=Math.min(.04,(now-previous)/1000);previous=now;state.elapsed+=dt;
 if(!state.paused&&state.menu!=='start'){updateDriving(dt,input,city);updateCombat(dt,input,city);updateTraffic(dt);updatePedestrians(dt);updatePursuit(dt);updateRoadblock(dt);updateCrew(dt);updateMissions(dt);updateActivities(dt);updateRace(dt);}
 updateHelicopter(dt);updateDayNight(state.paused?0:dt);updateSky();updateWeather(dt);updateEffects(dt);updateAudio();updateCamera(dt);
 sun.position.set(state.x-65,80,state.z-50);sun.target.position.set(state.x,0,state.z);sun.target.updateMatrixWorld();
 shadowClock+=dt;if(shadowClock>.7){renderer.shadowMap.needsUpdate=true;shadowClock=0;}hudClock+=dt;if(hudClock>.1){updateHUD();hudClock=0;}renderer.render(scene,camera);requestAnimationFrame(frame);
}
camera.position.set(state.x+1.7,4.7,state.z-10.5);updateCamera(1);window.CostaLuna={state,input,city};state.detection='LIVE CITY UPLINK';updateHUD();requestAnimationFrame(frame);
