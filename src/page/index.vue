<template>
  <div class="invitation" :style="{'width':phones?'100%':'30%','margin':phones?'inherit':'auto','height':windowH+'px'}">
    <p class="invitation-title">您好！先行者！</p>
    <p class="invitation-title">欢迎来到HEX的世界</p>
    <p class="invitation-experience">开启数字资产交易新体验</p>
    <p class="invitation-person">你的好友 <span>落薇</span> 邀请你参与HEX公测</p>
    <div class="head-award">
      <img src="../assets/images//head-award.png" alt="">
    </div>
    <div class="register-btn">
      <router-link to="/register">
        <img src="../assets/images/register-btn.png" alt="">
      </router-link>
    </div>
    <p class="down-hex">我已经有账号，前往 <span>下载HEX APP</span></p>
    <downitem/>
  </div>
</template>

<script>
import downitem from "@/components/downitem";
export default {
  name: "invite",
  components: {
    downitem
  },
  data() {
    return {};
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
img {
  display: block;
  width: 100%;
}

.invitation {
  position: relative;
  padding-top: 3%;
  background: url("../assets/images/invite-register.png") no-repeat top left;
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
  .invitation-title {
    font-size: 32px;
    color: #4169aa;
    letter-spacing: 1px;
    text-align: center;
    line-height: 32px;
  }
  .invitation-title:first-child {
    margin-bottom: 10px;
  }
  .invitation-experience {
    font-size: 18px;
    color: #4169aa;
    letter-spacing: 0;
    text-align: center;
    line-height: 26px;
    margin-top: 2.2%;
  }
  .invitation-person {
    font-size: 15px;
    color: #344b6c;
    letter-spacing: 0;
    text-align: center;
    margin-top: 1.2%;
    span {
      font-size: 15px;
      color: rgba(3, 191, 123, 1);
      letter-spacing: 0;
      text-align: center;
      line-height: 21px;
    }
  }
  .head-award {
    width: 60%;
    height: 4.2%;
    margin: auto;
    margin-top: 1.3%;
  }
  .register-btn {
    width:30%;
    height: 7.5%;
    margin: 3.7% auto;
  }
  .down-hex {
    text-align: center;
    span {
      color: #2895fb;
    }
  }
}
</style>
