<template>
  <TablePage
    title="测试文件"
    tableHeight="40vh"
    :table-api="tableApi"
    :searchConfig="searchConfig"
    isButtonLine
    :tableColumnList="tableColumnList"
    :tableFileter="tableTransition"
    :props="props"
  >
    <!-- <template #tableShow>
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </template> -->
    <template #insertTimeSlot>
      <el-option label="tm" value="tm" />
    </template>
    <template #insertTimeListSlot="{ params }"> params{{ params }} </template>
    <template #buttonModel>
      <el-button type="primary">导出</el-button>
    </template>
    <template #tableColumnListSlotName="{ row }"> row{{ row }} </template>
  </TablePage>
</template>

<script setup>
import TablePage from './TablePage/index.js'
import { ElTableColumn, ElButton, ElOption } from 'element-plus'
import componentsText from './componentsText.vue'
import { ref, markRaw } from 'vue'
const tableApi = ref((params) => {
  console.log('params', params)
  return {
    data: [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
      },
    ],
    count: 100,
  }
})
const tableColumnList = [
  {
    type: 'index',
    label: '序号',
    width: '45',
    fixed: 'left',
  },
  {
    prop: 'date',
    label: 'Date',
    minWidth: '60',
    fixed: 'left',
  },
  {
    prop: 'date',
    label: 'row',
    minWidth: '60',
    slotName: 'tableColumnListSlotName',
  },
]
const searchConfig = ref([
  {
    label: '输入',
    type: 'input',
    key: 'test',
  },
  {
    label: 'childSlot',
    key: 'insertTime',
    type: 'ElSelect',
    childSlot: 'insertTimeSlot',
  },
  {
    label: 'slotName',
    type: 'slot',
    slotName: 'insertTimeListSlot',
    key: 'insertTimeList',
  },
  {
    label: 'noLabel',
    type: 'ElInput',
    noLabel: true,
    key: 'noLabel',
  },
  {
    label: 'inputNumber',
    key: 'zh',
    type: 'el-input-number',
    defaultValue: 1,
  },
  {
    label: '日期',
    key: 'rq',
    type: 'date-picker',
    bind: {
      type: 'date',
      valueFormat: 'YYYY年MM月DD日',
      format: 'YYYY年MM月DD日',
    },
  },
  {
    label: 'componentsText',
    key: 'componentsText',
    type: markRaw(componentsText), //目前只接受vue3 组件
    bind: {
      type: 'type',
    },
  },
  {
    label: '时间',
    type: 'times',
    startDefaultValue: '2023-04-07 00',
    endDefaultValue: '2024-04-07 23:59:59',
    startBind: {
      label: '时间',
      valueFormat: 'YYYY-MM-DD HH',
      format: 'YYYY-MM-DD HH',
    },
    endBind: {
      label: '结束时间',
    },
  },
])
function tableTransition(list) {
  console.log('list', list)
  return null
}
const props = {
  pageSizeInit: 40,
  pageNumInit: 1,
}
</script>
