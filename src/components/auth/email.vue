<style lang="less" scoped>
  .auth-content_group--error .normal-tip_error {
    display: inline-block;
  }

  .auth-content_group.auth-content_group--error input {
    border: 1px solid red;
    color: red;
  }

  .phone {
    padding: 0 8%;
    .auth-content_form .auth-content_group {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #DDDDdd;
      display: flex;
      select {
        border: none;
        outline: none;
      }
      .country {
        width: 100%;
      }
      input {
        border: none;
        display: inline-block;
      }
      .getCode {
        background: none;
        float: right;
        color: #2895FB;
        line-height: 40px;

      }
    }
  }

  .agreement {
    margin-top: 15px;
    span {
      color: #2895FB;
    }
  }

  .flex {
    display: flex;
  }

  .flex-auto {
    flex: auto;
  }

  .registerbtn {
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background: #2895FB;
    text-align: center;
    color: white;
    line-height: 40px;
    margin-top: 20px;
  }
</style>

<template>
  <div class="phone">
    <div class="auth-content_form">
      <div class="auth-content_group area auth-content_group_border"
           :class="{'auth-content_group--error':$v.signModel.email.$error}">
        <input class="flex-auto"
               v-model.trim="$v.signModel.email.$model"
               placeholder="输入邮箱号码"
               type="text">
      </div>

      <div class="auth-content_group area auth-content_group_border"
           :class="{'auth-content_group--error':$v.signModel.verifycode.$error}">
        <input class="flex-auto"
               v-model.trim="$v.signModel.verifycode.$model"
               placeholder="输入验证码"
               type="text">
        <span class=" get-code button-loading--por" style="height: 30px;"
              :class="{'auth-content_group--unavailable':state.sendDelayState}"
              v-loading="state.send"
              @click="getCode(1)">{{state.sendDelay}}</span>
      </div>

      <div class="auth-content_group "
           :class="{'auth-content_group--error':$v.signModel.password.$error,
           'auth-content_group_border':!$v.signModel.password.$error}">
        <input class="flex-auto"
               v-model.trim="$v.signModel.password.$model"
               placeholder="输入登录密码(8-20位字符)"
               type="password">
        <span class="password_group_tip" v-if="!$v.signModel.password.$error">
                <span class="password_group_tip week" v-show="signModel.passwordstrength==1">弱</span>
                <span class="password_group_tip middle" v-show="signModel.passwordstrength==2">中</span>
                <span class="password_group_tip strong" v-show="signModel.passwordstrength==3">强</span>
        </span>
      </div>

      <div class="auth-content_group auth-content_group_border"
           :class="{'auth-content_group--error':$v.signModel.passwordagain.$error}">
        <input class="flex-auto"
               v-model.trim="$v.signModel.passwordagain.$model"
               placeholder="再次输入登录密码"
               type="password">
      </div>

      <div class="auth-content_group auth-content_group_border">
        <input class="input"
               v-model.trim="signModel.referee"
               placeholder="邀请码（可不填）"
               type="text">
      </div>
      <div class="agreement">
        <el-checkbox v-model="state.check">
          <span class="label-tip">我已阅读并同意HEX.com<span>《服务条款》 </span></span>
        </el-checkbox>
      </div>
      <div>
        <div class=" registerbtn auth-content_button"
             @click="signUp">
          注册
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import {required, email, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/store/crypto";

  export default {
    name: "phone",
    watch: {
      'signModel.password': function (val) {
        const _signModel = this.signModel
        if (this.reg.strong.test(val)) {
          _signModel.passwordstrength = 3
        } else if (this.reg.middle.test(val)) {
          _signModel.passwordstrength = 2
        } else if (this.reg.single.test(val)) {
          _signModel.passwordstrength = 1
        } else {
          _signModel.passwordstrength = 0
        }
      }
    },
    validations: {
      signModel: {
        email: {
          required, email
        },
        verifycode: {
          required
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        passwordagain: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    data() {
      return {
        loading: false,
        isemail: true,
        popupStatue: false,
        state: {
          send: false,
          check: true,
          signup: false,
          sendDelay: "获取验证码",
          sendDelayState: false
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        //注册model
        signModel: this.getModel(),
        //验证model
        sendModel: {
          email: '',
          template: 'Signup'
        },
      }
    },
    methods: {
      closeloading() {
        this.state.send = false;
      },
      getModel() {
        const m = {
          signuptype: 'email',
          email: '',
          password: '',
          passwordagain: '',
          verifycode: '',
          passwordstrength: '',
          source: '',
          referee: '',
          usertype: 0,
        }
        return m
      },

      getCode(val) {
        const _self = this;
        if (_self.state.send) return
        this.sendModel.email = this.signModel.email;
        const email = this.$v.signModel.email;
        email.$touch();
        if (email.$invalid) return;
        _self.state.send = true;
        this.$store.dispatch("user_user_exist", {email: this.signModel.email}).then(({data}) => {
          if (data) {
            _self.state.send = false
            _self.$toast({
              message: '邮箱已存在',
              position: 'middle',
              duration: 5000
            });
          } else {
            _self.$emit('register:sendCode', _self)
          }
        })
      },
      signUp() {
        if (!this.state.check) return
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        const _signModel = _self.$v.signModel;
        _signModel.$touch();
        if (_signModel.$invalid){
          this.$toast({
            message: '请将信息填写完整',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if (_self.state.signup) return;
        if (_self.loading) {
          return;
        }
        _self.loading = true;
        _self.state.signup = true;
        _sign.password = crypto.md5String(_sign.password);
        delete _sign.passwordagain;
        
        _self.$store.dispatch('user_user_signup', _sign).then((res) => {
          if (res.data) {
            _self.$toast({
              message: res.msg,
              position: 'middle',
              duration: 5000
            });
            _self.$store.commit('set_user_info', res);
            _self.$router.push('/success')
          }
          _self.loading = false;
        })
          .then((data) => {
            _self.state.signup = false;
          })
      },
    }

  }
</script>
