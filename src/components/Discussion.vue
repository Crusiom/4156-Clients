<template>
  <el-container v-loading="loading">
    <el-header style="background-color: #193562" height="100px">
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
        Health Discussion Platform
        <el-button
          style="margin-left: 50vw; line-height: 20px"
          type="primary"
          @click="drawer = true"
          >Publish a post</el-button
        >
      </div>
    </el-header>
    <el-header style="padding: 0; margin: 0">
      <el-menu
        default-active="0"
        mode="horizontal"
        @select="changeCategory"
        background-color="#9FCBEA"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          style="
            width: 14.2%;
            text-align: center;
            background-color: #9fcbea;
            color: #013c5d;
            font-weight: bold;
            font-size: 20px;
            text-transform: capitalize;
          "
          v-for="item in newsItems"
          :key="item"
          :index="newsTypes[item]"
          >{{ newsTypes[item] }}</el-menu-item
        >
      </el-menu>
    </el-header>
    <el-container>
      <el-main
        style="
          padding: 0;
          border: #005e96 10px solid;
          overflow-y: scroll;
          height: calc(100vh - 160px);
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
                {{ item.content }}
              </div>
              <br />
              <hr />
              <div>
                <h4 style="display: inline">Comments</h4>
                <el-button type="primary" @click="getComments(item._id, index)" style="margin-left: 20px;">Show Comment</el-button>
                <hr />
                <div v-for="(commentItem, commentIndex) in comment[index]" :key="commentIndex">
                  <i class="el-icon-user-solid"></i> : {{ commentItem.content }}
                </div>
                <br />
                <el-form
                  label-width="80px"
                  style="
                    background-color: #fcfcfc;
                    padding: 10px;
                    border-radius: 5px;
                  "
                >
                  <el-form-item label="Comment" prop="comment">
                    <el-input
                      placeholder="Please Enter your comment"
                      v-model="commentForm.content"
                    ></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="postComment(item._id, comment[index])">Publish Comment</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-card>
          </div>
        </div>
        <el-drawer
          title="Publish Your Health Question!"
          :visible.sync="drawer"
          direction="rtl"
        >
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="Title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="Category">
              <el-select v-model="form.category" placeholder="Please select Category">
                <el-option label="Internal" value="Internal"></el-option>
                <el-option label="Oncology" value="Oncology"></el-option>
                <el-option label="Respiratory" value="Respiratory"></el-option>
                <el-option label="Cardiology" value="Cardiology"></el-option>
                <el-option label="Psychiatry" value="Psychiatry"></el-option>
                <el-option label="Surgery" value="Surgery"></el-option>
                <el-option label="Obstetricsy" value="Obstetricsy"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Content">
              <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="publishPost()">Publish</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      token: "",
      loading: false,
      healthPosts: [],
      comment: [],
      newsTypes: [
        "Internal",
        "Oncology",
        "Respiratory",
        "Cardiology",
        "Psychiatry",
        "Surgery",
        "Obstetricsy",
      ],
      newsItems: [0, 1, 2, 3, 4, 5, 6],
      form: {
        title: "",
        content: "",
        category: ""
      },
      commentForm: {
        eventId: "",
        title: "default",
        content: "",
        category: "default",
        event: "Forum"
      }
    };
  },
  methods: {
    publishPost() {
      const that = this
      this.$axios
      .post("/api/v1/events", that.form,{
        headers: {
          Authorization: that.token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("publish post failed...")
      });
    },
    changeCategory(category) {
      const that = this
      this.$axios
      .get(`/api/v1/events?category=${category}`,{
        headers: {
          Authorization: that.token,
        },
      })
      .then((res) => {
        that.comment = [];
        that.healthPosts = res.data.data;
        for (let i = 0; i < that.healthPosts.length; i++) {
          that.comment.push([]);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("change category failed...")
      });
    },
    getComments(eventId, index) {
      const that = this
      this.$axios
      .get(`/api/v1/reviews/event/${eventId}`,{
        headers: {
          Authorization: that.token,
        },
      })
      .then((res) => {
        let temp = [];
        for (let i = 0; i < that.comment.length; i++) {
          temp.push(that.comment[i]);
        }
        temp[index] = res.data.data;
        that.comment = temp;
      })
      .catch((error) => {
        console.log(error);
        alert("get comments failed...")
      });
    },
    postComment(eventId, item) {
      const that = this
      that.commentForm.eventId = eventId;
      this.$axios
      .post(`/api/v1/reviews`, that.commentForm, {
        headers: {
          Authorization: that.token,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        item.push({content: that.commentForm.content})
      })
      .catch((error) => {
        console.log(error);
        alert("post comments failed...")
      });
    }
  },

  created() {
    if (this.$route.query) {
      this.token = this.$route.query.token;
    }
    const that = this;
    this.$axios
      .get("/api/v1/events", {
        headers: {
          Authorization: that.token,
        },
      })
      .then((res) => {
        that.healthPosts = res.data.data;
        that.comment = [];
        for (let i = 0; i < that.healthPosts.length; i++) {
          that.comment.push([]);
        }
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
  background-color: #005e96;
  color: white;
}

.el-card ::v-deep .el-card__body {
  background-color: #f7f7f7;
  color: black;
}
</style>