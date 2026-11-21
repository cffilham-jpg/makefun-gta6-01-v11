import {state} from './state.js';
export const ranks=['STREET RUNNER','COASTAL OUTLAW','MARINA GHOST','COSTA LEGEND'];
export function respectRank(){const n=Math.min(3,Math.floor(state.rp/600));return {name:ranks[n],progress:state.rp%600,total:600,index:n};}
