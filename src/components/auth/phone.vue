<style lang="less" scoped>
  .phone {
    padding: 0 8%;
    .auth-content_form .auth-content_group {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      /*border-bottom: 1px solid #DDDDdd !important;*/
      display: flex;
      select {
        border: none;
        outline: none;
      }
      .country {
        width: 100%;
      }
      input {
        display: inline-block;
      }
      .getCode {
        background: none;
        float: right;
        color: #2895FB;
        line-height: 40px;

      }
      .areaCode.isTrue {
        padding-right: 10px;
      }
    }
    .auth-content_group_border{
      border-bottom: 1px solid #DDDDdd;
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

  .el-select.select_input {
    width: 100%;
    input {
      border: none !important;
    }
  }
  .password_group_tip{
    span.week{
      color:red;
    }
    span.middle{
      color:yellow;
    }
    span.strong{
      color:green;
    }
  }
</style>

<template>
  <div class="phone">
    <div class="auth-content_form">
      <div class="auth-content_group "
           :class="{'auth-content_group--error':$v.signModel.countryid.$error}">
        <el-select
          filterable
          class="select_input"
          popper-class="select_input_popper"
          :popper-append-to-body="false"
          v-model.trim="$v.signModel.countryid.$model"
          placeholder="请选择">
          <el-option
            v-for="item in countryOptions"
            :key="item.countryid"
            :label="item.name+' +'+item.areacode"
            :value="item.countryid">
            <span style="float: left">{{item.name+' +'+item.areacode }}</span>
            <span style="float: right;">
              <img :src="item.flag" style="width:20px;height:auto;padding-top:11px">
            </span>
          </el-option>
        </el-select>
      </div>
      <div class="auth-content_group area auth-content_group_border"
           :class="{'auth-content_group--error':$v.signModel.phone.$error}">
        <span class="areaCode"
              :class="{'isTrue':state.country.areacode}">{{state.country.areacode?"+"+state.country.areacode:''}}</span>
        <input class="flex-auto"
               v-model.trim="$v.signModel.phone.$model"
               placeholder="输入手机号码"
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
           :class="{'auth-content_group--error':$v.signModel.password.$error,'auth-content_group_border':!$v.signModel.password.$error}">
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
               @keyup.enter="signUp"
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
  import {required, sameAs, minLength, maxLength} from 'vuelidate/lib/validators'
  import crypto from "@/store/crypto";

  export default {
    name: "phone",
    validations: {
      signModel: {
        phone: {
          required
        },
        verifycode: {
          required
        },
        password: {
          required,
          minLength: minLength(8),
          maxLength: maxLength(20)
        },
        countryid: {
          required
        },
        passwordagain: {
          sameAsPassword: sameAs('password')
        }
      }
    },
    data() {
      return {
        DagainState: false,
        phoneformat: true,//false 手机号有误
        phoneReg: '/^1[345789]\d{9}$/',
        isphone: true,
        state: {
          sendDelayState: false,
          send: false,
          check: true,
          signup: false,
          country: {},
          sendDelay: '获取验证码'
        },
        reg: {
          single: /^((?=.*[a-z])|(?=.*[A-Z])|(?=.*[0-9]))(?=.{8,})/g,
          middle: /^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[A-Z])))(?=.{8,})/g,
          strong: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*`~()_=/])(?=.{8,})/g
        },
        //注册model
        signModel: {
          signuptype: 'phone',
          phone: '',
          password: '',
          passwordagain: '',
          passwordstrength: '',
          source: '',
          referee: '',
          verifycode: '',
          countryid: '',
          countrycode: '',
          usertype: 0,
        },
        //验证model
        sendModel: {
          phone: '',
          areacode: '',
          template: 'Signup',
        },
        countryOptions: [],
      }
    },
    watch: {
      'signModel.countryid': function (val) {
        this.state.country = this.countryOptions.find((item) => {
          return item.countryid == val
        })
      },
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
      },
    },
    mounted() {
      this.$store.dispatch('country').then(({data}) => {
        this.countryOptions = data;
      })
    },
    methods: {
      closeloading() {
        this.state.send = false;
      },
      signUp() {
        console.log(this.sendModel.passwordagain, this.$v.signModel.passwordagain);
        if (!this.state.check) return;
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        const _signModel = _self.$v.signModel;
        _signModel.$touch();
        if (_signModel.$invalid) {
          this.$toast({
            message: '请将信息填写完整',
            position: 'middle',
            duration: 2000
          });
          return;
        };
        if (_self.state.signup) return;
        _self.state.signup = true;
        const {areacode} = _self.state.country;
        _sign.countrycode = areacode;
        _sign.password = crypto.md5String(_sign.password);
        delete _sign.passwordagain
        _self.$store.dispatch('user_user_signup', _sign)
          .then((res) => {
            if (res.data) {
              _self.$toast({
                message: res.msg,
                position: 'middle',
                duration: 5000
              });
              _self.$store.commit('set_user_info', res);
              _self.$router.push('/')
            }
          })
          .then((data) => {
            _self.state.signup = false
          })
      } ,
      getCode() {
        
        console.log(this.state)
        const _this = this;
        if (_this.state.send) return
        _this.sendModel.phone = this.signModel.phone;
        _this.sendModel.areacode = this.state.country.areacode;
        const phone = this.$v.signModel.phone;
        const countryid = this.$v.signModel.countryid;
        phone.$touch();
        countryid.$touch();
        if (countryid.$invalid) {
          this.$toast({
            message: '请选择国家',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if (phone.$invalid) {
          this.$toast({
            message: '手机号码不能为空',
            position: 'middle',
            duration: 2000
          });
          return;
        }

        _this.state.send = true
        if (_this.signModel.countryid == '243') {
          let patt1 = new RegExp(/^1[3,4,5,7,8,9][0-9]{9}$/);
          if (!patt1.test(_this.signModel.phone)) {
            _this.state.send = false
            _this.$toast({
              message: '手机号码有误',
              position: 'middle',
              duration: 5000
            });
          } else {
            _this.$store.dispatch("user_user_exist", {phone: _this.signModel.phone}).then(({data}) => {
              if (data) {
                
                _this.state.send = false
                _this.$toast({
                  message: '手机号码已存在',
                  position: 'middle',
                  duration: 5000
                });
              } else {
                

                _this.$emit('register:sendCode', _this)
              }
            })
          }
        } else {
          _this.$emit('register:sendCode', _this)
        }
      }
    }
  }
</script>
