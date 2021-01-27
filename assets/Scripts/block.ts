// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.SpriteAtlas)
    colorAtlas: cc.SpriteAtlas = null;

    onLoad(){
        this.node.on('touchstart',this.onTouchStart,this)
        this.node.on('touchmove',this.onTouchMove,this)
    }

    onDestroy(){
        this.node.off('touchstart',this.onTouchStart,this)
        this.node.off('touchmove',this.onTouchMove,this)
    }

    init(blockIndex){
        this.node.getComponent(cc.Sprite).spriteFrame = this.colorAtlas.getSpriteFrame(blockIndex)
        this.node.width = 80 + blockIndex * 40
    }
   
    onTouchStart(e){
        console.log('点击')
    }
    onTouchMove(e){
        let delta = e.getDelta()
        this.node.x += delta.x
        this.node.y += delta.y
    }
}
