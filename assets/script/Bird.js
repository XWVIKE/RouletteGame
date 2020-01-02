// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
function createRandom(min,max){
    return Math.random() * (max - min) + min;
};
function position(angle){
    // angle = 360-angle;
    console.log(angle)
    let Quadrant = 1,radius = 222,x = 0,y = 0,deg = 0,list = [];
    if(angle===90||angle===0||angle===180||angle===270||angle===360){
        list = angle===0||angle===360?[0,-222]:angle===90?[222,0]:angle===180?[0,222]:[-222,0];
    }else{
        if((angle<90&&angle>0)||(angle>-360&&angle<-270)) {Quadrant = 2;deg = 90-angle};
        if((angle<180&&angle>90)||(angle>-270&&angle<-180)) {Quadrant = 3;deg = 180-angle};
        if((angle<270&&angle>180)||(angle>-180&&angle<-90)) {Quadrant = 4;deg = angle-180};
        if((angle<360&&angle>270)||(angle>-90&&angle<0)) {Quadrant = 1;deg = 360-angle};
    
    radius =  Quadrant===1||Quadrant===2?222:-222;
    x = radius*Math.sin(deg);
    y = radius*Math.cos(deg);
    console.log(x+' '+y)
    list = [x,y];
    }
    return list;
}
cc.Class({
    extends: cc.Component,
    properties: {
        bg:cc.Node,
        bird:cc.Node,
        fuck:cc.Prefab
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onCollisionEnter(other, self){
        let {angle} = this.bird;
        if(angle<0.0){
            while(1){
                angle+=360;
                if(angle>0.0&&angle<360) break
            }
        }else if(angle>360){
            while(1){
                angle-=360;
                if(angle>0.0&&angle<360) break
            }
        }
        let node = cc.instantiate(this.fuck);
        node.parent = this.node;
        let list = position(angle);
        node.setPosition(list[0],list[1]);
    },
    start () {

    },

    update (dt) {},
});
