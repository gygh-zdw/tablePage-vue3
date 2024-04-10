# 地址

github：https://github.com/gygh-zdw/tablePage-vue3
npm: https://www.npmjs.com/package/tablepage-vue3
CSDN: https://blog.csdn.net/weixin_44599143/article/details/137580980

# 引入

```javascript
npm i tablepage-vue3
```

# 思路介绍

本组件是基于 element-UI 进行快速搭建搜索列表页的依赖，主干思路为：将异步接口声明到组件的`tableApi`属性，并将搜索项通过`searchConfig`声明给组件，将搜索、重置、分页的逻辑均交给组件内部去处理，达到最简化的代码实现，对于标准搜索列表页能够进行快速开发。
如下所示，便完成了一个标准搜索列表页的开发

```html
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList">
    <template #default>
      <el-table-column type="index" label="序号" align="center" width="90" />
      <el-table-column prop="recieveUserName" label="接收人姓名" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveUserPhone" label="接收人电话" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="content" label="内容" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="createTime" label="提交时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="sendTime" label="发送时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveTime" label="送达时间" align="center" min-width="90" show-overflow-tooltip />
      <el-table-column prop="recieveStatusVal" label="送达状态" align="center" min-width="90" show-overflow-tooltip />
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times',
    },
    {
      label: '电话',
      key: 'phone',
    },
  ]
</script>
<style lang="scss" scoped></style>
```

![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%9F%BA%E7%A1%80%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA.jpg)

# TablePage-vue3 API 汇总

## 属性

