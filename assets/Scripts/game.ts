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
    blockNodeArr:Array<any> = [[],[],[]]

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        window.game = this
        this.blockNum = 3
        this.initBlock(this.blockNum)
    }

   

    update (dt) {}

    //初始化小方块
    initBlock(num){

        if (num >=6){
            num = 6
        }

        for (let i = 0;i<this.blockNodeArr.length; i++){
            let arr = this.blockNodeArr[i]
            for(let j = 0;j<arr.length;j++){
                arr[j].destroy()
            }
        }
        this.blockNodeArr = [[],[],[]]

        for (let i = 0; i<num; i++){
            let blockNode = cc.instantiate(this.blockPrefab)
            this.blockLayerNode.addChild(blockNode)
            
            blockNode.x = this.baseNodeArr[0].x
            blockNode.y = -122 + 44 * i

            let blockIndex = num - i - 1
            blockNode.baseIndex = 0
            blockNode.blockIndex = blockIndex

            blockNode.getComponent('block').init(blockIndex)

            this.blockNodeArr[0].push(blockNode)
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
    placeBlock(blockNode){

        let baseIndex = this.baseIndexCheck(blockNode.position)
        if (baseIndex == -1){
            return false
        }

        if(blockNode.baseIndex == baseIndex){
            return false
        }

        let arr = this.blockNodeArr[baseIndex]
        //最后的一个节点
        if(arr.length && arr[arr.length - 1].blockIndex <= blockNode.blockIndex){
            return false
        }

        let baseNode = this.baseNodeArr[baseIndex]
        blockNode.x = baseNode.x


        this.blockNodeArr[blockNode.baseIndex].pop()
        this.blockNodeArr[baseIndex].push(blockNode)

        blockNode.baseIndex = baseIndex

        let length = this.blockNodeArr[baseIndex].length
        blockNode.y = -122 + (length -1) *44

        //通关条件
        if(this.blockNodeArr[2].length == this.blockNum){
            console.log('通关了')
            this.initBlock(++this.blockNum)
        }

        return true
    }
}
