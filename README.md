# 地址

github：https://github.com/gygh-zdw/tablePage-vue3

npm: https://www.npmjs.com/package/tablepage-vue3

CSDN: https://blog.csdn.net/weixin_44599143/article/details/137580980



# 引入

```javascript
npm i element-plus
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

# 

# TablePage-vue3 API汇总

## 属性

| 属性名                                    | 说明                                                         | 类型          | 默认值                 |
| ----------------------------------------- | ------------------------------------------------------------ | ------------- | ---------------------- |
| tableApi                                  | [<font color=red>必填</font >]表格api【可异步】              | Function      | Promise.reject()       |
| title                                     | 标题                                                         | String        | 当前route的meta?.title |
| noTitle                                   | 无标题标识                                                   | Boolean       | -                      |
| noPage                                    | 不分页标识                                                   | Boolean       | -                      |
| noMountedGetData                          | onMounted 不获取数据标识 ，为true时不会默认调用api接口，需要外部触发getList，但是分页和搜索仍会调用接口 | Boolean       | -                      |
| loading                                   | 外部loading传入，与内部loading为<或>的关系                   | Boolean       | -                      |
| noSearchModel                             | 无表单搜索标识                                               | Boolean       | -                      |
| changeToSearch                            | 表单change事件是否触发搜索                                   | Boolean       | -                      |
| tableHeight                               | 表格高度                                                     | Number/String | 550                    |
| [searchConfig](#searchConfig-domId)       | 搜索项设置                                                   | Array         | []                     |
| changeParams                              | 参数预处理【可异步】                                         | Function      | (value) => value       |
| resetFun                                  | 重置触发【可异步】                                           | Function      | () => {}               |
| tableFileter                              | 表格过渡效果【可异步】                                       | Function      | (list) => list         |
| searchOver                                | 搜索完成触发函数                                             | Function      | ()=>{}                 |
| [props](#props-domId)                     | 配置选项                                                     | Object        | {}                     |
| [tableColumnList](#tableColumnList-domId) | 表格列list【当default 或 tableShow插槽使用时，将不会使用tableColumnList进行渲染】 | Array         | []                     |
| paginationProps                           | 分页器配置选项【将element-ui中的pagination相关属性写进该对象里即可】 | Object        | {}                     |

## 插槽
| 插槽名              | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| buttonModel         | 按钮                                                         |
| default / tableShow | 表格展示插槽【当default 或 tableShow插槽使用时，将不会使用tableColumnList进行渲染】 |
| [你设定的slotName]  | 本组件内部使用了大量的动态组件，方便配置，可阅读文档自行设置插槽名 |
## Exposes


| 值名             | 说明             |
| ---------------- | ---------------- |
| searchHandler()  | 执行数据获取     |
| resetHandler()   | 执行重置逻辑     |
| queryParams      | 获取页面搜索参数 |
| inputQueryParams | 页面输入参数     |
| getParams        | 接口查询参数     |
| tableList        | 获取表格数据     |
| TableRef         | tableRef对象     |

## 自定义对象
### <span id="searchConfig-domId">searchConfig</span>(array<object\> 类型)
| 属性名       | 说明                                                         | 类型                 | 默认值                                                       |
| ------------ | ------------------------------------------------------------ | -------------------- | ------------------------------------------------------------ |
| key          | 字段key值，该值将作用于表单搜索时向接口所发送的字段key，当type为times时详见[当type=times时](#type-isTimesValue-domId) | String               | -                                                            |
| type         | 详见下文 [searchConfig-type](#searchConfig-type-domId)       | String/vue3Component | ‘input’                                                      |
| label        | 搜索表单标签文本                                             | String               | -                                                            |
| noLabel      | 搜索表单无标签文本标识，为true时将不显示标签文本             | Boolean              | false                                                        |
| bind         | 搜索表单搜索项属性绑定，将直接作用于搜索表单筛选框的绑定，当type为times时详见[当type=times时](#type-isTimesValue-domId) | Object               | 默认值可详见[当type不为时间类型时 bind默认值](#type-notTime-bind-domId) 与 [当type为时间类型时 bind默认值](#type-isTime-bind-domId) |
| defaultValue | 默认参数，当type为times时详见[当type=times时](#type-isTimesValue-domId) | String               | -                                                            |
| slotName     | 插槽名称 将整个搜索项暴露给父页面进行使用                    | String               | -                                                            |
| childSlot    | 子插槽名，当组件结构为<el-select\><el-option\><\el-option>\</el-select>时，可将type设置为 select，通过子插槽渲染option | String               | -                                                            |
####  <span id="searchConfig-type-domId">searchConfig-type</span>
| 值 / 值类型         | 值详情                                                       | 说明                                                         |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ‘times’             | 文本times                                                    | 将渲染分开为两个的时间筛选器，key、bind、defaultValue详见[当type=times时](#type-isTimesValue-domId) |
| ‘slot’              | 文本slot                                                     | 该搜索项将索引页面插槽进行渲染                               |
| String              | element相关组件标签文本（以<el-time-picker\>为例：‘el-time-picker’\|‘time-picker’\|‘ElTimePicker’\|‘TimePicker’均可） | 将捕获element-UI相关组件，并通过v-model将值与页面搜索项进行绑定 |
| 类型为 VueComponent | vue3组件对象                                                 | 将该组件进行绑定并通过v-model绑定值，逻辑与主要处理的element-ui的相关标签保持一致 |
#### <span id="type-isTimesValue-domId">当type=times时</span>
| 属性名            | 说明                                                         | 类型     | 默认值                                                       |
| ----------------- | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| key               | 字段key值，该值将作用于表单搜索时向接口所发送的字段key，当type=times时字段固定 | 无法修改 | startTime,endTime                                            |
| startDefaultValue | 开始时间默认参数                                             | String   | -                                                            |
| endDefaultValue   | 结束时间默认参数                                             | String   | -                                                            |
| startBind         | 开始时间属性绑定                                             | Object   | 详见 [当type为时间类型时 bind默认值](#type-isTime-bind-domId) |
| endBind           | 结束时间属性绑定                                             | Object   | 详见 [当type为时间类型时 bind默认值](#type-isTime-bind-domId) |
####  <span id="type-notTime-bind-domId">当type不为时间类型时的 bind默认值（Object类型）</span>
| 属性名      | 默认值       |
| ----------- | ------------ |
| placeholder | label的值    |
| clearable   | true         |
| style       | width: 200px |
#### <span id="type-isTime-bind-domId">当type为时间类型时的 bind默认值（Object类型）</span>
| 属性名      | 默认值              |
| ----------- | ------------------- |
| style       | width: 190px        |
| type        | datetime            |
| placeholder | 请选择时间          |
| format      | YYYY-MM-DD HH:mm:ss |
| valueFormat | YYYY-MM-DD HH:mm:ss |
### <span id="props-domId">props</span>（object类型）
| 属性名       | 说明                             | 类型   | 默认值 |
| ------------ | -------------------------------- | ------ | ------ |
| pageNumKey   | 接口调用时的当前页码字段         | String | page   |
| pageSizeKey  | 接口调用时的每页显示条目个数字段 | String | limit  |
| totalKey     | 接口调用时的总页数字段           | String | count  |
| dataKey      | 接口调用时的列表数据字段         | String | data   |
| pageNumInit  | 列表默认当前页码                 | Number | 1      |
| pageSizeInit | 列表默认每页显示条目个数         | Number | 10     |
### <span id="tableColumnList-domId">tableColumnList</span>(array<object\> 类型)
| 属性名   | 说明                                             | 类型   | 默认值 |
| -------- | ------------------------------------------------ | ------ | ------ |
| slotName | 使用插槽嵌入tableColumn，并使用slotName为插槽key | String | -      |
| align    | element-UI的 tableColumn中align字段复写默认值    | String | center |
|          | element-UI的 tableColumn中的字段均可直接声明     |        |        |
| child    | 子tableColumn，嵌套tableColumn使用               | Array  | -      |

# 搜索及数据获取配置项
## 属性： noSearchModel（无表单搜索标识）
该属性为true时，将不会显示表单项（以及属于表单的按钮项也不会显示），但是列表和属于列表的分页器将正常展示

```javascript
<template>
  <table-page noSearchModel :searchConfig="searchConfig" :tableApi="getMessageList" >
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
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noSearchModel.jpg)




