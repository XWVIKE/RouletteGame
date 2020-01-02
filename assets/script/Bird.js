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
    let Quadrant = 1,radius = 180,x = 0,y = 0,deg = 0,list = [];
    if(angle===90||angle===0||angle===180||angle===270||angle===360){
        list = angle===0||angle===360?[0,-222]:angle===90?[222,0]:angle===180?[0,222]:[-222,0];
    }else{
        if(angle<360&&angle>270){Quadrant = 4;deg = 90-(360-angle)};
        if(angle<270&&angle>180){Quadrant = 1;deg = (360-angle)-90};
        if(angle<180&&angle>90){Quadrant = 2;deg = 270-(360-angle)};
        if(angle<90&&angle>0){Quadrant = 3;deg = (360-angle)-270};

    x = radius*Math.cos((deg/360)*2*Math.PI);
    y = radius*Math.sin((deg/360)*2*Math.PI);

    x = Quadrant===1||Quadrant===4?x:-x;
    y = Quadrant===1||Quadrant===2?y:-y;

    list = [x,y];
    }
    return list;
}

const coinPosition = [];

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
        };
        let C = Math.PI*this.bird.width;
        let A = 78/C;
        let B = 2*Math.PI*A;
        let T = B/(Math.PI/180);
        let MIN = coinPosition.findIndex((item)=>{
            return angle>item;
        });
        let MAX = coinPosition.findIndex((item)=>{
            return angle<item;
        })
        // console.log(angle+' '+coinPosition[MIN]+ ' ' +coinPosition[MAX]);
        if(coinPosition.length===0) this.createCoin(coinPosition,angle);
        
        if(coinPosition.length===0||
            coinPosition.length===1&&angle>coinPosition[0]+20&&angle<coinPosition[0]-20||
            coinPosition.length>=2&&((MAX===-1&&angle>coinPosition[coinPosition.length-1]+20)||(MIN===-1&&angle<coinPosition[0]-20))||
            coinPosition.length>=2&&coinPosition[MIN]+40<coinPosition[MAX]&&angle-coinPosition[MIN]>20&&coinPosition[MAX]-angle>20
            ){
        }else{
            console.log(angle)
            console.log(coinPosition)
        }
    },
    createCoin(arr,angle){
            arr.push(angle);
            arr.sort((a,b)=>{return a-b});
            let node = cc.instantiate(this.fuck);
            node.parent = this.node;
            let list = position(angle);
            node.setPosition(list[0],list[1]);
    },
    start () {

    },

    update (dt) {},
});
