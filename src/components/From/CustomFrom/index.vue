<template>
  <div id="custom-from">

    <div v-for="(item, index) in froms" :key="index" :ref="`from${index}`"
         class="el-form el-form--label-right">
      <!-- is-required 添加类名显示必填小红星样式 -->
      <div class="el-form-item" :class="{'is-required': item.require}">
        <label class="el-form-item__label">{{ item.label }}</label>
        <div class="el-form-item__content">
          <div class="from-content">
            <div class="el-input">
              <from v-if="item.type == 'text'" :type="item.type" :echoValue="item.echoValue"
                    :disabled="item.disabled"></from>
              <from v-else-if="item.type == 'select'" :type="item.type" :echoValue="item.echoValue"
                    :options="item.option"
                    :disabled="item.disabled"></from>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-row v-if="showBtnData.showBtnRow" :style="{'text-align': showBtnData.btnPosition}">
      <el-button v-if="showBtnData.showSubmitBtn" type="primary" @click="submitBtnFn">{{ showBtnData.submitBtnName }}
      </el-button>
      <el-button v-if="showBtnData.showCancelBtn" @click="cancelBtnFn">{{ showBtnData.cancelBtnName }}</el-button>
    </el-row>
  </div>
</template>

<script>
import From from '@/components/From/index'

export default {
  name: 'CustomFrom',
  components: {
    From
  },
  props: {
    showBtn: {
      type: Object,
      default: () => {
        return {}
      }
    },
    froms: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      showBtnData: {
        showBtnRow: true,
        btnPosition: 'right',
        showSubmitBtn: true,
        submitBtnName: '添加',
        showCancelBtn: true,
        cancelBtnName: '取消'
      }
    }
  },
  methods: {
    /**
     * 确认添加按钮
     */
    submitBtnFn () {
      const fromsData = {}
      for (let i = 0; i < this.froms.length; i++) {
        fromsData[`from${i}`] = this.$children[i]['value']
      }
      this.$emit('submitBtn', fromsData)
    },
    cancelBtnFn () {
      if (this.showBtnData.showCancelBtn) {
        this.$emit('cancelBtn')
      }
    }
  },
  created () {
    Object.assign(this.showBtnData, this.showBtn)
  }
}
</script>

<style lang="scss" scoped>
.input-title {
  font-size: 16px;
  height: 40px;
  line-height: 40px;
  text-align: left;
}

.el-form-item__label {
  width: 100px;
}

.el-form-item__content {
  margin-left: 100px;
}
</style>