##  属性：changeToSearch（表单change事件是否触发搜索	）
 <span id="changeToSearch-domId"></span >
此属性为true时，当搜索项被触发change事件时，将会立即执行搜索逻辑，无需用户手动点击搜索按钮
```javascript
<template>
  <table-page changeToSearch :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```

## 属性： changeParams（参数预处理【可异步】	）
该属性接收函数，将传入即将用于搜索的数据，数据经过该函数处理后需要返回，否则将仍使用原始数据进行搜索
```javascript
<template>
  <table-page :changeParams="changeParams":searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  function changeParams(data) {
    data.changeParams = true
    return data
  }
</script>
```
| 模式         | 函数处理                                                     | 数据结构                                                     |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 无处理       | <table-page :searchConfig="searchConfig" :tableApi="getMessageList" \> | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E5%A4%84%E7%90%86.jpg) |
| 同步处理返回 | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E8%BF%94%E5%9B%9E%E5%80%BC.jpg) | ![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%90%8C%E6%AD%A5%E5%A3%B0%E6%98%8E%E5%80%BC.jpg) |
| 异步处理返回 | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E6%AD%A5%E5%A4%84%E7%90%86.jpg) | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E5%BC%82%E6%AD%A5%E5%A3%B0%E6%98%8E%E5%80%BC.jpg) |
| 无返回       | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E8%BF%94%E5%9B%9E%E5%80%BC.jpg) | ![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E6%97%A0%E5%A4%84%E7%90%86.jpg) |

