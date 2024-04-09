import { h } from 'vue'
import { ElTableColumn } from 'element-plus'

export default {
  name: 'selfColumn',
  props: {
    tableColumnList: {
      type: Array,
      default: () => []
    }
  },
  render(ctx) {
    const { tableColumnList } = ctx
    const tableColumnListStor = getTableColumnList(ctx, tableColumnList)
    return tableColumnListStor
  }
}
function getTableColumnList(ctx, list) {
  return list.map((item) => {
    const props = { align: 'center', ...item }
    if (!item.slotName && (!item.child || item.child.length === 0)) {
      //默认展示
      return h(ElTableColumn, props)
    }
    if (item.slotName) {
      //插槽展示
      return h(ElTableColumn, props, (scope) => ctx.$slots[item.slotName] && ctx.$slots[item.slotName](scope))
    }
    if (!item.slotName && item.child && item.child.length !== 0) {
      //递归展示
      return h(ElTableColumn, props, getTableColumnList(ctx, item.child))
    }
    return h(ElTableColumn, props)
  })
}
