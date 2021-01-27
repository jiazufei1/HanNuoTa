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
    startPos: cc.Vec3;
    canMove: boolean;

    onLoad(){
        this.node.on('touchstart',this.onTouchStart,this)
        this.node.on('touchmove',this.onTouchMove,this)
        this.node.on('touchend',this.onTouchEnd,this)
    }

    onDestroy(){
        this.node.off('touchstart',this.onTouchStart,this)
        this.node.off('touchmove',this.onTouchMove,this)
        this.node.off('touchend',this.onTouchEnd,this)
    }

    init(blockIndex){
        this.node.getComponent(cc.Sprite).spriteFrame = this.colorAtlas.getSpriteFrame(blockIndex)
        this.node.width = 80 + blockIndex * 40
    }
   
    onTouchStart(e){
        this.canMove = true
        this.startPos = this.node.position
        let arr = window.game.blockNodeArr[this.node.baseIndex]
        if (this.node.blockIndex != arr[arr.length-1].blockIndex){
            this.canMove = false
        }
    }
    onTouchMove(e){
        if(!this.canMove)return
        let delta = e.getDelta()
        this.node.x += delta.x
        this.node.y += delta.y
    }

    onTouchEnd(e){
        if(!this.canMove)return
        let canPlace = window.game.placeBlock(this.node)
        if (!canPlace){
            this.node.position = this.startPos
        }
    }
}
