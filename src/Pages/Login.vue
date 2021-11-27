<template>
  <div class="login">
    <div class="left">
      <div class="left-section">
        <div class="spaces"></div>
        <div class="spaces">
          <div class="contain-form">
            <form @submit.prevent="login" >
              <h1>Log in</h1>
                  <b-alert show variant="danger" v-if="errorMsg">{{errorMsg}}</b-alert>
              <div height="16px"></div>
              <div class="contain-input">
                <label for="email">Email Address</label>
                    <span class="error-text" v-if="!$v.email.required || !$v.email.email">
                                                    *
                                                 </span>
                <div>
                  <input type="email" v-model="email" id="email" name="email"  />
                     <span class="error-text" v-if="!$v.email.required || !$v.email.email">
                                <strong class="error-invalid" v-if="email">
                                  please enter a valid email address 
                                </strong>
                            </span>
                </div>
              </div>
              <div>
                <label for="password">Password</label>
                       <span class="error-text" v-if="!$v.password.required || !$v.password.minLen || !$v.password.valid">
                                                    *
                                                 </span>
                <div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    v-model="password"
                  />
                   <span class="error-text" v-if="!$v.password.minLen || !$v.password.valid">
                                <strong class="error-invalid" v-if="password">
                                   min char is  {{$v.password.$params.minLen.min}} and it should  atleast contain 1 letter uppercase and number
                                </strong>
                            </span>
                </div>
              </div>

              <button  type="submit"   :disabled="$v.$invalid">
                Log In
              </button>
              <div class="forget">
                <router-link :to="{ path: '/signup' }" class="link"
                  >Create an account</router-link
                ><router-link :to="{ path: '/forget-password' }" class="link"
                  >Forgot your password?</router-link
                >
              </div>
              <input type="hidden" value="" />
              <div class="note"></div>
            </form>

            <div></div>
          </div>
        </div>
        <div class="spaces">
          <div class="terms"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <div height="100%" class="right-section">
        <div class="right-info">
          <h2></h2>
          <p></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import {required, email, minLength, sameAs, maxLength} from 'vuelidate/lib/validators'
import router from '@/router'

