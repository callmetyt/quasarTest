<template>
  <div id="Login">
    <!-- 直接从codepen复制的登录页面 https://codepen.io/marcobiedermann/details/dsbFy -->
    <div class="align">
      <div class="grid">
        <form action="/" method="post" class="form login">
          <header class="login__header">
            <h3 class="login__title">Welcome</h3>
          </header>

          <div class="login__body">
            <div class="form__field">
              <q-input outlined v-model="userName" label="用户名"></q-input>
            </div>

            <div class="form__field">
              <q-input
                outlined
                v-model="password"
                :type="isShowPwd ? 'text' : 'password'"
                label="密码"
              >
                <template #append>
                  <q-icon
                    :name="isShowPwd ? 'far fa-eye' : 'far fa-eye-slash'"
                    @click="isShowPwd = !isShowPwd"
                  ></q-icon>
                </template>
              </q-input>
            </div>
          </div>

          <footer class="login__footer">
            <input type="submit" @click.prevent="login" value="登录" />
          </footer>
        </form>
      </div>
    </div>

    <!-- 初始化对话框 -->
    <q-dialog v-model="isShowConfirm" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">初始化</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <div class="form__field">
            <q-input
              outlined
              v-model="websocketAddress"
              label="树莓派地址"
            ></q-input>
          </div>
          <div class="form__field">
            <q-input
              outlined
              v-model="systemAddress"
              label="被检测系统地址"
            ></q-input>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="确认"
            color="positive"
            v-close-popup
            @click="init"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component({
  name: "login",
})
export default class Login extends Vue {
  //data
  private userName: string = "";
  private password: string = "";
  private isShowPwd: boolean = false;
  public websocketAddress: string = "";
  private isShowConfirm: boolean = true;
  private systemAddress: string = "192.168.0.1";

  //methods
  //没用到的登录接口
  async login() {
    // await this.$api.login({ username: this.userName, password: this.password });
    this.$router.push({ name: "home" });
  }

  init() {
    //初始化websocket地址、systemAddress被检测设备地址
    this.$store.commit("setWebsocketAddress", this.websocketAddress);
    this.$store.commit("setSystemAddress", this.systemAddress);
  }

  //lifeCycle
  mounted() {}
}
</script>

<style scoped lang="scss">
#Login {
  height: 100%;
  // .inputWarp {
  //   width: 80vw;
  //   margin: 17.5vh auto 40px auto;
  //   > :first-child {
  //     margin-bottom: 20px;
  //   }
  // }
  // .btnWarp {
  //   width: max-content;
  //   margin: 0 auto;
  // }

  //codepen https://codepen.io/marcobiedermann/details/dsbFy

  --gridMaxWidth: 24em;
  --gridWidth: 90%;
  --bodyBackgroundColor: #eaeaea;
  --bodyColor: #999;
  --bodyFontFamily: "Helvetica", "Arial";
  --bodyFontFamilyFallback: sans-serif;
  --bodyFontSize: 0.875rem;
  --bodyFontWeight: 400;
  --bodyLineHeight: 1.5;
  --anchorColor: inherit;
  --anchorHoverColor: #1dabb8;
  --loginBorderRadius: 0.25em;
  --loginHeaderBackgroundColor: #282830;
  --loginInputBorderRadius: 0.25em;

  .align {
    display: grid;
    place-items: center;
    background-color: var(--bodyBackgroundColor);
    font-family: var(--bodyFontFamily), var(--bodyFontFamilyFallback);
    font-size: var(--bodyFontSize);
    font-weight: var(--bodyFontWeight);
    line-height: var(--bodyLineHeight);
    margin: 0;
    min-block-size: 100vh;
  }

  /* helpers/grid.css */

  .grid {
    inline-size: var(--gridWidth);
    margin-inline: auto;
    max-inline-size: var(--gridMaxWidth);
  }

  /* modules/anchor.css */

  a {
    color: var(--anchorColor);
    text-decoration: none;
    transition: color 0.3s;
  }

  a:hover {
    color: var(--anchorHoverColor);
  }

  /* modules/form.css */

  input {
    appearance: none;
    border: none;
    font: inherit;
    margin: 0;
    outline: none;
    padding: 0;
  }

  input[type="submit"] {
    cursor: pointer;
  }

  /* modules/login.css */

  .login__header {
    background-color: var(--loginHeaderBackgroundColor);
    border-top-left-radius: var(--loginBorderRadius);
    border-top-right-radius: var(--loginBorderRadius);
    color: #fff;
    padding: 1.5em;
    text-align: center;
    text-transform: uppercase;
  }

  .login__title {
    font-size: 1rem;
    margin: 0;
  }

  .login__body {
    background-color: #fff;
    padding: 1.5em;
    position: relative;
  }

  .login__body::before {
    background-color: #fff;
    content: "";
    height: 0.5em;
    left: 50%;
    margin-left: -0.25em;
    margin-top: -0.25em;
    position: absolute;
    top: 0;
    transform: rotate(45deg);
    width: 0.5em;
  }

  .login input[type="submit"] {
    background-color: #3f51b5;
    border-radius: var(--loginInputBorderRadius);
    color: #fff;
    font-weight: 700;
    order: 1;
    padding: 0.75em 1.25em;
    transition: background-color 0.3s;
  }

  .login input[type="submit"]:focus,
  .login input[type="submit"]:hover {
    background-color: #198d98;
  }

  .login__footer {
    align-items: center;
    background-color: #fff;
    border-bottom-left-radius: var(--loginBorderRadius);
    border-bottom-right-radius: var(--loginBorderRadius);
    display: flex;
    justify-content: center;
    padding-bottom: 1.5em;
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
</style>
