/**
 * Created by Sai Akhil on 13/05/21.
 */

export { Trie }

class TrieNode{
    constructor(){
        this.children = Array(10).fill(null);
        this.parent = null;
    }
}

class ContactNode{
    constructor(name, number, parent){
        this.name = name;
        this.number = number;
        this.parent = parent;
    }
}

class Trie {
    constructor(){
        this.root = new TrieNode();
        this.current = this.root;

        let init = [
            ["Akhil", "891900"],
            ["Aravind", "967901"],
            ["Dad", "994936"],
            ["Mom", "961825"],
            ["Sista","967688"]
        ];

        for(let i=0;i<init.length;i++){
            this.add(init[i][1], init[i][0], 0);
        }
    }

    add(number, name, pos = 0, node = this.root){

        if(pos===number.length-1){
            node.children[number[pos]-'0'] = new ContactNode(name, number, node);
            return;
        }

        if(node.children[number[pos]-'0']===null){
            let newnode = new TrieNode();
            node.children[number[pos]-'0'] = newnode;
            newnode.parent = node;
        }
        this.add(number, name, pos+1, node.children[number[pos]-'0']);
    }

    findAll(node){
        // Contact leaf node
        if(node===null)
            return;

        if(node instanceof ContactNode){
            this.res.push(node);
            return;
        }

        for(let i=0;i<10;i++){
            this.findAll(node.children[i]);
        }
    }

    findNext(step){
        if(step===-1){
            this.current = this.current.parent;
        } else if(step!==-2) {
            if(this.current.children[step-'0']===null){
                let newnode = new TrieNode();
                this.current.children[step-'0'] = newnode;
                newnode.parent = this.current;
            }

            this.current = this.current.children[step-'0'];
        }
        this.res = [];
        this.findAll(this.current);
        return this.res;
    }

    del(number, pos = 0, node = this.root){
        if(pos===number.length-1){
            node.children[number[pos]-'0'] = null;
            return;
        }

        if(node.children[number[pos]-'0']===null){
            let newnode = new TrieNode();
            node.children[number[pos]-'0'] = newnode;
            newnode.parent = node;
        }
        this.del(number, pos+1, node.children[number[pos]-'0']);
    }
}