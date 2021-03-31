<template>
  <transition name="slide-fade">
    <div class="my-notify"
         v-if="notifyFlag">
      <div class="notify success"
           v-if="type=='success'">
        <i class="el-icon-success"></i>
        <span class="content"> {{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div>
      <div class="notify message"
           v-else-if="type=='message'">
        <i class="el-icon-info"></i>
        <span class="content">{{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div>
      <div class="notify error"
           v-else-if="type=='error'">
        <i class="el-icon-error"></i>
        <span class="content">{{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div>
      <div class="notify warning"
           v-else-if="type=='warning'">
        <i class="el-icon-warning"></i>
        <span class="content">{{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div>
      <!-- 可以简写如下 -->
      <!-- <div class="notify"
           :class="[type === 'success' ? 'success' : (type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'message')), noNotifyBtn ? 'notifyPadding' : '']">
        <i :class="[type === 'success' ? 'el-icon-success' : (type === 'error' ? 'el-icon-error' : (type === 'warning' ? 'el-icon-warning' : 'el-icon-info'))]"></i>
        <span class="content"> {{content}}</span>
        <div v-if="noNotifyBtn"
             class="noNotifyAgain">
          <span @click="noAgainFun">{{noRemind}}</span>
        </div>
      </div> -->
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "Message",
  data () {
    return {
      noRemind: 'Dont remind again'
    }
  },
  methods: {
    noAgainFun () {
      sessionStorage.setItem('dontRemindAgain', '1')
    },
    setup() {
      onMounted(() => {
        
      });
      return {
        
      };
    },
  }
});
</script>