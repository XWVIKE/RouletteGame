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
        bg:cc.Node,
        coin:cc.Node
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.bg.on(cc.Node.EventType.TOUCH_START,this.move,this)
    },
    onCollisionEnter(other, self){
        this.coin.runAction(cc.moveBy(0,cc.v2(0,-500)));
    },
    move(){
        // console.log('fuck')
        let action = [cc.moveBy(0.5,cc.v2(0,500)),cc.rotateBy(0.5,90)];
        this.coin.runAction(cc.spawn(...action))
    },
    start () {
    },

    update (dt) {
    },
});
