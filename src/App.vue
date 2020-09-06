<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
body,
html {
  padding-right: 0 !important;
  margin: 0;
  border: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  font-size: 16px;
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 15%, rgba(0, 14, 71, 1) 98%);
}

.el-drawer__header {
  margin-bottom: 0;
}

.el-date-editor .el-range-input {
  color: white;
  background-color: #001773 !important;
}

.el-input__inner {
  color: rgba(255, 255, 255, 1) !important;
  background: #001773 !important;
  border: none !important;
}

.amap-info-content {
  overflow: hidden;
  background: linear-gradient(-30deg, rgba(0, 8, 41, 1) 0%, rgba(0, 14, 71, 1) 98%);
  border: 1px solid rgba(112, 212, 254, 0.3);
  box-shadow: 0px 0px 45px 15px rgba(0, 6, 31, 0.3);
  border-radius: 15px;
  color: white;
}

.el-tree-node__label {
  text-overflow: ellipsis;
  max-width: 140px;
  white-space: nowrap;
  overflow-x: hidden;
}

.el-tree-node.is-current > .el-tree-node__content {
  background-color: transparent !important;
}

.el-tree-node__content:hover {
  background-color: transparent !important;
}

.el-tree-node:focus > .el-tree-node__content {
  color: #70d4fe;
}

.amap-logo {
  display: none;
  opacity: 0;
}

.amap-copyright {
  opacity: 0;
}

.right {
  flex: 9;
  margin-left: 30px;
  width: 90%;
  padding: 10px;
  padding-left: 0px;
}

/* 分页样式 */
.pagination {
  position: absolute;
  bottom: 2.5%;
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
.is-active {
  color: #70d4fe !important;
}

.el-pagination {
  color: white !important;
  background: transparent !important;
}
.el-pager,
.el-pager li {
  background: transparent !important;
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: transparent !important;
  color: #fff !important;
}
.el-pagination button:disabled,
.el-pagination button:disabled {
  color: white !important;
  background: transparent !important;
}
/* 修改用水的背景颜色 */
.el-radio-button__orig-radio:disabled + .el-radio-button__inner {
  background-color: transparent !important;
  border-color: #365cf5;
}
</style>
