<template>
  <div style="display: flex">
    <el-input v-model="value" style="width: 200px" />
    <div style="width: 200px">props{{ props }}</div>
  </div>
</template>
<script setup>
import { ElInput } from 'element-plus'
import { computed } from 'vue'
const props = defineProps({
  modelValue: String,
  type: String,
})
const emits = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emits('update:modelValue', val)
  },
})
</script>
