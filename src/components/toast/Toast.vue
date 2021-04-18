<template>
  <transition appear @after-leave="handleAfterLeave">
    <div
      :class="['toast', { mask: !mask }]"
      v-if="showToastRef"
      @click="handleMaskClick"
    >
      <!-- type === info -->
      <template v-if="type === 'info'">
        <div
          :class="[{ [type]: true }, { [position]: true && type === 'info' }]"
        >
          {{ content }}
        </div>
      </template>
      <template
        v-if="type === 'success' || type === 'fail' || type === 'custom'"
      >
        <div :class="[{ [type]: true }]">
          <!-- 成功、失败 -->
          <template v-if="type === 'success' || type === 'fail'">
            <div class="icon">
              <svg
                v-if="type === 'success'"
                viewBox="0 0 1024 1024"
                width="36"
                height="36"
              >
                <path
                  d="M464.247573 677.487844C474.214622 686.649009 489.665824 686.201589 499.086059 676.479029L798.905035 367.037897C808.503379 357.131511 808.253662 341.319802 798.347275 331.721455 788.44089 322.12311 772.62918 322.372828 763.030833 332.279215L463.211857 641.720346 498.050342 640.711531 316.608838 473.940461C306.453342 464.606084 290.653675 465.271735 281.319298 475.427234 271.984922 485.582733 272.650573 501.382398 282.806071 510.716774L464.247573 677.487844Z"
                  fill="#ffffff"
                />
                <path
                  d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 629.410831 1024 740.826187 984.331046 830.768465 912.686662 841.557579 904.092491 843.33693 888.379234 834.742758 877.590121 826.148587 866.801009 810.43533 865.021658 799.646219 873.615827 718.470035 938.277495 618.001779 974.048781 512 974.048781 256.817504 974.048781 49.951219 767.182496 49.951219 512 49.951219 256.817504 256.817504 49.951219 512 49.951219 767.182496 49.951219 974.048781 256.817504 974.048781 512 974.048781 599.492834 949.714859 683.336764 904.470807 755.960693 897.177109 767.668243 900.755245 783.071797 912.462793 790.365493 924.170342 797.659191 939.573897 794.081058 946.867595 782.373508 997.013826 701.880796 1024 608.898379 1024 512Z"
                  fill="#ffffff"
                />
              </svg>
              <svg v-else viewBox="0 0 1024 1024" width="36" height="36">
                <path
                  d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 629.410831 1024 740.826187 984.331046 830.768465 912.686662 841.557579 904.092491 843.33693 888.379234 834.742758 877.590121 826.148587 866.801009 810.43533 865.021658 799.646219 873.615827 718.470035 938.277495 618.001779 974.048781 512 974.048781 256.817504 974.048781 49.951219 767.182496 49.951219 512 49.951219 256.817504 256.817504 49.951219 512 49.951219 767.182496 49.951219 974.048781 256.817504 974.048781 512 974.048781 599.492834 949.714859 683.336764 904.470807 755.960693 897.177109 767.668243 900.755245 783.071797 912.462793 790.365493 924.170342 797.659191 939.573897 794.081058 946.867595 782.373508 997.013826 701.880796 1024 608.898379 1024 512Z"
                  fill="#ffffff"
                />
                <path
                  d="M331.838918 663.575492C322.174057 673.416994 322.317252 689.230029 332.158756 698.894891 342.000258 708.559753 357.813293 708.416557 367.478155 698.575053L717.473766 342.182707C727.138628 332.341205 726.995433 316.528171 717.153931 306.863309 707.312427 297.198447 691.499394 297.341643 681.834532 307.183147L331.838918 663.575492Z"
                  p-id="2888"
                  fill="#ffffff"
                />
                <path
                  d="M681.834532 698.575053C691.499394 708.416557 707.312427 708.559753 717.153931 698.894891 726.995433 689.230029 727.138628 673.416994 717.473766 663.575492L367.478155 307.183147C357.813293 297.341643 342.000258 297.198447 332.158756 306.863309 322.317252 316.528171 322.174057 332.341205 331.838918 342.182707L681.834532 698.575053Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          </template>
          <!-- 自定义图标 -->
          <template v-else>
            <div class="icon" v-html="custom"></div>
          </template>
          <div class="text">{{ content }}</div>
        </div>
      </template>
      <!-- 加载中动画 -->
      <template v-if="type === 'loading'">
        <div class="loading">
          <div class="icon"></div>
          <div class="text">{{ content }}</div>
        </div>
      </template>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue';
