<template>
  <div class="register">
    <div class="registeri-title">
      <img class="registeri-title-picture" src="../assets/images/head-tip.png" alt="">
    </div>
    <div class="auth-content_nav">
      <span class="phone" :class="state.tab=='phone'?'active':''" @click="setRegisterActive('phone')">手机注册</span>
      <span class="email" :class="state.tab=='email'?'active':''" @click="setRegisterActive('email')">邮箱注册</span>
    </div>
    <Email
      ref="email"
      v-if="state.tab=='email'"
      @register:sendCode="getCode"
    />
    <Phone
      v-else
      @register:sendCode="getCode"
      ref="phone"/>
    <downitem/>
  </div>
</template>

<script>
  import Email from "@/components/auth/email"
  import Phone from "@/components/auth/phone"
  import downitem from '@/components/downitem'
  import Captcha from '@/store/captcha'

  export default {
    name: 'Home',
    components: {
      Email, Phone, downitem
    },
    data() {
      return {
        state: {
          tab: 'phone'
        },
        countryOptions: [],
      }
    },
    methods: {
      setRegisterActive(tab) {
        this.state.tab = tab
      },
      getCode(_self) {
        const _tab = this.state.tab
        const _send = _self.sendModel
        _self.state.send = true;
        const post = _tab == 'email' ? 'email_verifycode_send' : 'sms_verifycode_send';
        
        Captcha.init().then((res) => {
          if (res && res.ret == 0) {
            _send.randstr = res.randstr
            _send.ticket = res.ticket
            _send.captchaid = Captcha.appId
            this.$store.dispatch(post, _send)
              .then(({data, msg}) => {
                if (data) {
                  this.delaySend(_self, data)
                } else {
                  _tab == 'email' ? this.$refs.email.closeloading() : this.$refs.phone.closeloading();
                  this.$toast({
                    message: msg,
                    position: 'middle',
                    duration: 5000
                  });
                }
              })
          } else if (res && res.ret == 2) {
            _self.state.send = false
          }
        })
          .catch((error) => {
            _self.state.send = false;
          })
      },
      delaySend(_self, data) {
        
        const _this = this;
        let _m = _self.state
        return new Promise(function (resolve) {
          if (!(data && data.succeed)) {
            resolve(true)
            return
          }
          let number = 119
          _m.send = false
          _m.sendDelayState = true
          _m.sendDelay = number + 's'
          const _timer = setInterval(() => {
            --number
            _m.sendDelay = number + 's'
            if (number == 0) {
              _m.sendDelayState = false
              _m.sendDelay = '获取验证码';
              clearInterval(_timer)
              resolve(true)
            }
          }, 1000)
        })
      }
    },
    mounted() {

    }
  }
</script>
<style scoped lang="less">
  @import "../assets/style/auth";

  .register {
    .register-title {
      width: 100%;
      height: 17%;
      img {
        display: block;
        width: 100%;
      }
    }
    .auth-content_nav {
      text-align: center;
      font-size: 16px;
      color: #21283E;
      letter-spacing: 0;
      line-height: 20px;
      margin-top: 20px;
      span {
        padding: 0 15px;
      }
      span:first-child {
        border-right: 1px solid #dddddd;
      }
      span.active {
        color: #646B8C;
      }
    }
  }

</style>