## 属性： resetFun（重置触发【可异步】）
当需要重置时处理其他业务时，可声明resetFun属性，该属性接收函数，可异步处理，待处理完成后继续向下执行搜索逻辑
该函数触发时机为：搜索字段已完成重置，尚未请求接口时
即：

```javascript
重置字段初始值
resetFun（）
请求接口
```

```javascript
<template>
  <table-page :resetFun="resetFun":searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  function resetFun() {
  	// 处理业务逻辑
  }
</script>

```
## 属性： tableFileter（表格过渡效果【可异步】）
该属性接收函数，传入接口返回的数据列表，经该函数处理后将渲染至页面，函数可为异步函数，当函数不返回数据时，将使用接口数据进行渲染
```javascript
<template>
  <table-page :tableFileter="tableFileter" :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
  async function tableFileter(list) {
    await new Promise((resolve) => setTimeout(() => resolve(), 5000)) //等待五秒后向下执行
    return list.map((item, index) => ({ ...item, recieveUserName: index % 2 ? '张三' : '李四' }))
  }
</script>

```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E8%BF%87%E6%BB%A4%E5%87%BD%E6%95%B0.jpg)

## 属性： searchOver（搜索完成触发）
搜索完成触发，此时tableList已经赋值完成
```javascript
<template>
  <table-page :searchOver="searchOver" :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
 function searchOver() {
  	// 处理业务逻辑
  }
</script>
```
## 插槽： buttonModel
本插槽位置位于搜索按钮右侧，方便放置业务按钮
```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #buttonModel>
      <el-button type="primary">buttonModel</el-button>
    </template>
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
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/buttonModelSlot.jpg)

## 属性:  searchConfig（搜索项设置）
搜索项设置接收数组类型，每项设置均为对象，结构为

```javascript
{
  key:'test',
  label:'测试',
  type:'input',// type:'input' || type:ElInput || type:'times' || type:'slot'
  noLabel:false,
  defaultValue:'text',
  bind:{
  	style:'color:red',
  	clearable:true
  	...
  	...
  	...
  },
  slotName:'slotInput',
  childSlot:'childSlot',
}
```

### key
本字段将设置为搜索时的属性key字段，当type=times 时，将固定为startTime与endTime
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/key.jpg)

### label
将作为表单label进行渲染
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/label.jpg)

### noLabel
声明本字段，将取消显示该项的label
```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      noLabel: true,
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/noLabel.jpg)

### defaultValue
声明本字段默认值，首次加载时，初始渲染时均将该项设为该值，该值也将在重置按钮触发时赋值
```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      defaultValue: '130000000000',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/%E9%BB%98%E8%AE%A4%E5%80%BC.jpg)

### bind
本属性将直接作用于搜索项表单，例如

```javascript
{
    label: '电话',
    type:'input',
    key: 'phone',
    bind:{
    	type:'textarea',
    	placeholder:'占位文本',
    	style:'color:red',
    	class:'testClass'
	}
}
```
将渲染为·`<el-input v-model="phone" type="textarea" placeholder="占位文本" style="color:red" class="testClass" />`

示例代码如下

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    },
    {
      label: '电话',
      type:'input',
      defaultValue: '130000000000',
      key: 'phone'
    },
    {
      label: '电话bind',
      type: 'input',
      key: 'phone',
      bind: {
        type: 'textarea',
        placeholder: '占位文本',
        style: 'color:red',
        class: 'testClass'
      }
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/bind.jpg)
非时间类型的bind默认属性为：

```javascript
{
    placeholder: label || '',
    clearable: true,
    style: 'width: 200px'
  }
