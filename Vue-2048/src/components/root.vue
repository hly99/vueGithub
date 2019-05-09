<template>
    <div class="wrapper">
        <h2>总分：{{sum}} 历史最高分：{{max}}</h2>
        <button @click="start()">重新开始</button>
        <div class="box" >
        <div class="row" v-for="(row,key) in which" :key="key" >
        <div class="col" :class="'n-'+col" v-for="(col,kk) in row" :key="kk"><p v-if="col!=0">{{col}}</p></div>
    </div>
</div>
</div>
</template>
<script>
import { constants } from 'crypto';
export default {
    data(){
        return{
            which:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
            sum:0,
            max:0
        }
    },
    methods:{
    start(){
        if(this.sum>this.max){
            localStorage.setItem('max', this.sum)
        }
        this.max=localStorage.getItem('max')
        this.which=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]
        this.sum=0
        this.generate()
        this.generate()
    },
    kecode(){
     let vm = this
    document.addEventListener("keyup",function(e){
    switch (e.keyCode) {
        case 38:
            vm.moveUp()
            break
        case 40:
            vm.moveDowm()
            break
        case 37:
            vm.moveLeft()
            break
        case 39:
            vm.moveRight()
            break
            }
    });
},
    moveLeft(){
    for(var i=0;i<4;i++){
        var arr = this.which[i]
        for(var j=0;j<4;j++){
            for(var next=j+1;next<4;next++){
                if(arr[next]===0){
                    continue
                }
                if(arr[j]===0){
                    arr[j]=arr[next]
                    arr[next]=0
                    j--
                }else if(arr[j]===arr[next]){
                    arr[j]=arr[j]*2
                    arr[next]=0
                    this.sum +=arr[j]
                }
                break
            }
        }
        this.which[i]=arr
    }
    this.generate()
    this.$forceUpdate()  
},
    moveUp(){
        var which=this.which
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            for(var next=j+1;next<4;next++){
                if(which[next][i]===0){
                    continue
                }
                if(which[j][i]===0){
                    which[j][i]=which[next][i]
                    which[next][i]=0
                    j--
                }else if(which[j][i]===which[next][i]){
                    which[j][i]=which[j][i]*2
                    which[next][i]=0
                    this.sum += which[j][i]
                }
                break
            }
        }
    }
    this.which=which
    this.generate()
    this.$forceUpdate()
   
},
moveRight(){
    for(var i=0;i<4;i++){
        var arr = this.which[i]
        for(var j=3;j>=0;j--){
            for(var next=j-1;next>=0;next--){
                if(arr[next]===0){
                    continue
                }
                if(arr[j]===0){
                    arr[j]=arr[next]
                    arr[next]=0
                    j++
                }else if(arr[j]===arr[next]){
                    arr[j]=arr[j]*2
                    arr[next]=0
                    this.sum +=arr[j]
                }
                break
            }
        }
        this.which[i]=arr
    }
    this.generate()
    this.$forceUpdate()
},
moveDowm(){
    var which = this.which
    for(var i=3;i>=0;i--){
        for(var j=3;j>=0;j--){
            for(var next=j-1;next>=0;next--){
                if(which[next][i]===0){
                    continue
                }
                if(which[j][i]===0){
                    which[j][i]=which[next][i]
                    which[next][i]=0
                    j++
                }else if(which[j][i]===which[next][i]){
                    which[j][i]=which[j][i]*2
                    which[next][i]=0
                    this.sum +=which[j][i]
                }
                break
            }
        }
    }
    this.which = which
    this.generate()
    this.$forceUpdate()
},
generate(){
    var empty=[]
    var which=this.which
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(which[i][j]===0){
                empty.push({x:i,y:j})
            }
        }
    }
    if(empty.length<1){
        return false
    }
    var pos=empty[Math.floor((Math.random()*empty.length))]
    this.which[pos.x][pos.y]=Math.random()<0.5?2:4;
}
    },
    mounted(){
    this.max=localStorage.getItem('max')
    this.kecode()
    this.generate()
    this.generate()  
    this.$forceUpdate()
    }
}
</script>
<style>
.wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}
.box {
    width: 400px;
    height: 400px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 5px;
    background: #bbada0;
    
}
.row {
        width: 100%;
        height: 23%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        
    }
    .col {
        width: 23%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        border-radius: 3px;
        background: #cec1b3;
        }
    .n-2 {
            background: #f8f3e8;
        }
        .n-4 {
            background: #ede0c8;
        }
        
        .n-8 {
            background: #f26179;
        }
        .n-16 {
            background: #f59563;
        }
        .n-32 {
            background: #f67c5f;
        }
        .n-64 {
            background: #f65e36;
        }
        .n-128 {
            background: #edcf72;
        }
        .n-256 {
            background: #edcc61;
        }
        .n-512 {
            background: #9c0;
        }
        .n-1024 {
            background: #3365a5;
        }
        .n-2048 {
            background: #09c;
        }
        .n-4096 {
            background: #a6bc;
        }
        .n-8192 {
            background: #93c;
            }
</style>
