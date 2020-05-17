<template>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button slot="append"  icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-table :data="orderList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="order_number" label="订单编号"></el-table-column>
          <el-table-column prop="order_price" label="订单价格"></el-table-column>
          <el-table-column prop="is_send" label="是否付款"></el-table-column>
          <el-table-column prop="update_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template>
            </template>
          </el-table-column>

        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[2, 4, 6, 8]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-card>
    </div>
</template>

<script>
    export default {
        name: 'Orders',
      data () {
          return {
            orderList:[],
            queryInfo: {
              query: 1,
              pagenum: 1,
              pagesize: 5
            },
            total:0
        }
      },
      created() {
          this.getOrdersList()
      },
      methods: {
        async  getOrdersList() {
          const { data: res } = await this.$http.get('orders', {
            params: this.queryInfo
          })
          console.log(res.data)
          if (res.meta.status !== 200) return this.$message.error('获取失败')
          this.orderList = res.data.goods
          this.total = res.data.total
          },
        handleSizeChange(newSize) {
          this.queryInfo.pagesize = newSize
          // 重新获取数据
          this.getOrdersList()
        },

        handleCurrentChange(newPage) {
          this.queryInfo.pagenum = newPage
          // 重新获取数据
          this.getOrdersList()
        }
      }
    }
</script>

<style scoped>

</style>
