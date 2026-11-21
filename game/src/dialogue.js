import {state} from './state.js';
export const conversations=[
 ['ELIAS','Smuggler · Fixer','The boat sails in two minutes. Shake that chopper and get to the pier!'],
 ['INES','Market broker','The old town remembers every debt. Bring my package back intact.'],
 ['SOFIA','Mechanic','Follow the lighthouse. That engine can take more than you think.'],
 ['DARIO','Driver','They blocked the boulevard. Find a gap, Maya. There is always a gap.'],
 ['MATEO','Lookout','Neon hides nothing from the air. Use my eyes and Dario’s smoke.'],
 ['ELIAS','Smuggler · Fixer','North docks. Blue container. We settle this before the tide turns.'],
 ['INES','Market broker','The money is clean. The people guarding it are another story.'],
 ['SOFIA','Mechanic','Rain means less grip. Easy on the throttle, queen.'],
 ['DARIO','Driver','One coast, one road, one chance. Let’s make it ours.'],
 ['MAYA','Wheelwoman','No more running for somebody else. Tonight, Costa Luna is ours.']];
export function dialogue(){return conversations[state.dialogue%conversations.length];}
