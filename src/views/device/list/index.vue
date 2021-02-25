<template>
  <div class="eq-list">
    <el-row>
      <el-button type="primary" @click="showDialogFn">添加</el-button>
      <el-button>筛选</el-button>
    </el-row>

    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="ID"
        width="50">
      </el-table-column>
      <el-table-column
        property="date"
        label="时间">
      </el-table-column>
      <el-table-column
        property="name"
        label="姓名">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleDetail(scope.$index, scope.row)">详情
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handleQrcode(scope.$index, scope.row)">查看二维码
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-box">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000">
      </el-pagination>
    </div>
    <el-dialog
      title="添加设备"
      :visible.sync="isShowDialog"
      :close-on-click-modal="false"
      custom-class="add-dialog"
    >
      <div class="custom-wrapper">
        <custom-from :froms="froms[currentMenu]" @submitBtn="submitFn" @cancelBtn="hideDialogFn"
                     class="custom-content"/>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import CustomFrom from '@/components/From/CustomFrom/index'

export default {
  name: 'Index',
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      isShowDialog: false // 是否显示添加数据弹窗
    }
  },
  methods: {
    /**
     * 列表详情按钮
     * @param index 数据下标 从0开始
     * @param row  第几行
     */
    handleDetail (index, row) {
      console.log(index, row)
      this.$router.push({
        path: '/device/detail',
        query: {
          id: index
        }
      })
    },
    /**
     * 列表查看二维码按钮
     * @param index 数据下标 从0开始
     * @param row 第几行
     */
    handleQrcode (index, row) {
      console.log(index, row)
    },
    /**
     * 展示添加层
     */
    showDialogFn () {
      this.isShowDialog = true
    },
    /**
     * 隐藏添加层
     */
    hideDialogFn () {
      this.isShowDialog = false
    },
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
.eq-list {
  width: 100%;
  height: 100%;

  .pagination-box {
    margin-top: 15px;
  }

  .custom-wrapper {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #dcdfe6;

  }
}
</style>
