<template>
  <div class="col-span-12 mt-2">
    <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Api</h2>
      <button
        @click="retrieve(1, 10)"
        class="ml-4 flex items-center text-blue-800 focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-rotate-cw mr-2"
        >
          <polyline points="23 4 23 10 17 10"></polyline>
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
        </svg>
        Reload Data
      </button>
      <Operation @modelOperate="modelOperate(true, null)" />
    </div>
    <div class="overflow-auto">
      <table class="mt-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <!-- <th class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th> -->
            <th class="px-4 py-2 md:px-5 md:py-3">交易所</th>
            <th class="px-4 py-2 md:px-5 md:py-3">账户备注</th>
            <th class="px-4 py-2 md:px-5 md:py-3">APPKEY</th>
            <th class="px-4 py-2 md:px-5 md:py-3">APPSECRET</th>
            <th class="px-4 py-2 md:px-5 md:py-3">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <!-- <td class="px-4 py-2 md:px-5 md:py-3 text-left">
              {{ index + 1 }}
            </td> -->
            <td class="px-4 py-2 md:px-5 md:py-3">
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.exchange"
              ></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.desc"></td>
            <!-- <td class="px-4 py-2 md:px-5 md:py-3">
              <svg
                v-if="data.type == 'jpg'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#3B82F6"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-image mx-auto"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              <svg
                v-if="data.type == 'mp4'"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#10B981"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-video mx-auto"
              >
                <polygon points="23 7 16 12 23 17 23 7"></polygon>
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
              </svg>
            </td> -->
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.key"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.secret"></td>
            <!-- <td
              class="px-4 py-2 md:px-5 md:py-3"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td> -->
            <td class="px-4 py-2 md:px-5 md:py-3">
              <Action
                :obj="data"
                @delAction="confirmOperate"
                @editAction="modelOperate(false, data)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="delOperate" />
    <Model
      :code="formData"
      :isEdit="isDialog"
      @editAction="closeOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>交易所</label>
            <select
              v-model="formData.exchange"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
            <option
                v-for="exchange in exchanges"
                :key="exchange"
                :value="exchange"
                v-text="exchange"
              ></option>
            </select>
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>账户备注</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="账户备注"
              v-model="formData.desc"
            />
          </div>
        </div>
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>APP KEY</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder=""
              v-model="formData.key"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>App SECRET</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder=""
              v-model="formData.secret"
            />
          </div>
        </div>
      </form>
    </Model>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

import Operation from "/@/components/global/Operation.vue";
import Action from "/@/components/global/Action.vue";
import Pagation from "/@/components/global/Pagation.vue";
import Confirm from "/@/components/global/Confirm.vue";
import Model from "/@/components/global/Model.vue";

import instance from "../../api";
import SERVER_URL from "../../api/request";

export default defineComponent({
  name: "Api",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isDialog: false,
      isAdd: true,
      isDel: false,
      portfolioData: {},
      exchanges: [
        'OKEX交易',
        'Binance币安',
        'Huobi火币',
        'Bybit',
        'Ftx'
      ],
      formData: {
        '_id': '',
        'exchange': '',
        'desc': '',
        'key': '',
        'secret': ''
      },
      id: '',
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean, data: Object) {
      this.isDel = isDel;
      this.formData = data;
      this.id = this.formData['_id'];
      // console.log(data);
    },
    delOperate(isDel: boolean) {
      // console.log(isDel);
      // console.log(this.id);
      if(isDel){
        const param = {
          data: {
            '_id': this.id
          }
        }
        instance.delete(SERVER_URL.api, param).then((res) => {
          // this.datas.push(res.data);
          this.isDel = false;
          this.retrieve(1, 10);
        });
      }else{
         this.isDel = false;
      }
    },
    // 新增/编辑：打开
    modelOperate(isAdd: boolean, obj: Object) {
      if(obj != null && obj != undefined){
          this.formData = obj;
      }else{
          this.formData = {
            '_id': '',
            'exchange': '',
            'desc': '',
            'key': '',
            'secret': ''
          }
      }
      // Promise.all([
      //   this.retrieveCategories(),
      //   this.fetch(isEdit, code),
      // ]);
      this.isAdd = isAdd;
      console.log(this.isAdd);
      this.isDialog = true;
      // console.log(this.isEdit);
    },
    // 新增/编辑：打开
    closeOperate() {
      this.formData = {};
      // Promise.all([
      //   this.retrieveCategories(),
      //   this.fetch(isEdit, code),
      // ]);
      this.isAdd = true;
      this.isDialog = false;
      // console.log(this.isEdit);
    },
    // 获取所有分类
    retrieveCategories() {
      // instance.get(SERVER_URL.category).then(
      //   (res) => {
      //     this.categories = res.data;
      //   },
      //   (error) => {
      //     alert(error.statusText);
      //   }
      // );
    },
    // 根据code查portfolio
    fetch(isEdit: boolean, code: string) {
      if (isEdit && code) {
        instance.get(SERVER_URL.api.concat("/", code)).then((res) => {
          this.portfolioData = res.data;
        });
      }
    },
    // 新增/编辑：提交
    commitOperate(code: Object) {
      let data = this.formData;
      if (!this.isAdd) {
        instance.put(SERVER_URL.api, data).then(() => {
          this.retrieve(1, 10);
        });
      } else {
        let userCache = sessionStorage.getItem("user");
        if (userCache) {
          let user = JSON.parse(userCache);
          data['userId'] = user['_id']
        }
        instance.post(SERVER_URL.api, data).then((res) => {
          // this.datas.push(res.data);
          this.retrieve(1, 10);
        });
      }
      this.isDialog = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([retrieve(page, size)]);
    }
    // 统计数据
    async function count() {
      await instance.get(SERVER_URL.portfolio.concat("/count")).then((res) => {
        total.value = res.data;
      });
    }
    // 查询列表
    async function retrieve(page: number, size: number) {
      await instance
        .get(SERVER_URL.api.concat("?pageNum=" + page, "&pageSize=" + size))
        .then(
          (response) => {
            let result = response.data.data;
            datas.value = result.data;
            total.value = result.total;
            // console.log(response);
          },
          (error) => {
            // alert(error.statusText);
          }
        );
    }

    onMounted(() => {
      initDatas(1, 10);
    });

    return {
      datas,
      total,
      retrieve,
    };
  },
});
</script>