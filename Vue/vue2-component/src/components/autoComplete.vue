<template>
    <!-- 具有带输入建议的输入框 -->
    <div class='autoComplete'>
        <el-autocomplete
            ref="autoComplete"
            placeholder="请选择您查询的组件页面"
            v-model="value"
            size="large"
            class="autoComplete"
            clearable
            :fetch-suggestions="querySearchSync"
            @select="handleSelect"
        >   
            <!-- 这里的item是fetch-suggestion返回回来的result的每一个item -->
            <template slot-scope="{ item }">
                <div>{{ item.value }}</div>
            </template>
        </el-autocomplete>
    </div>
</template>

<script>
const pinyin = require('pinyin')
export default {
    components: {},
    data() {
        return {
            result:[],
            routerList:[],
            value:''
        };
    },
    methods:{
        // 接收一个搜索关键字和回调函数cb
        querySearchSync(queryString,cb){
            // try{
              this.routerList = this.$router.options.routes
              this.menu = this.routerList.map(item => {
                  return {
                      value:item.meta.title,
                      name:item.name,
                      pinyin:pinyin(item.meta.title,{
                        style:pinyin.STYLE_FIRST_LETTER, // 拼音風格 只要這個拼音的第一個字母
                        heteronym: false   // 多音字風格
                      }),
                      path:item.path
                  }
              })
            
            const result = []
            this.menu.some(item => {
                // 如果搜索的value或者拼音首字母相符合那么插入result里面
                if(item.value.includes(queryString) || item.pinyin.join('').includes(queryString)){
                    result.push(item)
                }
            })
            // 调用回调返回result数据作为搜索建议
            cb(result)
        },
        handleSelect({ path }){
            this.$router.push(path)
        }
    }
}
</script>
<style lang='scss' scoped>
.autoComplete{
    width: 100%;
}
</style>