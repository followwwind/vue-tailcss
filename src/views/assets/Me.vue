<template>
  <div class="col-span-12 mt-2">
    <!-- <div class="flex justify-between items-center h-10">
      <h2 class="text-lg font-medium">Portfolio</h2>
      <button
        @click="retrieve(0, 10)"
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
      <Operation @modelOperate="modelOperate" />
    </div>
    <div class="overflow-auto">
      <table class="mt-2 w-full truncate">
        <thead>
          <tr class="uppercase text-center text-xs sm:text-sm h-12">
            <th class="px-4 py-2 md:px-5 md:py-3 text-left">No.</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Title</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Code</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Type</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Viewed</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Likes</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Modify Time</th>
            <th class="px-4 py-2 md:px-5 md:py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="text-center bg-white border-8 border-gray-100"
            v-for="(data, index) in datas"
            :key="index"
          >
            <td class="px-4 py-2 md:px-5 md:py-3 text-left">
              {{ index + 1 }}
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <a
                href=""
                class="font-medium whitespace-no-wrap"
                v-text="data.title"
              ></a>
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.code"></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
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
            </td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.viewed"></td>
            <td class="px-4 py-2 md:px-5 md:py-3" v-text="data.likes"></td>
            <td
              class="px-4 py-2 md:px-5 md:py-3"
              v-text="new Date(data.modifyTime).toLocaleDateString()"
            ></td>
            <td class="px-4 py-2 md:px-5 md:py-3">
              <Action
                :code="data.code"
                @delAction="confirmOperate"
                @editAction="modelOperate"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagation @retrieve="retrieve" :total="total" />
    <Confirm :isDel="isDel" @delAction="confirmOperate" />
    <Model
      :code="portfolioData.code"
      :isEdit="isEdit"
      @editAction="modelOperate"
      @commitAction="commitOperate"
    >
      <form class="w-full">
        <div class="grid grid-cols-12 gap-4 row-gap-3">
          <div class="col-span-12 sm:col-span-6">
            <label>Title</label>
            <input
              type="text"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
              placeholder="Title"
              v-model="portfolioData.title"
            />
          </div>
          <div class="col-span-12 sm:col-span-6">
            <label>Category</label>
            <select
              v-model="portfolioData.category"
              class="py-2 px-3 rounded-md w-full border mt-2 flex-1 focus:outline-none focus:ring-1"
            >
              <option
                v-for="category in categories"
                :key="category.code"
                :value="category.code"
                v-text="category.alias"
              ></option>
            </select>
          </div>
        </div>
      </form>
    </Model> -->
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
  name: "Me",

  components: {
    Operation,
    Action,
    Pagation,
    Confirm,
    Model,
  },

  data() {
    return {
      isEdit: false,
      isDel: false,
      portfolioData: {},
      categories: [],
    };
  },

  methods: {
    // 删除确认
    confirmOperate(isDel: boolean) {
      this.isDel = isDel;
    },
    // 新增/编辑：打开
    modelOperate(isEdit: boolean, code: string) {
      this.portfolioData = {};
      Promise.all([
        this.retrieveCategories(),
        this.fetch(isEdit, code),
      ]);
      this.isEdit = isEdit;
    },
    // 获取所有分类
    retrieveCategories() {
      instance.get(SERVER_URL.category).then(
        (res) => {
          this.categories = res.data;
        },
        (error) => {
          alert(error.statusText);
        }
      );
    },
    // 根据code查portfolio
    fetch(isEdit: boolean, code: string) {
      if (isEdit && code) {
        instance.get(SERVER_URL.portfolio.concat("/", code)).then((res) => {
          this.portfolioData = res.data;
        });
      }
    },
    // 新增/编辑：提交
    commitOperate(code: string) {
      let data = this.portfolioData;
      if (code && code.length > 0) {
        instance.put(SERVER_URL.portfolio.concat("/", code), data).then(() => {
          this.retrieve(0, 10);
        });
      } else {
        instance.post(SERVER_URL.portfolio, data).then((res) => {
          this.datas.push(res.data);
        });
      }
      this.isEdit = false;
    },
  },

  setup() {
    const datas = ref<any>([]);
    const total = ref(0);

    // 初始化数据
    async function initDatas(page: number, size: number) {
      await Promise.all([count(), retrieve(page, size)]);
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
        .get(SERVER_URL.portfolio.concat("?page=" + page, "&size=" + size))
        .then(
          (response) => {
            datas.value = response.data;
          },
          (error) => {
            alert(error.statusText);
          }
        );
    }

    onMounted(() => {
      // initDatas(0, 10);
    });

    return {
      datas,
      total,
      retrieve,
    };
  },
});
</script>