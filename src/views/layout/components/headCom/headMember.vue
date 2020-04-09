<template>
  <div class="headMember">
    <!-- <div class="headMember-normal" v-loading="onlineLoading">
      <span>在线人数({{ amount }})</span>
    </div>-->
    <el-dropdown size="medium" v-if="status">
      <span class="el-dropdown-link">
        切换岗位
        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          @click.native="checkoutJobs(item)"
          :disabled="departmentDutyId === item.departmentDutyId"
          v-for="(item, key) in jobsList.departmentDutyList"
          :key="key"
          >{{ item.companyName + "-" + item.departmentName }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown size="medium" v-if="systemCheckout" v-loading="loading">
      <div class="el-dropdown-link">
        {{ systemName }}
        <!--帮助-->
        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu
        class="el-dropdown-menu&#45;&#45;medium"
        slot="dropdown"
      >
        <el-dropdown-item
          @click.native="switchBtn(item)"
          :disabled="item.disabled"
          v-for="(item, key) in sysOptions"
          :key="key"
          >{{ item.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </el-dropdown>
    <div class="headMember-normal">
      <i class="el-icon-message"></i>
      <router-link to>
        <span>消息({{ $store.state.app.totalUnread }})</span>
      </router-link>
      <!--&gt;-->
    </div>
    <el-dropdown class="el-dropdown" size="medium" @command="handleCommand">
      <div class="el-dropdown-link">
        <!-- <svg-icon icon-class="people" /> -->
        {{ userName }}
        <i class="el-icon-arrow-down el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu class="el-dropdown-menu--medium" slot="dropdown">
        <router-link :to="{ path: '/dashboard/mine', query: { id: id } }">
          <el-dropdown-item command="a">我的资料</el-dropdown-item>
        </router-link>
        <router-link to="/ms/my/message">
          <el-dropdown-item>我的消息</el-dropdown-item>
        </router-link>
        <!--<router-link to="/my/changeMyPassword">-->
        <!--<el-dropdown-item command="c">修改密码</el-dropdown-item></router-link-->
        <!--&gt;-->
        <el-dropdown-item command="logOut">退出系统</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown size="medium">
      <div class="el-dropdown-link">
        <i class="el-icon-info"></i>
        <!--帮助-->
        <i
          class="el-icon-arrow-down el-icon&#45;&#45;right el-icon-caret-bottom"
        ></i>
      </div>
      <el-dropdown-menu
        class="el-dropdown-menu&#45;&#45;medium"
        slot="dropdown"
      >
        <el-dropdown-item>使用文档</el-dropdown-item>
        <el-dropdown-item>APP下载</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { getUserInfo, removeUserInfo } from "../../../../utils/auth";
import * as api from "cyberway-msf-frontend-web-auth/src/api/login";
import {
  getSystem,
  switchSystem,
  switchJobs,
  getOnlineAmount
} from "@/api/switchSystem";
import pub from "pubsub-js";
// import { initRouters } from "@/router";
export default {
  name: "headMember",
  data() {
    return {
      totalUnRead: localStorage.getItem("totalUnRead")
        ? localStorage.getItem("totalUnRead")
        : "0",
      userName: "",
      id: "",
      systemName: "切换系统",
      systemCheckout: !!JSON.parse(window.sessionStorage.getItem("msfInfo"))
        .json,
      options: [],
      sysOptions: [],
      loading: false,
      disabled: false,
      onlineLoading: false,
      amount: 0,
      jobsList: [],
      status: false
    };
  },
  created() {
    this.userName = getUserInfo().fullName;
    this.id = getUserInfo().id;
    this.totalUnRead = localStorage.getItem("totalUnRead");
    if (JSON.parse(window.sessionStorage.getItem("msfInfo")).json) {
      this.getSystemList();
    }
    this.jobsList = JSON.parse(
      window.localStorage.getItem("userInfo")
    ).userTypeVo;
    if (this.jobsList) {
      if (
        this.jobsList.departmentDutyList.length === 0 ||
        this.jobsList.departmentDutyList.length === 1
      ) {
        this.status = false;
      } else {
        this.status = true;
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler(val) {
        if (val.length !== 0) {
          this.getName();
        }
      }
    }
  },
  computed: {
    departmentDutyId() {
      return JSON.parse(window.localStorage.getItem("userInfo")).userTypeVo
        .departmentDutyId;
    }
  },
  methods: {
    // 获取在线人数
    // getOnlineAmountInfo() {
    //   this.onlineLoading = true;
    //   getOnlineAmount().then(res => {
    //     this.onlineLoading = false;
    //     this.amount = res.data;
    //   });
    // },
    // 切换岗位
    checkoutJobs(item) {
      let params = {
        departmentDutyId: item.departmentDutyId,
        isSwitch: true
      };
      switchJobs(params).then(res => {
        const data = res.data;
        localStorage.removeItem("menu");
        pub.publish("AUTH_LOGIN_SUCCESS", data);
        this.$router.push({ path: "/dashboard/index" });
        window.location.reload();
      });
    },
    getName() {
      this.sysOptions = this.options.map(item => {
        // console.log(item.value, )
        if (
          item.value ===
          JSON.parse(window.sessionStorage.getItem("msfInfo")).orgId
        ) {
          item.disabled = true;
          this.systemName = item.label;
        } else {
          item.disabled = false;
        }
        return item;
      });
    },
    getSystemList() {
      this.loading = true;
      getSystem(JSON.parse(window.sessionStorage.getItem("msfInfo")).json)
        .then(res => {
          const data = res.data;
          this.options = data;
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    switchBtn(item) {
      switchSystem({ orgId: item.value }).then(res => {
        sessionStorage.setItem("msfInfo", JSON.stringify(res.data));
        api
          .getInfo({ Authorization: res.data.token })
          .then(userInfoRes => {
            userInfoRes.data.token = res.data.token;
            localStorage.removeItem("menu");
            pub.publish("AUTH_LOGIN_SUCCESS", userInfoRes.data);
            this.$router.push({ path: "/dashboard/index" });
            window.location.reload();
          })
          .catch(() => {
            this.loading = false;
          });
      });
    },
    handleCommand(command) {
      if (command == "logOut") {
        removeUserInfo();
        window.location.href = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headMember {
  height: 30px;
  font-size: 14px;
  text-align: right;
  padding-right: 37px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  .headMember-normal {
    display: inline-block;
    color: white;
    font-size: 14px;
    margin-right: 10px;
    cursor: pointer;
    span {
      cursor: pointer;
    }
  }
  .el-dropdown {
    margin-right: 10px;
    .el-dropdown-link {
      color: white;
      line-height: 30px;
      font-size: 14px;
      cursor: pointer;
    }
  }
}
</style>