import { Position, ToastType } from './index';
export interface Toast {
  type: string;
  mask: boolean;
  show: boolean;
  duration: number;
  content: string;
  custom: string;
  destroy: () => void;
  setTimer: (timer: number) => void;
}
let timer: number;
export default defineComponent({
  name: 'Toast',
  props: {
    type: {
      type: String as PropType<ToastType>,
      default: 'info',
    },
    mask: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    duration: {
      type: Number as PropType<number>,
      default: 3000,
    },
    content: {
      type: String as PropType<string>,
      default: '',
    },
    custom: {
      type: String as PropType<ToastType>,
      default: '',
    },
    destroy: {
      type: Function as PropType<() => void>,
      default() {
        return () => {};
      },
    },
    setTimer: {
      type: Function as PropType<(timer: number) => void>,
      default() {
        return () => {};
      },
    },
    position: {
      type: String as PropType<Position>,
      default: 'bottom',
    },
  },
  setup(props: Readonly<Toast>) {
    // 处理点击穿透问题
    const handleMaskClick = (e: MouseEvent) => {
      if (props.mask) {
        e.stopPropagation();
      }
    };
    const showToastRef = ref<boolean>(false);
    // 添加属性变化
    watch(
      () => props.show,
      (show: boolean) => {
        showToastRef.value = show;
        if (!show) {
          clearTimeout(timer);
        }
      },
      { immediate: true }
    );
    onMounted(() => {
      // 不是加载中，才自动移除
      if (props.type !== 'loading') {
        timer = setTimeout(() => {
          showToastRef.value = false;
        }, props.duration);
        props.setTimer(timer);
      }
    });

    const handleAfterLeave = () => {
      props.destroy();
    };
    return {
      showToastRef,
      handleMaskClick,
      handleAfterLeave,
    };
  },
});
</script>
<style lang="less" scoped>
.v-enter-from {
  opacity: 0;
}
.v-leave-active,
.v-enter-active {
  transition: opacity 0.4s ease-in;
}
.v-leave-from,
.v-enter-to {
  opacity: 1;
}
.v-leave-to {
  opacity: 0;
}
.toast {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: #fff;
  font-size: 14px;
  z-index: 10000;
  &.mask {
    pointer-events: none;
  }
  & > div {
    position: relative;
    left: 50%;
    display: inline-block;
    text-align: center;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 5px;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
  }
  .info {
    padding: 10px 15px;
    max-width: 80%;
    min-width: 100px;
    &.top {
      top: 7%;
    }
    &.middle {
      top: 50%;
    }
    &.bottom {
      top: calc(100% - 7%);
    }
  }
  .success,
  .fail,
  .custom {
    top: 50%;
    padding: 15px;
    max-width: 50%;
    min-width: 120px;
    min-height: 96px;
    .icon {
      margin-bottom: 10px;
    }
  }
  .loading {
    top: 50%;
    padding: 15px;
    width: 90px;
    height: 96px;
    .icon {
      display: inline-block;
      margin: 0 auto;
      width: 36px;
      height: 36px;
      background: url('data:image/gif;base64,R0lGODlhZABkAKIEAN7e3rq6uv///5mZmQAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBRjA4RUZDMDI3MjA2ODExODA4M0Y1OTQyMzVDRDM3MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCMzE0Rjk3NDdDRTgxMUUzOUJCRjk0NjAxMUE1NzRBMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCMzE0Rjk3MzdDRTgxMUUzOUJCRjk0NjAxMUE1NzRBMCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RDVBMTZDQjczOTIwNjgxMTgwODNGNTk0MjM1Q0QzNzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUYwOEVGQzAyNzIwNjgxMTgwODNGNTk0MjM1Q0QzNzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+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');
      background-size: contain;
      margin-bottom: 10px;
    }
    .text {
      display: block;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
    }
  }
}
</style>
