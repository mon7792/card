import {Player} from './player';


let plyer = new Player("player-1", 100);

test('eval player name', ()=>{
    expect(plyer.getName).toEqual("player-1");
})

test('eval player coin', ()=>{
    expect(plyer.getCoin).toEqual(100);
})