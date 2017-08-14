<template>
    <ul>
        <li v-for="v in list" v-text="v"></li>
    </ul>
</template>

<script>
        export default {
            data(){
                return {
                    list:["王屋山", "衡山", "华山", "泰山", "嵩山","太行山","大山","九龙山"]
                }
            }
        }
</script>

<style>
    ul{
        width: 800px;
        margin: 0 auto;
        text-align: center;
        list-style: none;
    }
    li{
        padding: 10px 0;
        margin: 6px 0;
        background: skyblue;
        -webkit-transition: all .3s;
        color: purple;
        box-shadow: 15px 5px 3px #000;
    }
    li:hover{
        background: slateblue;
        color: aliceblue;
    }
</style>