| 属性名                                    | 说明                                                                                                         | 类型          | 默认值                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------- | ------------------------- |
| tableApi                                  | [<font color=red>必填</font >]表格 api【可异步】                                                             | Function      | Promise.reject()          |
| title                                     | 标题                                                                                                         | String        | 当前 route 的 meta?.title |
| noTitle                                   | 无标题标识                                                                                                   | Boolean       | -                         |
| noPage                                    | 不分页标识                                                                                                   | Boolean       | -                         |
| noMountedGetData                          | onMounted 不获取数据标识 ，为 true 时不会默认调用 api 接口，需要外部触发 getList，但是分页和搜索仍会调用接口 | Boolean       | -                         |
| loading                                   | 外部 loading 传入，与内部 loading 为<或>的关系                                                               | Boolean       | -                         |
| noSearchModel                             | 无表单搜索标识                                                                                               | Boolean       | -                         |
| changeToSearch                            | 表单 change 事件是否触发搜索                                                                                 | Boolean       | -                         |
| tableHeight                               | 表格高度                                                                                                     | Number/String | 550                       |
| [searchConfig](#searchConfig-domId)       | 搜索项设置                                                                                                   | Array         | []                        |
| changeParams                              | 参数预处理【可异步】                                                                                         | Function      | (value) => value          |
| reset                                     | 重置触发【可异步】                                                                                           | Function      | () => {}                  |
| tableFileter                              | 表格过渡效果【可异步】                                                                                       | Function      | (list) => list            |
| [props](#props-domId)                     | 配置选项                                                                                                     | Object        | {}                        |
| [tableColumnList](#tableColumnList-domId) | 表格列 list【当 default 或 tableShow 插槽使用时，将不会使用 tableColumnList 进行渲染】                       | Array         | []                        |
| paginationProps                           | 分页器配置选项【将 element-ui 中的 pagination 相关属性写进该对象里即可】                                     | Object        | {}                        |

## 插槽

| 插槽名              | 说明                                                                                    |
| ------------------- | --------------------------------------------------------------------------------------- |
| buttonModel         | 按钮                                                                                    |
| default / tableShow | 表格展示插槽【当 default 或 tableShow 插槽使用时，将不会使用 tableColumnList 进行渲染】 |
| [你设定的 slotName] | 本组件内部使用了大量的动态组件，方便配置，可阅读文档自行设置插槽名                      |

## Exposes

| 值名             | 说明             |
| ---------------- | ---------------- |
| getList()        | 调用列表接口     |
| queryParams      | 获取页面搜索参数 |
| inputQueryParams | 页面输入参数     |
| getParams        | 接口查询参数     |
| tableList        | 获取表格数据     |
| TableRef         | tableRef 对象    |

## 自定义对象

### <span id="searchConfig-domId">searchConfig</span>(array<object\> 类型)

| 属性名       | 说明                                                                                                                           | 类型                 | 默认值                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| key          | 字段 key 值，该值将作用于表单搜索时向接口所发送的字段 key，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId) | String               | -                                                                                                                                         |
| type         | 详见下文 [searchConfig-type](#searchConfig-type-domId)                                                                         | String/vue3Component | ‘input’                                                                                                                                   |
| label        | 搜索表单标签文本                                                                                                               | String               | -                                                                                                                                         |
| noLabel      | 搜索表单无标签文本标识，为 true 时将不显示标签文本                                                                             | Boolean              | false                                                                                                                                     |
| bind         | 搜索表单搜索项属性绑定，将直接作用于搜索表单筛选框的绑定，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId)  | Object               | 默认值可详见[当 type 不为时间类型时 bind 默认值](#type-notTime-bind-domId) 与 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |
| defaultValue | 默认参数，当 type 为 times 时详见[当 type=times 时](#type-isTimesValue-domId)                                                  | String               | -                                                                                                                                         |
| slotName     | 插槽名称 将整个搜索项暴露给父页面进行使用                                                                                      | String               | -                                                                                                                                         |
| childSlot    | 子插槽名，当组件结构为<el-select\><el-option\><\el-option>\</el-select>时，可将 type 设置为 select，通过子插槽渲染 option      | String               | -                                                                                                                                         |

#### <span id="searchConfig-type-domId">searchConfig-type</span>

| 值 / 值类型         | 值详情                                                                                                                 | 说明                                                                                                   |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ‘times’             | 文本 times                                                                                                             | 将渲染分开为两个的时间筛选器，key、bind、defaultValue 详见[当 type=times 时](#type-isTimesValue-domId) |
| ‘slot’              | 文本 slot                                                                                                              | 该搜索项将索引页面插槽进行渲染                                                                         |
| String              | element 相关组件标签文本（以<el-time-picker\>为例：‘el-time-picker’\|‘time-picker’\|‘ElTimePicker’\|‘TimePicker’均可） | 将捕获 element-UI 相关组件，并通过 v-model 将值与页面搜索项进行绑定                                    |
| 类型为 VueComponent | vue3 组件对象                                                                                                          | 将该组件进行绑定并通过 v-model 绑定值，逻辑与主要处理的 element-ui 的相关标签保持一致                  |

#### <span id="type-isTimesValue-domId">当 type=times 时</span>

| 属性名            | 说明                                                                                | 类型     | 默认值                                                           |
| ----------------- | ----------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------- |
| key               | 字段 key 值，该值将作用于表单搜索时向接口所发送的字段 key，当 type=times 时字段固定 | 无法修改 | startTime,endTime                                                |
| startDefaultValue | 开始时间默认参数                                                                    | String   | -                                                                |
| endDefaultValue   | 结束时间默认参数                                                                    | String   | -                                                                |
| startBind         | 开始时间属性绑定                                                                    | Object   | 详见 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |
| endBind           | 结束时间属性绑定                                                                    | Object   | 详见 [当 type 为时间类型时 bind 默认值](#type-isTime-bind-domId) |

#### <span id="type-notTime-bind-domId">当 type 不为时间类型时的 bind 默认值（Object 类型）</span>

| 属性名      | 默认值       |
| ----------- | ------------ |
| placeholder | label 的值   |
| clearable   | true         |
| style       | width: 200px |

#### <span id="type-isTime-bind-domId">当 type 为时间类型时的 bind 默认值（Object 类型）</span>

| 属性名      | 默认值              |
| ----------- | ------------------- |
| style       | width: 190px        |
| type        | datetime            |
| placeholder | 请选择时间          |
| format      | YYYY-MM-DD HH:mm:ss |
| valueFormat | YYYY-MM-DD HH:mm:ss |

### <span id="props-domId">props</span>（object 类型）

| 属性名       | 说明                             | 类型   | 默认值 |
| ------------ | -------------------------------- | ------ | ------ |
| pageNumKey   | 接口调用时的当前页码字段         | String | page   |
| pageSizeKey  | 接口调用时的每页显示条目个数字段 | String | limit  |
| totalKey     | 接口调用时的总页数字段           | String | count  |
| dataKey      | 接口调用时的列表数据字段         | String | data   |
| pageNumInit  | 列表默认当前页码                 | Number | 1      |
| pageSizeInit | 列表默认每页显示条目个数         | Number | 10     |

### <span id="tableColumnList-domId">tableColumnList</span>(array<object\> 类型)

| 属性名   | 说明                                                 | 类型   | 默认值 |
| -------- | ---------------------------------------------------- | ------ | ------ |
| slotName | 使用插槽嵌入 tableColumn，并使用 slotName 为插槽 key | String | -      |
| align    | element-UI 的 tableColumn 中 align 字段复写默认值    | String | center |
|          | element-UI 的 tableColumn 中的字段均可直接声明       |        |        |
| child    | 子 tableColumn，嵌套 tableColumn 使用                | Array  | -      |
