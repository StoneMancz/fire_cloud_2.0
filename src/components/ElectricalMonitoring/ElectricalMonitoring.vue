<template>
  <div id="ElectricalMonitoring">
    <div class="electricTable">
      <div class="table" v-for="item in dataList">
        <div class="tables" style="margin:10px;background:#00061f">
          <div style="padding: 15px;height:100%;border: 1px solid #152d4b;background: #000828; ">
            <div style="display: flex;">
              <span style="flex:2" class="diviceName">名称：{{item.dveiceName}}</span>
              <span style="flex:1" class="diviceNum">编码：{{item.diviceNum}}</span>
            </div>
            <div style="display: flex;margin-top:15px">
              <span style="flex:2" class="diviceArea">区域：{{item.diviceArea}}</span>
              <span style="flex:1" class="type">状态：{{item.dveiceType}}</span>
            </div>
            <div style="display: flex;margin-top:15px">
              <span style="flex:9" class="address">地址：{{item.dveiceAddress}}</span>
              <span style="flex:1;background:#001773" class="btn">复位</span>
            </div>
            <div class="dataList">
              <div class="tableHeader">
                <div>回路</div>
                <div>设备</div>
                <div>当前值</div>
                <div>状态</div>
                <div>操作</div>
              </div>
              <div style="height:100%;overflow: auto;">
                <div class="tableCentent" v-for="item2 in item.data" style="border-bottom:1px solid #001773">
                  <div>{{item2.name1}}</div>
                  <div>{{item2.name2}}</div>
                  <div>{{item2.name3}}</div>
                  <div>{{item2.name4}}</div>
                  <div style="color:#529dc4;text-decoration:underline;">{{item2.name5}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-pagination class="pagination" layout="prev, pager, next" :total="50" style="text-align: center;"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          dveiceName: '某某某',
          diviceNum: '12345678',
          diviceArea: '区域：某某某某某某',
          dveiceType: '正常',
          dveiceAddress: '地址：某某某某某某某某某某某',
          data: [
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
          ],
        },
      ],
    }
  },
  mounted() {},
  methods: {},
}
</script>
<style scoped>
#ElectricalMonitoring {
  color: #fff;
  height: 100%;
  display: flex;
  overflow: hidden;
  background: #000d42;
}
.electricTable {
  flex: 6;
  margin-right: 10px;
  padding: 15px;
  position: relative;
  background: #00061f;
}
.leftTable .table {
  width: 50%;
  height: 43%;
  float: left;
  margin-top: 25px;
}
.tables {
  height: 100%;
  font-size: 0.08rem;
}

.tables > div {
  overflow: hidden;
  border-radius: 5px;
}
.btn {
  text-align: center;
}
.tableHeader {
  display: flex;
  width: 100%;
  margin-top: 30px;
  background: #06103d;
}
.tableCentent {
  display: flex;
  width: 100%;
}
.tableHeader div,
.tableCentent div {
  flex: 1;
  text-align: center;
  line-height: 40px;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 4px; /*滚动条宽度*/
  height: 5px; /*滚动条高度*/
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 1px; /*滚动条的背景区域的圆角*/
  background-color: transparent; /*滚动条的背景颜色*/
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 1px; /*滚动条的圆角*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #8fa4bd; /*滚动条的背景颜色*/
}
.pagination {
  float: left;
  width: 100%;
  margin-top: 20px;
}

.select > div:last-child {
  float: right;
  margin-right: 0;
  line-height: 40px;
  margin-right: 20px;
  background: #000d42;
  text-align: center;
  color: #c0c4cc;
  font-size: 15px;
  cursor: pointer;
}
.table2 {
  width: 100%;
  margin: 40px auto;
  background: #00061f;
}
.tebleHeader {
  background: #000d42;
}
.tebleColumn,
.tebleHeader {
  display: flex;
}
.tebleColumn div,
.tebleHeader div {
  flex: 1;
  height: 45px;
  line-height: 40px;
  border-bottom: 1px solid #0f152c;
}

.selects {
  width: 55%;
  position: absolute;
  right: 0;
  z-index: 2;
}
.dataList {
  height: 43%;
}
</style>