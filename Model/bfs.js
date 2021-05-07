//Her er benyttet inspiration fra Nicolais forelæsningsvideo.
export class Node{
    constructor(){
        this.connections = new Map()
        this.attributes = new Map()
    }
}

export class Graph{
    constructor(){
        this.nodes = new Node()
    }

    addNode(node){
        this.nodes.connections.set(node, [])
        this.nodes.attributes.set(node, [])
    }

    addNodeAttribute(node, attribute){
        this.nodes.attributes.get(node).push(attribute)
    }

    addEdge(source, destination){
        this.nodes.connections.get(source).push(destination)
    }

    ShortestPathBFS(startingNode, endNode){
        let visitedNodes = []
        let queue = []

        let parents = {}
        visitedNodes[startingNode] = true
        queue.push(startingNode)
        while (queue.length > 0){
            const currentNode = queue.shift()
            const connections = this.nodes.connections.get(currentNode)

            for (let node of connections){
                if (!visitedNodes[node]){
                    visitedNodes[node] = true
                    parents[node] = currentNode
                    queue.push(node)
                    if (node == endNode){
                        return graph.backtrack(parents, startingNode, endNode)
                    }
                }
            }
        }

        return ["This array has a length of 1"]
    }

    backtrack(parents, startingNode, endNode){
        const path = [endNode]
        while(path[path.length -1 ] != startingNode){
            path.push(parents[path[path.length-1]])
        }
        return path.reverse()
    }
}

let graph = new Graph()