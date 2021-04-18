<template>
  <div
    class="alert"
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
      <div class="alert-wrapper" v-if="showRef">
        <div class="alert-wrapper-header">{{ title }}</div>
        <div class="alert-wrapper-content">{{ content }}</div>
        <div
          :class="[
            'alert-wrapper-footer',
            { 'count-down': model === 'countDown' && countDownRef !== 0 },
          ]"
          @click.stop="handleClick"
        >
          {{ btnTextRef }}
        </div>
      </div>
    </transition>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue';
import { Model } from './index';
export interface Alert {
  show: boolean;
  title: string;
  content: string;
  btnText: string;
  model: Model;
  duration: number;
  prefix: string;
  postfix: string;
  destroy: () => void;
  afterClose: () => void;
}
export default defineComponent({
  name: 'Alert',
  props: {
    show: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    model: {
      type: String as PropType<Model>,
      default: 'normal',
    },
    duration: {
      type: Number as PropType<number>,
      default: 3,
    },
    prefix: {
      type: String as PropType<string>,
      default: '',
    },
    postfix: {
      type: String as PropType<string>,
      default: 'S',
    },
    title: {
      type: String as PropType<string>,
      default: 'Title',
    },
    content: {
      type: String as PropType<string>,
      default: 'this is content',
    },
    btnText: {
      type: String as PropType<string>,
      default: 'Ok',
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
  setup(props: Readonly<Alert>) {
    const showRef = ref(false);
    // 添加属性变化
    watch(
      () => props.show,
      (show: boolean) => {
        showRef.value = show;
      },
      { immediate: true }
    );

    const btnTextRef = ref(props.btnText);
    const countDownRef = ref(props.duration);
    const timerRef = ref<null | number>(null);
    if (props.model === 'countDown') {
      // 倒计时
      btnTextRef.value = `${props.prefix}${props.duration}${props.postfix}`;
      if (countDownRef.value !== 0) {
        timerRef.value = setInterval(() => {
          countDownRef.value -= 1;
          if (countDownRef.value !== 0) {
            btnTextRef.value = `${props.prefix}${countDownRef.value}${props.postfix}`;
          } else {
            btnTextRef.value = props.btnText;
            clearInterval(timerRef.value!);
          }
        }, 1000);
      }
    }
    const handleClick = () => {
      if (
        props.model === 'normal' ||
        (props.model === 'countDown' && countDownRef.value === 0)
      ) {
        showRef.value = false;
      }
    };
    const handleAfterLeave = () => {
      props.destroy();
      props.afterClose();
    };
    const handleStopPropagation = (e: MouseEvent) => {
      e.stopPropagation();
    };
    return {
      showRef,
      btnTextRef,
      countDownRef,
      handleClick,
      handleAfterLeave,
      handleStopPropagation,
    };
  },
});
</script>
<style lang="less" scoped>
@import url('./animate.less');
.alert {
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

  .alert-wrapper {
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
    .alert-wrapper-header {
      text-align: center;
      padding: 6px 15px 15px;
      font-size: 18px;
    }
    .alert-wrapper-content {
      flex: 1;
      text-align: center;
      padding: 0 15px 15px;
      font-size: 15px;
      color: #888;
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .alert-wrapper-footer {
      flex: 0 0 50px;
      border-top: 1px solid #eee;
      text-align: center;
      color: #108ee9;
      font-size: 18px;
      height: 50px;
      line-height: 50px;
      display: block;
      width: auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      box-sizing: border-box;
      user-select: none;
      &:active {
        background: #ddd;
      }
      &.count-down {
        color: #888;
        background: #ddd;
      }
    }
  }
}
</style>
