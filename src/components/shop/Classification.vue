<template>
    <div>
      ok
    </div>
</template>

<script>
    export default {
        name: 'Classification',
      data() {
          return {
            params:[],
            queryInfos: {
              id:1
            }
          }
      },
      created() {
          this.getParamsData()
      },
      methods: {
         async getParamsData() {
           const { data: res } = await this.$http.get('categories', {
             params: this.queryInfos
           })
           this.params = res.data
           console.log(res.data)
         }
      }
    }
</script>

<style scoped>

</style>
