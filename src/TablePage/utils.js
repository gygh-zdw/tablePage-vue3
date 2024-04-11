import * as ElementPlus from 'element-plus'
const defTmBindData = {
  style: 'width: 190px',
  type: 'datetime',
  placeholder: '请选择时间',
  format: 'YYYY-MM-DD HH:mm:ss',
  valueFormat: 'YYYY-MM-DD HH:mm:ss'
}
export function getBind(configItem, isTm) {
  const defBindData = {
    placeholder: configItem.label || '',
    clearable: true,
    style: 'width: 200px'
  }
  const bindData = { ...(configItem.bind || {}) }
  if (isTm) {
    return { ...defTmBindData, ...bindData }
  }
  return { ...defBindData, ...bindData }
}
export function getComponentName(name = 'input') {
  const nameStr = name || 'input'
  const nameSplitList = nameStr.split('-').map(str => str.charAt(0).toUpperCase() + str.slice(1))
  if (nameSplitList[0] !== 'El' && nameSplitList[0].slice(0, 2) !== 'El') {
    nameSplitList.unshift('El')
  }
  return nameSplitList.join('')
}

export function getComponent(configItem) {
  const componentName = getComponentName(configItem.type || 'input')
  if (ElementPlus[componentName]) {
    return ElementPlus[componentName]
  }
  return ElementPlus['ElInput']
}
function getSlotAndChildSlot(item, list = [], slotKeyList = []) {
  slotKeyList.forEach(key => {
    if (item[key]) {
      list.push(item[key])
    }
  })
  if (item.child && item.child.length !== 0) {
    item.child.forEach((child) => {
      getSlotAndChildSlot(child, list)
    })
  }
  return list
}
export function getSlotList(list, slotKeyList = []) {
  if (!list) return []
  return list.map((item) => getSlotAndChildSlot(item, [], slotKeyList)).flatMap((item) => item)
}
export function rowScopeToRaw(row) {
  const data = {
    $index: row.$index,
    cellIndex: row.cellIndex,
    column: row.column,
    expanded: row.expanded,
    row: row.row
  }
  return data
}

//判断是否为vue组件
export function isVueComponent(obj) {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    (obj.render || obj.install) && // Vue 3的响应式标记
    (typeof obj.render === 'function' || typeof obj.install === 'function') // 确保有渲染函数
  );
}