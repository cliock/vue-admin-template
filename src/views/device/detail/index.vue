<template>
  <div id="eq-detail">
    <custom-from :froms="froms[currentMenu]" :showBtn="showBtn" @submitBtn="submitFn"
                 class="custom-content"></custom-from>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CustomFrom from '@/components/From/CustomFrom/index'

export default {
  name: 'Detail',
  components: {
    CustomFrom
  },
  computed: {
    ...mapGetters([
      'froms',
      'currentMenu'
    ])
  },
  data () {
    return {
      showBtn: {
        showCancelBtn: false,
        submitBtnName: '修改'
      }
    }
  },
  methods: {
    /**
     * 表单确认按钮
     * @param data: 获取定制表单的输入内容
     */
    submitFn (data) {
      console.log(data)
    }
  }
}
</script>

<style lang="scss" scoped>
#eq-detail {
  width: 50%;
}
</style>
