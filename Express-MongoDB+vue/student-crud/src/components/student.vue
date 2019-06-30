<template>
    <div>
        <div align="center">
            姓名：<input type="text" v-model="name"/><br/><br/>
            年龄：<input type="text" v-model="age"/><br/><br/>
            <button @click="add" v-if="en">保存</button>
            <button @click="updata" v-if="!en">修改</button>
        </div>
        <br/><br/>
        <table border="1" cellpadding="5" cellspacing="0" width="500" align="center">
            <tr>
            <th>#</th>
            <th>姓名</th>
            <th>年龄</th>
            <th>操作</th>
            </tr>

            <tr v-for="(result,index) in data" :key="index" :class="(index % 2) == 0 ? 'odd' : '' ">
            <td>{{index + 1}}</td>
            <td>{{result.uid}}</td>
            <td>{{result.title}}</td>
            <td width="100">
                <button @click="edit(index,result._id)">编辑</button>
                <button @click="del(index,result._id)">删除</button>
            </td>
            </tr>
        </table>
    </div>
</template>
<script>
import { constants } from 'crypto';
export default {
    data(){
        return{
            data:{},
            name: undefined,
            age:undefined,
            index: -1,
            id:undefined,
            en:true
        }
    },
    methods:{
        inres(){
        this.axios.get('/api/').then(res =>this.data=res.data)
        .catch(function(err){
        console.log(err);
        });
        },
        add(){
            const mongo = {
                uid:this.name,
                title:this.age
            }
            this.axios.post('/api/',mongo)
            this.inres()
            this.name=undefined,
            this.age=undefined
        },
        updata(){
            const mongo = {
                id:this.id,
                uid:this.name,
                title:this.age
            }
            this.axios.post('/api/index.html',mongo)
            this.inres()
            this.name=undefined,
            this.age=undefined
            this.id=undefined
            this.en=true
        },
        edit(index,id){
            this.en=false
            this.name=this.data[index].uid
            this.age=this.data[index].title
            this.id=id
        },
        del(index,id){
            this.axios.get('/api/del.html',{
                params:{
                    id:id
                }
            }).then(res =>console.log(res))
            this.inres()
        }
    },
    mounted: function() {   
    this.inres()
    }
}
</script>
