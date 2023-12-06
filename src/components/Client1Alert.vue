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
        <el-button type="danger" @click="publishPost()" style="height: 40vh; width: 60vw; margin-left: 20vw; margin-top: 20vh;font-size: 120px;">Alert</el-button>
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
          title: "Warning",
          content: "Warning",
          category: "Warning",
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
    }
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
    background-color: #00588b;
    color: white;
  }
  
  .el-card ::v-deep .el-card__body {
    background-color: #f7f7f7;
    color: black;
  }
  </style>
  