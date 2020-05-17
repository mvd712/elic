<template>
    <div>
      <el-card>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容">
              <el-button slot="append"  icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button  type="primary">添加用户</el-button>
          </el-col>
        </el-row>
        <el-table :data="GoodsList" border stripe>
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格"></el-table-column>
          <el-table-column prop="goods_number" label="商品数量"></el-table-column>
          <el-table-column prop="upd_time" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="primary" icon="el-icon-edit" size="mini" >编辑</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" >删除</el-button>
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
        name: 'Goods',
      data() {
          return {
            GoodsList: [],
            queryInfo: {
              query: 1,
              pagenum: 1,
              pagesize: 5
            },
            total: 1
          }
      },
      created() {
        this.getGoodsList()
      },
      methods: {
        async getGoodsList () {
          const { data: res } = await this.$http.get('goods', {
            params: this.queryInfo
          })
          console.log(res.data.goods)
          if (res.meta.status !== 200) return this.$message.error('获取失败')
          this.GoodsList = res.data.goods
          this.total = res.data.total
        },
        handleSizeChange(newSize) {
          this.queryInfo.pagesize = newSize
          // 重新获取数据
          this.getGoodsList()
        },

        handleCurrentChange(newPage) {
          this.queryInfo.pagenum = newPage
          // 重新获取数据
          this.getGoodsList()
        }
      }
    }
</script>

<style scoped>

</style>
