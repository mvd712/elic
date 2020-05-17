<template>
    <div>
     <el-card>
       <el-button type="primary">添加角色</el-button>
       <el-table :data="roleList" border stripe>
         <el-table-column type="expand">
           <template #default="{ row }">
             <el-row v-for="(item1, i1) in row.children" :key="item1.id" :class="['bdBottom','itemsCenter',i1==0?'bdTop':'']">
               <el-col :span="5">
                 <!--一级权限-->
                 <el-tag closable @close="removeRights(row, item1.id)">{{ item1.authName }}</el-tag>
                 <i class="el-icon-caret-right"></i>
               </el-col>
               <el-col :span="19">
                 <!--通过for循环嵌套的渲染二级权限-->
                 <el-row v-for="(item2, i2) in item1.children" :key="item2.id" :class="['itemsCenter',i2==0?'':'bdTop' ]">
                   <!--二级权限-->
                   <el-col :span="6">
                     <el-tag closable @close="removeRights(row, item2.id)"  type="success">{{ item2.authName }}</el-tag>
                     <i class="el-icon-caret-right"></i>
                   </el-col>
                   <!--三级权限-->
                   <el-col :span="18">
                     <el-tag closable @close="removeRights(row, item3.id)"  v-for="item3 in item2.children" type="warning" :key="item3.id">{{ item3.authName }}</el-tag>
                   </el-col>
                 </el-row>
               </el-col>
             </el-row>

           </template>
         </el-table-column>
         <el-table-column type="index" label="#"></el-table-column>
         <el-table-column prop="roleName" label="角色名称"></el-table-column>
         <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
         <el-table-column prop="roleDesc" label="角色描述"></el-table-column>
         <el-table-column label="操作">
           <template>
             <el-button type="primary" icon="el-icon-edit" size="mini" >编辑</el-button>
             <el-button type="danger" icon="el-icon-delete" size="mini" >删除</el-button>
             <el-button type="warning" icon="el-icon-setting" size="mini" >分配权限</el-button>
           </template>
         </el-table-column>

       </el-table>
     </el-card>
    </div>
</template>

<script>
    export default {
        name: 'Roles',
      data () {
          return {
            roleList:[]
          }
      },
      created () {
        this.getRoleList()
      },
      methods: {
          async getRoleList () {
            const { data: res } = await this.$http.get('roles')
            if (res.meta.status !== 200) return this.$message.error('获取失败')
            this.roleList = res.data
          },
          async removeRights(role, rightId) {
          const confirmRes = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)

          if (confirmRes !== 'confirm') return this.$message.info('取消了删除')
          // 发请求
          const { data: res } = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
          if (res.meta.status !== 200) return this.$message.eror('删除权限失败')
          // 删除成功, 不建议刷新数据, 利用返回给我们的修改之后的数据赋值给data的中参数即可
          console.log(res)
          console.log(role)
          role.children = res.data
        }
      }
    }
</script>

<style scoped>
  .el-tag{
    margin: 8px;
  }
  .bdBottom{
    border-bottom: 1px solid #eee;
  }
  .bdTop{
    border-top: 1px solid #eee;
  }
  .itemsCenter{
    display: flex;
    align-items: center;
  }
</style>
