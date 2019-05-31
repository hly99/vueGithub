<template>
<div class="wrap">
    <h1>畅销书排行:</h1>
    <table>
        <tr>
            <th>序号</th>
            <th>书名</th>
            <th>作者</th>
            <th>价格</th>
        </tr>
        <tr v-for="(i,key) in book" :key="key">
            <td>{{1+key}}</td>
            <td>{{i.name}}</td>
            <td>{{i.author}}</td>
            <td>{{i.price}}</td>
            <td><el-button type="primary" @click="edit(i)">编辑</el-button><el-button type="warning" @click="del(i)">删除</el-button></td>
        </tr>
    </table>
    <h1>添加与修改</h1>
    <p>书名</p>
    <el-input v-model="booksm" placeholder="请输入内容"></el-input>
    <p>作者</p>
    <el-input v-model="bookzz" placeholder="请输入内容"></el-input>
    <p>价格</p>
    <el-input v-model="bookjg" placeholder="请输入内容"></el-input>
    <el-button type="success" @click="bookadd()" v-if="and">添加</el-button>
    <el-button type="success" @click="update()" v-if="!and">修改</el-button>
</div>
</template>
<script>
var books = [{
		name: "红楼梦",
		author: "曹雪芹",
		price: 32
	}, {
		name: "水浒传",
		author: "施耐庵",
		price: 30
	}, {
		name: "西游记",
		author: "吴承恩",
		price: 40
	}, {
		name: "三国演义",
		author: "罗贯中",
		price: 39
	}];
	localStorage.books = JSON.stringify(books);
export default {
    data(){
        return{
            booksm:'',
            bookzz:'',
            bookjg:'',
            book:JSON.parse(localStorage.getItem("books")), 
            location:0,
            and:true
        }
    },
    methods:{
        del(book){
            var i=this.book.indexOf(book)
            this.book.splice(i,1)
            this.Preservation()
        },
        bookadd(){
            var add={}
            add.name=this.booksm
            add.author=this.bookzz
            add.price=this.bookjg
            this.book.push(add)
            this.booksm=''
            this.bookzz=''
            this.bookjg=''
            this.Preservation()
        },
        edit(book){
            this.booksm=book.name
            this.bookzz=book.author
            this.bookjg=book.price
            this.location=this.book.indexOf(book)
            this.and=false
        },
        update(){
            this.$set(this.book[this.location],'name',this.booksm)
            this.$set(this.book[this.location],'author',this.bookzz)
            this.$set(this.book[this.location],'price',this.bookjg)
            this.booksm=''
            this.bookzz=''
            this.bookjg=''
            this.and=true
            this.Preservation()
        },
        Preservation(){
            localStorage.setItem("books",JSON.stringify(this.book))
        }
    },
    computed:{
        sum(){
            var js=0
            for(var i of this.book){
                sum += parseInt(i.price)
            }
            return js
        }
    }
}
</script>
<style>
.wrap {
  width: 1000px;
  margin: auto;
}
</style>
