// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        bird:{
            default:null,
            type:cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:
    createRandom(min,max){
        return Math.random() * (max - min) + min;
    },
    onLoad () {
        window._global = {};
        let action = [];
        for(let i = 0;i<100;i++){
            action.push(cc.rotateBy(this.createRandom(0,2),this.createRandom(-700,700)))
        }
        let list = cc.sequence(...action)
        this.bird.runAction(list);
    },

    start () {

    },

    // update (dt) {},
});
