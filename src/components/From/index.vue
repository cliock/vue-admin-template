<template>
  <div class="from-content">
    <el-input v-if="type == 'text'" v-model="value" :disabled="disabled" placeholder="请输入内容"></el-input>
    <el-select v-if="type == 'select'" v-model="value" :disabled="disabled" placeholder="请选择" class="from-select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    echoValue: {
      type: String,
      default: ''
    }
  },
  name: 'From',
  data () {
    return {
      value: ''
    }
  },
  created () {
    this.value = this.echoValue
  }
}
</script>

<style lang="scss" scoped>
.from-content {
  width: 100%;
  height: 100%;

  .from-select {
    width: 100%;
    height: 100%;
  }
}
</style>
