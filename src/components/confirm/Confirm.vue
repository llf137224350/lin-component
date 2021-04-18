<template>
  <div
    class="confirm"
    @click.stop="handleStopPropagation"
    @touchstart.stop=""
    @mouseover.stop=""
  >
    <transition
      enter-active-class="model_animate__animated model_animate__fadeIn"
      leave-active-class="model_animate__animated model_animate__fadeOut"
      appear
    >
      <div class="mask" v-if="showRef"></div>
    </transition>
    <transition
      enter-active-class="model_animate__animated model_animate__zoomIn model_animate__fadeIn"
      leave-active-class="model_animate__animated model_animate__zoomOut model_animate__fadeOut"
      appear
      @after-leave="handleAfterLeave"
    >
      <div class="confirm-wrapper" v-if="showRef">
        <div class="confirm-wrapper-header">{{ title }}</div>
        <div class="confirm-wrapper-content">{{ content }}</div>
        <div class="confirm-wrapper-footer">
          <div
            class="btn cancel-btn"
            :style="{ color: cancelColor }"
            @click.stop="handleClick(0)"
          >
            {{ cancelText }}
          </div>
          <div
            class="btn confirm-btn"
            :style="{ color: confirmColor }"
            @click.stop="handleClick(1)"
          >
            {{ confirmText }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { AfterClose } from './index';
export interface Confirm {
  show: boolean;
  title: string;
  content: string;
  confirmText: string;
  cancelText: string;
  confirmColor: string;
  cancelColor: string;
  confirm: () => void;
  cancel: () => void;
  destroy: () => void;
  afterClose: (params: AfterClose) => void;
}
export default defineComponent({
  name: 'Confirm',
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    title: {
      type: String as PropType<string>,
      default: 'Title',
    },
    content: {
      type: String as PropType<string>,
      default: 'this is content',
    },
    confirmText: {
      type: String as PropType<string>,
      default: 'Ok',
    },
    cancelText: {
      type: String as PropType<string>,
      default: 'Cancel',
    },
    confirmColor: {
      type: String as PropType<string>,
      default: '#108ee9',
    },
    cancelColor: {
      type: String as PropType<string>,
      default: '#000',
    },
    confirm: {
      type: Function as PropType<() => void>,
      default() {
        return () => {};
      },
    },
    cancel: {
      type: Function as PropType<() => void>,
      default() {
        return () => {};
      },
    },
    destroy: {
      type: Function as PropType<() => void>,
      default() {
        return () => {};
      },
    },
    afterClose: {
      type: Function as PropType<() => void>,
      default() {
        return () => {};
      },
    },
  },
  setup(props: Readonly<Confirm>) {
    const showRef = ref(false);
    const current = ref(0); // 0 cancel 1 confirm
    // 添加属性变化
    watch(
      () => props.show,
      (show: boolean) => {
        showRef.value = show;
      },
      { immediate: true }
    );

    const handleClick = (index: number) => {
      current.value = index;
      showRef.value = false;
      if (index === 0) {
        props.cancel();
      } else {
        props.confirm();
      }
    };
    const handleAfterLeave = () => {
      props.destroy();
      props.afterClose({
        cancel: current.value === 0,
        confirm: current.value === 1,
      });
    };
    const handleStopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    };
    return {
      showRef,
      handleClick,
      handleAfterLeave,
      handleStopPropagation,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./animate.less');
.confirm {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  .mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.49);
  }

  .confirm-wrapper {
    position: relative;
    margin: auto;
    padding-top: 15px;
    top: 50%;
    width: 72%;
    display: flex;
    flex-direction: column;
    max-height: 219px;
    min-height: 141px;
    background: #fff;
    border-radius: 7px;
    transform: translateY(-50%);
    box-sizing: border-box;
    overflow: hidden;
    .confirm-wrapper-header {
      text-align: center;
      padding: 6px 15px 15px;
      font-size: 18px;
    }
    .confirm-wrapper-content {
      flex: 1;
      text-align: center;
      padding: 0 15px 15px;
      font-size: 15px;
      color: #888;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .confirm-wrapper-footer {
      flex: 0 0 50px;
      display: flex;
      border-top: 1px solid #eee;
      height: 50px;
      .btn {
        flex: 1;
        display: block;
        padding: 0 15px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        box-sizing: border-box;
        user-select: none;
        &:active {
          background: #ddd;
        }
      }
      .cancel-btn {
        border-right: 1px solid #eee;
      }
    }
  }
}
</style>