```
时间类型的默认属性为：

```javascript
{
  style: 'width: 190px',
  type: 'datetime',
  placeholder: '请选择时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
```

### childSlot
`本属性为插槽名称，动态插槽渲染。`
主要用于elementUI中`el-select`、`el-checkbox-group`、`el-radio-group`等此类组件中需要声明子组件的情形，例如`el-select`内部需要配置`el-option`，本示例也将以el-select为例

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #selectChildSlot>
      <el-option label="2024-01-01" value="2024-01-01" />
      <el-option label="2023-01-01" value="2023-01-01" />
      <el-option label="2022-01-01" value="2022-01-01" />
      <el-option label="2021-01-01" value="2021-01-01" />
    </template>
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
      key: 'selectDate',
      type: 'select',
      childSlot: 'selectChildSlot'
    },
    {
      label: '电话',
      type:'input',
      key: 'phone'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/childSlot-2.jpg)
匹配字段设置如下
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/childSlot-1.jpg)


### type
本属性是搜索项主要配置项，默认值为`ElInput`
用于各搜索项配置类型及特殊处理声明
#### String类型数据（除 times 与 slot ）
String 类型传入type是较为常用的情景，主要是将element-UI组件标签文本传入type内，交由type进行渲染交互，对于element-UI标签可传入驼峰式或-分割，下文将使用`el-input-number`标签进行演示，因`el-input-number`标签文本结构较为复杂，能够清晰表达出作者对于type接收值的处理
注意：times与slot被排除在外，当文本类型无法捕获element-UI时，将使用默认的`ElInput`，没有传type时也将使用`ElInput`

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
	...
	// 与前文一致，省略处理
	...
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: 'test1',
      key: 'test1',
      type: 'el-input-number'
    },
    {
      label: 'test2',
      key: 'test2',
      type: 'el-inputNumber'
    },
    {
      label: 'test3',
      key: 'test3',
      type: 'input-number'
    },
    {
      label: 'test4',
      key: 'test4',
      type: 'El-Input-Number'
    },
    {
      label: 'test5',
      key: 'test5',
      type: 'inputNumber'
    },
    {
      label: 'test6',
      key: 'test6',
      type: 'elInputNumber'
    },
    {
      label: 'test7',
      key: 'test7',
      type: 'ElInputNumber'
    },
    {
      label: 'test8',
      key: 'test8',
      type: 'InputNumber'
    }
  ]
</script>
```
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/typeString.jpg)
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/typeString-2.jpg)


#### 字符串 times
当 type = 'times' 将会分别展示开始时间与结束时间，字段将强制设为`startTime`与`endTime`
如：`{ label: '时间', type: 'times'}`就将渲染为![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times.jpg)
接口中也将携带为![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times-2.jpg)

```javascript
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  const searchConfig = [
    {
      label: '时间',
      type: 'times'
    }
  ]
</script>
```
![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/times-3.jpg)


#### 字符串 slot （及 配套 slotName 属性）
当 type ='slot' 时，意味着你将要对该搜索项手动处理，组件将根据你设置的slotName进行暴露插槽，便于业务处理

```javascript
<template>
  <table-page  :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #slotModules> 插槽开发 </template>
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
      label: 'slot测试',
      key: 'slotData',
      defaultValue: 'ok',
      type: 'slot',
      slotName: 'slotModules'
    }
  ]
</script>
```
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/slotName.jpg)
匹配流程如下
![在这里插入图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/slotName-2.jpg)
注：可以手动在`changeParams`函数内进行接口参数处理，亦可以传入整个组件给type，并通过`v-model`进行绑定，而无需通过插槽使用自定义组件详见 [type-vue组件类型 VueComponent](#VueComponent-domId)

#### <span id="VueComponent-domId">vue组件类型 VueComponent</span>
最后，type 也可以接收vue3 的相关组件，并仍可使用bind字段进行属性绑定，传入组件建议可通过`v-model`进行双向绑定，因内部实现方法为`modelValue`与`onUpdate:modelValue`进行的`v-mode`绑定，
另：如配置了[属性： changeToSearch（表单change事件是否触发搜索	）](#changeToSearch-domId)，请在组件内部暴露change事件，该属性底层为捕获`onChange`事件
既：自开发组件

 - 满足`<componentName v-model="data">`时，即可满足其基本条件 
 - 满足`<componentName v-model="data" @change="change">`时，即可满足其全部条件


为方便，作者复用elementUI的`ElInput`组件作为传入组件
```javascript
<template>
  <table-page :searchConfig="searchConfig" :tableApi="getMessageList" >
    <template #default>
	...
	// 与前文一致，省略处理
	...
    </template>
  </table-page>
</template>
<script setup>
  import TablePage from 'tablepage-vue3'
  import { getMessageList } from '@/api/message' // 接口
  import { ElInput } from 'element-plus'//可以用你写的组件
  const searchConfig = [
   {
      label: '自定义组件',
      key: 'DIY',
      type: ElInput,
      bind: {
        type: 'textarea'
      }
    }
  ]
</script>
```

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/type-obj.jpg)

![请添加图片描述](https://tablepage-vue3.oss-cn-beijing.aliyuncs.com/type-obj2.jpg)
