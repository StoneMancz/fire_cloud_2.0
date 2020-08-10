<template>
  <div id="ElectricalMonitoring">
    <div class="leftTable">
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
      <span class="echartsShow" v-show="show1" @click="EchartShow(1)">
        <i class="el-icon-arrow-left" style="color:#fff;font-size:0.13rem"></i>
      </span>

      <el-pagination class="pagination" layout="prev, pager, next" :total="50" style="text-align: center;"></el-pagination>
    </div>
    <div class="rightecharts" v-show="show2">
      <span class="echartsShow2" v-show="show3" @click="EchartShow(2)">
        <i class="el-icon-close" style="color:#fff;font-size:0.13rem"></i>
      </span>

      <el-tabs style="padding:2.5%" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="数据统计图例" name="echarts">
          <div class="Echarts echarts1">
            <div class="select selects">
              <el-date-picker v-model="value1" type="date" placeholder="选择日期" style="float: right;"></el-date-picker>
              <el-select v-model="value" placeholder="设备类型" style="float: right;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <!-- <span>设备报警趋势</span> -->
            <!-- <ve-line :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-line> -->
            <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
          </div>
          <div class="Echarts echarts2">
            <!-- <span>设备状态分布图</span> -->
            <!-- <ve-ring :data="chartData" :extend="chartExtend" :height="wapperHeight"></ve-ring> -->
            <div id="myChart2" :style="{width: '100%', height: '100%'}"></div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="事件列表" name="dataList">
          <div class="select2">
            <div>
              <el-select v-model="value" placeholder="事件等级">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div>
              <el-select v-model="value" placeholder="设备类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
            <div>
              <el-date-picker v-model="value1" type="date" placeholder="发生时间"></el-date-picker>
            </div>
            <div>报表导出</div>
          </div>
          <div class="selectList">
            <!-- <el-table :data="tableData" style="width: 100%" >
                  <el-table-column prop="name" label="事件名称"></el-table-column>
                  <el-table-column prop="time" label="时间"></el-table-column>
                  <el-table-column prop="deviceName" label="设备名称"></el-table-column>
                  <el-table-column prop="address" label="地址"></el-table-column>
            </el-table>-->
            <div class="table2">
              <div class="tebleHeader">
                <div>事件名称</div>
                <div>时间</div>
                <div>设备名称</div>
                <div>地址</div>
              </div>
              <div class="tebleColumn" v-for="item in tableData2" :key="item.id">
                <div>{{item.name}}</div>
                <div>{{item.time}}</div>
                <div>{{item.deviceName}}</div>
                <div>{{item.address}}</div>
              </div>
            </div>
          </div>
          <el-pagination class="pagination2" layout="prev, pager, next" :total="50" style="text-align: center;"></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    this.chartExtend = {
      'xAxis.0.axisLabel.color': 'white', //x轴文本颜色
      'yAxis.0.axisLabel.color': 'white', //y轴文本改变颜色
      legend: {
        textStyle: {
          color: 'white',
        },
      },
    }
    this.yAxis = [
      {
        axisLabel: {
          show: true,
          textStyle: {
            color: 'white', //这里是改变字体颜色
          },
        },
      },
    ]
    this.title = {
      textStyle: {
        color: '#fff', //标题颜色
        fontWeight: 'bold', //粗体
        fontSize: 24, //字体大小
      },
    }
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
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
          ],
        },
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
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
          ],
        },
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
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
          ],
        },
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
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
            {
              name1: '1',
              name2: '故障电弧',
              name3: '0DH',
              name4: '正常',
              name5: '历史记录',
            },
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

      wapperHeight: '320px',
      value: '',
      value1: '',
      chartExtend: '',
      yAxis: '',
      title: '',
      activeName: 'echarts',
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
        ],
        textStyle: {
          color: 'white',
        },
      },
      options: [
        {
          value: '1',
          label: '初级',
        },
        {
          value: '2',
          label: '中级',
        },
        {
          value: '3',
          label: '高级',
        },
        {
          value: '4',
          label: '紧急',
        },
      ],
      show1: false,
      show2: true,
      show3: true,
      tableData: [
        {
          id: 1,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 2,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 2,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 3,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 3,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 4,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 5,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 2,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 7,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 3,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 8,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 9,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 10,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 11,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 12,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 13,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 2,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 14,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 15,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 16,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 2,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 17,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 3,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 18,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 3,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 19,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 3,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 20,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 21,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
        {
          id: 22,
          deviveId: '012345678901',
          name: '某某某',
          deviceNum: '000000',
          type: 1,
          area: '东佘山',
          deviceName: '东佘山123大道1234路...',
          address: '某某某某某某...',
        },
      ],
      tableData2: [
        {
          id: 1,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 2,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 3,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 4,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 5,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 6,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 7,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 8,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 9,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 10,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 11,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
        {
          id: 12,
          name: '某某某',
          time: '2020.12.11 12:10',
          deviceName: '某某某某某某...',
          address: '某某某某某某...',
        },
      ],
    }
  },
  mounted() {
    this.getDate()
    this.EchartsImg()
    this.EchartsImg2()
  },
  methods: {
    EchartShow(index) {
      if (index == 1) {
        ;(this.show1 = false), (this.show2 = true), (this.show3 = true)
      } else {
        ;(this.show1 = true), (this.show2 = false), (this.show3 = false)
        this.getDate()
      }
    },
    EchartsImg() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表

      myChart.setOption({
        title: {
          text: '设备报警趋势',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },
        },
        color: ['#365CF5'],
        tooltip: {},
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff',
            },
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#fff',
            },
          },
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
          },
        ],
      })
    },
    EchartsImg2() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart2'))
      // 绘制图表

      myChart.setOption({
        title: {
          text: '设备状态分布图',
          textStyle: {
            color: '#fff',
            fontSize: 18,
          },
        },
        color: ['#008f13', '#8f8f8f', '#8f0000'],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 10,
          bottom: 50,
          textStyle: {
            color: '#fff',
          },
          data: ['正常', '异常', '报警'],
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: false,
              },
            },
            label: {
              //  饼图图形上的文本标签

              normal: {
                // normal 是图形在默认状态下的样式
                show: true,
                position: 'center',
                color: '#fff',
                fontSize: 16,
                formatter: '123台某某某设备', // {b}:数据名； {c}：数据值； {d}：百分比，可以自定义显示内容，
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 335, name: '正常' },
              { value: 310, name: '异常' },
              { value: 234, name: '报警' },
            ],
          },
        ],
      })
    },
    getDate() {
      this.chartExtend = {
        'xAxis.0.axisLabel.color': 'white', //x轴文本颜色
        'yAxis.0.axisLabel.color': 'white', //y轴文本改变颜色
        legend: {
          textStyle: {
            color: 'white',
          },
        },
      }
      this.yAxis = [
        {
          axisLabel: {
            show: true,
            textStyle: {
              color: 'white', //这里是改变字体颜色
            },
          },
        },
      ]
      this.title = {
        textStyle: {
          color: '#fff', //标题颜色
          fontWeight: 'bold', //粗体
          fontSize: 24, //字体大小
        },
      }
    },

    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
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
.leftTable {
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
>>> .el-pagination {
  color: white !important;
  background: transparent !important;
}
>>> .el-pager,
>>> .el-pager li {
  background: transparent !important;
}
>>> .el-pagination .btn-next,
>>> .el-pagination .btn-prev {
  background: transparent !important;
  color: #fff !important;
}
.el-pagination >>> button:disabled,
.el-pagination >>> button:disabled {
  color: white !important;
  background: transparent !important;
}

.select2 {
  width: 100%;
  height: 40px;
  overflow: hidden;
}
.select {
  overflow: hidden;
}
.select2 div {
  float: left;
  width: 120px;
  margin-right: 20px;
  overflow: hidden;
  cursor: pointer;
}
.select2 > div:last-child {
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
.dtaList {
  height: 100%;
  background: #00061f;
  color: #fff;
}
.Echarts {
  width: 100%;
  height: 46%;
  padding: 1%;
  margin: 0 auto 2% auto;
  background: #000d42;
  position: relative;
}
.Echarts span {
  font-weight: bold;
  font-size: 20px;
  line-height: 30px;
}
.rightecharts {
  flex: 4;
  background: #00061f;
  position: relative;
}
.rightecharts .select div {
  float: left;
  margin-right: 20px;
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
.rightecharts >>> .el-date-editor.el-input,
>>> .el-date-editor.el-input__inner {
  width: 120px;
}
.rightecharts >>> .el-input__inner {
  width: 120px;
  background: #000d42;
  border: none;
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
>>> .el-pagination {
  color: white !important;
  background: transparent !important;
}
>>> .el-pager,
>>> .el-pager li {
  background: transparent !important;
}
>>> .el-pagination .btn-next,
>>> .el-pagination .btn-prev {
  background: transparent !important;
  color: #fff !important;
}
.el-pagination >>> button:disabled,
.el-pagination >>> button:disabled {
  color: white !important;
  background: transparent !important;
}
.detalis {
  color: #70d4fe;
  cursor: pointer;
}

>>> .el-tabs__item {
  color: #fff !important;
}
>>> .el-tabs__nav-wrap::after {
  background-color: transparent;
}
>>> .el-input__inner {
  width: 120px;
  background: #000d42;
  border: none;
}
.echartsShow {
  display: block;
  height: 50px;
  background: rgba(255, 255, 255, 0.4);
  width: 25px;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(-50%, -50%);
  line-height: 60px;
  cursor: pointer;
}
.echartsShow2 {
  display: block;
  position: absolute;
  right: 0;
  top: 0px;
  cursor: pointer;
  z-index: 2;
}

>>> .el-tabs,
.el-tabs--top,
#pane-echarts,
.el-tabs__content {
  height: 100% !important;
}
>>> .el-tabs__header {
  height: 5%;
}
>>> .el-tabs__content {
  height: 100% !important;
}

.selectList {
  position: relative;
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
.pagination {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);
}
.selectList {
  position: relative;
}
.pagination2 {
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
}
>>> .is-active {
  color: #70d4fe !important;
}
</style>