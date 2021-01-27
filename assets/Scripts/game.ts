// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    [x: string]: any;

    @property(cc.Node)
    blockLayerNode: cc.Node = null
    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null
    @property(cc.Node)
    baseNodeArr:Array<cc.Node> = []


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.game = this
        this.initBlock(3)
    }

   

    update (dt) {}

    //初始化小方块
    initBlock(num){

        for (let i = 0; i<num; i++){
            let blockNode = cc.instantiate(this.blockPrefab)
            this.blockLayerNode.addChild(blockNode)
            
            blockNode.x = this.baseNodeArr[0].x
            blockNode.y = -122 + 44 * i


            blockNode.getComponent('block').init(num - i - 1 )
        }

        
    }

    //判断移动到某个区块
    baseIndexCheck(pos){
        for(let i = 0; i<this.baseNodeArr.length; i++){
            let baseNode = this.baseNodeArr[i]
            if(pos.x >= baseNode.x - baseNode.width / 2 && pos.x <= baseNode.x + baseNode.width / 2 ){
                return i
            }
        }
        return -1
    }

    //放置
    placeBlock(backNode){

        let baseIndex = this.baseIndexCheck(backNode.position)
        if (baseIndex == -1){
            return false
        }

        let baseNode = this.baseNodeArr[baseIndex]
        backNode.x = baseNode.x

        return true
    }
}
