<template>
  <div class="wz-home">
    <div v-for="(item, index) in createData" :key="index" :ref="`from${index}`">
      <from v-if="item.type == 'text'" :type="item.type"></from>
      <from v-else-if="item.type == 'select'" :type="item.type" :options="item.option"></from>
    </div>
    <div style="width: 50px;height: 50px;background: #97a8be" @click="show">查看</div>
  </div>
</template>

<script>
import From from '@/components/From/index'

export default {
  name: 'Home',
  components: {
    From
  },
  data () {
    return {
      selectOption: [
        {label: '测试', value: 1},
        {label: '测试2', value: 2}
      ],
      createData: [
        {type: 'text'},
        {
          type: 'select',
          option: [
            {label: '测试', value: 1},
            {label: '测试2', value: 2}
          ]
        }
      ]
    }
  },
  methods: {
    show () {
      for (let i = 0; i < this.createData.length; i++) {
        console.log(this.$children[i]['value'])
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wz-home {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