export default {
  data() {
    return {
      email: null,
      password: null,
      errorMsg:null
    };
  },
       validations: {
            email: {
                required,
                email
            },
            password: {
                required,
                minLen: minLength(8),
               valid: function(value) {
                const containsUppercase = /[A-Z]/.test(value)
                const containsNumber = /[0-9]/.test(value)
                  return containsUppercase && containsNumber
               }

            }
        },
  methods: {
    login() {
  
       this.$v.$touch();
      let vm = this
       if(!this.$v.$invalid){
      const formData = {
        email: vm.email,
        password: vm.password,
      };
      vm.$store.dispatch("login", formData).then(
        (response) => {
             router.push({
              name: "dashboard",
            });
        },
        (error) => {
          vm.errorMsg = error.errors
        }
      );
       }
    },
  },
};
</script>
<style scoped>
.error-invalid{
  font-size: 12px;
}
.error-text{
    color: #ce4854;
}
input:invalid {
    border: 1px solid #ce4854;
    box-shadow: none;
}
.right {
  width: 66.66666666666666%;
  height: 100%;
  min-height: auto;
  right: 0;
  background: gray;
}
.bg {
  background: gray;
}
.logo {
  margin-top: 24px;
}
.left {
  width: 33.33333333333333%;
  background-color: none;
  height: 100%;
  min-height: auto;
}
.left-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0px auto;
  overflow-y: auto;
  max-width: 100%;
  background-color: #ffffff;
}
.contain-logo {
  text-align: left;
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.login {
  text-align: left;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  width: 100%;
  -webkit-align-items: left;
  -webkit-box-align: left;
  -ms-flex-align: left;
  align-items: left;
  -webkit-box-pack: start;
  -webkit-justify-content: flex-start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  background-color: #ffffff;
  background-image: none;
}
h1 {
  font-style: normal;
  font-weight: bold;
  line-height: 44px;
  font-size: 32px;
  margin-bottom: 8px;
  color: #3d3d3d;
}
.contain-form {
  max-width: 400px;
  width: 100%;
  margin: auto;
}
.contain-input {
  margin-bottom: 8px;
}
.form {
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.spaces {
  width: 100%;
  padding: 0px 56px;
  margin: 16px 0px;
  background-color: #ffffff;
}
.terms {
  width: 100%;
  font-size: normal;
  font-weight: 500;
  font-size: 14px;
  margin: 16px 0px;
  color: #636363;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.link {
  color: #3d3d3d;
  -webkit-text-decoration: none;
  text-decoration: none;
}
label {
  font-weight: 500;
  font-size: 14px;
  color: #3d3d3d;
  text-align: left;
  margin-bottom: 8px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
input {
  width: 100%;
  background-color: #ffffff;
  height: 48px;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  margin: 8px 0px;
  border: 1px solid #b8b8b8;
  font-weight: 400;
  font-size: 14px;
  text-align: left;
  box-sizing: border-box;
  -webkit-transition-property: border-width, border-color, box-shadow;
  transition-property: border-width, border-color, box-shadow;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  box-shadow: 2px 2px 0 2px transparent;
  text-overflow: ellipsis;
  overflow: hidden;
}
button {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0;
  -webkit-appearance: none;
  position: relative;
  -webkit-transition-property: background-color, border-color, color;
  transition-property: background-color, border-color, color;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  min-width: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  color: #ffffff;
  background-color: #2c4bff;
  padding-right: 16px;
  padding-left: 16px;
  margin: 8px 0px;
  height: 48px;
}
.forget {
  width: 100%;
  font-size: normal;
  font-weight: 500;
  font-size: 14px;
  margin: 16px 0px;
  color: #636363;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.note {
  padding: 2rem 0;
  text-align: center;
}
.note p {
  font-weight: initial;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 14px;
  color: #636363;
}
a span {
  margin: 0 10px;
}
.right-section {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin: 0px auto;
  overflow-y: auto;
  max-width: 100%;
  background-color: #f5f5f5;
}
.right-info {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  width: 100%;
}
.right-info img {
  max-width: 435px;
  height: auto;
  margin: 0 auto 20px;
}
.right-info h2 {
  font-weight: 700;
  max-width: 500px;
  line-height: 35px;
  margin-bottom: 16px;
  text-align: center;
}
.right-info p {
  font-size: 14px;
  max-width: 400px;
  line-height: 20px;
  margin-bottom: 24px;
  text-align: center;
  color: #221f20;
}
.more {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1.5;
  font-weight: 500;
  border-radius: 4px;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  border: 0;
  -webkit-appearance: none;
  position: relative;
  -webkit-transition-property: background-color, border-color, color;
  transition-property: background-color, border-color, color;
  -webkit-transition-duration: 0.1s;
  transition-duration: 0.1s;
  -webkit-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  min-width: 0;
  -webkit-flex: 0 0 auto;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  color: #ffffff;
  background-color: #2c4bff;
  padding-right: 16px;
  padding-left: 16px;
  margin: 8px 0px;
  height: 48px;
  background-color: transparent;
  width: auto;
  width: initial;
  color: #2c4bff;
  -webkit-text-decoration: none;
  text-decoration: none;
  border: 1px solid #2c4bff;
}
@media (max-width: 1250px) {
  .right {
    display: none;
  }
  .left {
    width: 100%;
  }
}
@media only screen and (max-width: 420px) {
  .spaces {
    padding: 0px 24px;
  }
  .spaces:first-child {
    margin-top: 0px;
  }
  h1 {
    font-size: 24px;
  }
  .terms .link {
    font-size: 10px;
  }
}
</style>