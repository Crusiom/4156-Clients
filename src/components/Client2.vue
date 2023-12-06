<template>
  <el-container v-loading="loading">
    <el-container>
      <el-main
        style="
          height: 100vh;
          width: 100vw;
          background-image: url('bg.jpg');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          -moz-background-size: 100% 100%;
        "
      >
        <div
          style="
            border: #193562 10px solid;
            margin-left: 25vw;
            text-align: center;
            margin-top: 14vh;
            height: 60vh;
            width: 50vw;
            background-color: white;
          "
        >
          <div
            style="
              color: #193562;
              font-size: 60px;
              font-weight: bold;
              margin-top: 30px;
            "
          >
            Health Discussion
          </div>
          <br />
          <div style="color: #9fcbea; font-size: 25px">
            "Share your question and get answers!"
          </div>
          <br /><br />
          <div class="input-label">Email Address</div>
          <br />
          <el-input
            class="login-input"
            placeholder="Please enter your email address"
            v-model="email"
          ></el-input>
          <br /><br />
          <div class="input-label">Password</div>
          <br />
          <el-input
            class="login-input"
            placeholder="Please enter your password"
            v-model="password"
            show-password
          ></el-input>
          <br /><br /><br />
          <el-button class="login-bot" size="medium" @click="login()"
            >Login</el-button
          >
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      email: "dw3033@columbia.edu",
      password: "123",
      loading: false,
    };
  },
  methods: {
    goToDiscussion(token) {
      const that = this;
      this.$router.push({
        path: "/client-2/dashboard",
        query: {
          token: "Bearer " + token,
        },
      });
    },
    login() {
      const that = this;
      that.loading = true;
      this.$axios
        .post("/api/v1/auth/login", {
          email: that.email,
          password: that.password,
        })
        .then((res) => {
          that.goToDiscussion(res.data.token);
        })
        .catch((error) => {
          console.log(error);
          alert("Wrong email or password");
        });
      that.loading = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input-label {
  color: #193562;
  font-size: 20px;
  font-weight: bold;
}

.login-input {
  display: inline-block;
  width: 60%;
  border: #193562 2px solid;
  font-size: 15px;
}
.login-bot {
  background-color: #193562;
  width: 150px;
  height: 50px;
  color: white;
  font-weight: bold;
  font-size: 20px;
}
.register-bot {
  background-color: #9fcbea;
  width: 200px;
  height: 50px;
  color: #193562;
  font-weight: bold;
  font-size: 20px;
}
</style>
