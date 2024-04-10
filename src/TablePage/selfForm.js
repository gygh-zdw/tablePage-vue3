import { h } from 'vue'
import { ElDatePicker, ElFormItem } from 'element-plus'
import { getBind, getComponent, isVueComponent } from './utils'
export default {
  name: 'selfForm',
  props: {
    searchConfigList: {
      type: Array,
      default: () => []
    },
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['change'],
  render(ctx) {
    const { searchConfigList, queryParams, $emit, $slots } = ctx
    return searchConfigList.map((item) => generateFormItem(item, { queryParams, $emit, $slots }))
  }
}
function generateFormItem(item, { queryParams, $emit, $slots }) {

  if (item.type === 'slot') {
    return createFormItem(item, getSlotObj($slots, item.slotName, queryParams))
  }
  if (item.type === 'times') {
    const startItem = { bind: item.startBind, key: 'startTime' }
    const endItem = { bind: item.endBind, key: 'endTime' }
    return createFormItem(item, [
      h(ElDatePicker, getDomBind(queryParams, startItem, true, $emit)),
      ' - ',
      h(ElDatePicker, getDomBind(queryParams, endItem, true, $emit))
    ])
  }
  const component = isVueComponent(item.type) ? item.type : getComponent(item)
  return createFormItem(item, h(component, getDomBind(queryParams, item, component === ElDatePicker, $emit), getSlotObj($slots, item.childSlot, {}, true)))
}
function createFormItem(item, dom) {
  return h(item.noLabel ? 'span' : ElFormItem, { label: item.label }, item.noLabel ? dom : () => dom)
}
function getSlotObj($slots, key, param, defaultFun) {
  if (!key || !$slots[key]) return undefined
  if (defaultFun) {
    return { default: () => $slots[key](param) }
  }
  return $slots[key](param)
}
function getDomBind(queryParams, item, isTime, $emit) {
  return {
    modelValue: queryParams[item.key],
    'onUpdate:modelValue': (value) => { queryParams[item.key] = value; },
    'onChange': (value) => $emit('change', value),
    ...getBind(item, isTime)
  }
}