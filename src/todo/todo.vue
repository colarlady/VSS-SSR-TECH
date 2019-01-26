<template>
    <section class="real-app">
        <input type="text" class="add-input" placeholder="接下去要做什么？" autofocus='autofocus' @keyup.enter="addTodo">
        <item
            :todo = "todo"
            v-for="todo in filteredTodos"
            :key='todo.id'
            @del = "deleteTodo"
        />
        <tabs 
            :filter = "filter"
            :todos = "todos"
            @toggle = "toggleFilter"
            @clearAllCompleted = "clearAllCompleted"
        ></tabs>
    </section>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0;
export default {
    data(){
        return{
            todos:[],
            filter:'all'
        }
    },
    components:{
            Item,
            Tabs
    },
    methods:{
        addTodo(e){
            const val = e.target.value.trim()
           if(!val)
           return;
             this.todos.unshift({
                   id:id++,
                   content:val,
                    completed:false
             });
              e.target.value = '';
        },
        toggleFilter(state){
            console.log(state);
            this.filter = state;
        },
        clearAllCompleted(){
            this.todos = this.todos.filter(todo=>!todo.completed)
        },
        deleteTodo(id){
            this.todos.splice(this.todos.findIndex(todo=>todo.id==id),1)
        }
    },
    computed:{
        filteredTodos(){
            
            if(this.filter=='all'){
                return this.todos
            }
            const completed = this.filter==='completed'
            return this.todos.filter(todo=>completed===todo.completed)
        }
    }

}
</script>

<style lang="scss" scoped>
    .real-app {
        width:600px;
        margin: 0 auto;
        box-shadow: 0 0 5px #666;
        .add-input {
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 24px;
            line-height: 1.4em;
            border:0;
            outline: none;
            padding: 16px 16px 16px 60px;
            border:none;
            box-shadow:inset 0 -2px 1px rgba(0,0,0,0.03);
            box-sizing: border-box;
            font-family: inherit;
            font-weight: inherit;
            color:inherit;

        }
    }
</style>


