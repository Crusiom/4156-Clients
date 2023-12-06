<template>
  <el-container v-loading="loading">
    <el-header style="background-color: #62191d" height="100px">
      <div
        style="
          color: #fcfcfc;
          font-size: 45px;
          font-weight: bold;
          display: inline-block;
          margin-left: 50px;
          margin-top: 20px;
        "
      >
        Health Center Alarm System
      </div>
    </el-header>
    <el-container>
      <el-main
        style="
          padding: 0;
          border: #960000 10px solid;
          overflow-y: scroll;
          height: calc(100vh - 100px);
        "
      >
        <div class="health-posts">
          <div
            v-for="(item, index) in healthPosts"
            :key="index"
            class="health-post"
          >
            <el-card class="box-card">
              <div slot="header" class="post-header">
                <span>{{ item.title }}</span>
              </div>
              <div class="post-content">
                {{ item.author }}
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmZhYjdhNjlmNWM0MzYxZWI0ZDU0YSIsImlhdCI6MTcwMTgxNzIxMCwiZXhwIjoxNzA0NDA5MjEwfQ.J9BJ9a3syvFiwXSeI84SL3V_ymNCvmhrSbzR2C4AAF4",
      loading: false,
      healthPosts: [],
      form: {
        title: "",
        content: "",
        category: "",
      },
    };
  },
  methods: {
    publishPost() {
      const that = this;
      this.$axios
        .post("/api/v1/events", that.form, {
          headers: {
            Authorization: that.token,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          that.localtion.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    const that = this;
    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NmZhYjdhNjlmNWM0MzYxZWI0ZDU0YSIsImlhdCI6MTcwMTgxNzIxMCwiZXhwIjoxNzA0NDA5MjEwfQ.J9BJ9a3syvFiwXSeI84SL3V_ymNCvmhrSbzR2C4AAF4"
    this.$axios
      .get("/api/v1/events", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        that.healthPosts = res.data.data;
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.health-post {
  width: 96vw;
  margin-left: 1vw;
  margin-top: 10px;
}
.post-header {
  font-weight: bold;
  font-size: 30px;
}

.box-card {
  background-color: #8b0000;
  color: white;
}

.el-card ::v-deep .el-card__body {
  background-color: #f7f7f7;
  color: black;
}
</style>
