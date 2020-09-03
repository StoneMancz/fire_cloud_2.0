<template>
    <renderless-component-example>
        <div id="bg" v-if="isShowBg"></div>
        <div class="LoopData" v-if="isShowBg">
            <div class="loopList">
                <div class="tableHeader">
                    <span>{{$t('Loop.circuit')}}</span>
                    <span>{{$t('Loop.types')}}</span>
                    <span>{{$t('Loop.Point')}}</span>
                    <span>{{$t('Loop.nodeType')}}</span>
                    <span>{{$t('Loop.status')}}</span>
                    <span>{{$t('Loop.Partition')}}</span>
                    <span>{{$t('Loop.time')}}</span>
                </div>
                <div class="tebleColumn" v-for="(item,index) in loopList"  :key="index">
                    <div>{{item.eventName}}</div>
                    <div style=" flex: 2;">{{item.eventTime}}</div>
                    <div>{{item.deviceName}}</div>
                    <el-tooltip :content="item.deviceDetailedAddr" placement="bottom" effect="light">
                    <div style=" flex: 2;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;cursor: pointer;">{{item.deviceAddr}}</div>
                    </el-tooltip>
                </div>
                <el-pagination class="pagination2" :current-page.sync="currentPage" layout="prev, pager, next" :total="total" style="text-align: center;" @current-change="handleCurrentChange"></el-pagination>
            </div>
        </div>
    </renderless-component-example>
</template>

<script>
export default {
    data(){
        return {
          isShowBg:true,
          loopList:[]
        }
    },
    methods:{
        initLoopData(){
            
        }
    },
    mounted(){

    }
}
</script>

<style lang="stylus" scoped>
    #bg{
        position: fixed;
        top: 0%;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: #000000;
        z-index: 81;
        -moz-opacity: 0.4;
        opacity: 0.4;
    }

    .LoopData{
        position: fixed;
        width: 920px;
        height: 740px;
        left: 0;
        right: 0;
        top: 18%;
        margin: auto;
        float: left;
        z-index: 100;
        background: #00061F;
    }
</style>