import Comparator from '../../utils/comparator/Comparator.js'
import HashTable from '../hash-table/HashTable.js'

export default class BinaryTreeNode{
    constructor(value = null){
        this.left = null
        this.right = null
        this.parent = null
        this.value = value

        //任何与节点有关的元信息都可以存储在这里。
        this.meta = new HashTable()

        //这个比较器是用来比较二叉树节点之间的关系。
        this.nodeComparator = new Comparator()
    }

    get leftHeight(){
        if(!this.left){
            return 0
        }

        return this.left.height + 1
    }



    get rightHeight(){
        if(!this.right){
            return 0
        }

        return this.right.height + 1
    }

    get height(){
        return Math.max(this.leftHeight, this.rightHeight)
    }

    get balanceFactor(){
        return this.leftHeight - this.rightHeight
    }

    get uncle(){
        if(!this.parent){
            return undefined
        }

        if(!this.parent.parent){
            return undefined
        }
        // 所以现在我们知道，当前节点有祖父母，而这个
        // 祖父母有两个孩子。让我们找出谁是叔叔。
        if(this.nodeComparator.equal(this.parent, this.parent.parent.left)){
            return this.parent.parent.right
        }

        return this.parent.parent.left
    }


    setLeft(node){
        if(this.left){
            this.left.parent = null
    }

        this.left = node

        if(this.left){
            this.left.parent = this
        }

        return this
    }



    setRight(node){
        if(this.right){
            this.right.parent = null
        }
        this.right = node

        if(node){
            this.right.parent = this
        }

        return this
    }


    remove(nodeToRemove){
        if(this.left && this.nodeComparator.equal(this.left, nodeToRemove)){
            this.left = null
            return true
        }

        if (this.right && this.nodeComparator.equal(this.right, nodeToRemove)) {
            this.right = null;
            return true;
          }
        
          return false
    }



    replaceChild(nodeToReplace, replacementNode){
        if(!nodeToReplace || !replacementNode){
            return false
        }

        if(this.left && this.nodeComparator.equal(this.left, nodeToReplace)){
            this.left = replacementNode
            return true
        }


        if(this.right && this.nodeComparator.equal(this.right, nodeToReplace)){
            this.right = replacementNode
            return true
        }


        return false
    }


    static copyNode(courceNode, targetNode){
        targetNode.setValue(sourceNode.value)
    }
}
    