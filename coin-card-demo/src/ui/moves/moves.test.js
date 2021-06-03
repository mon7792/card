import {Moves, BLIND} from './moves';

let mv = new Moves();


test('evaluate Moved', ()=>{
    mv.evaluateMove(BLIND);
})