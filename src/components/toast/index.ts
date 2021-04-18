/* eslint-disable no-empty */
import { render, createVNode } from 'vue';
import Toast from './Toast.vue';
export type Position = 'top' | 'middle' | 'bottom';
export type ToastType = 'info' | 'success' | 'fail' | 'loading' | 'custom';
export interface ToastProps {
  mask?: boolean;
  content: string;
  duration?: number;
}
let container: null | HTMLElement;
let options: any;
let timer: number | null;

const destroy = () => {
  if (container) {
    // try {
    // 如果没有开启mask 多次点击弹出提示，销毁时容易出错
    render(null, container);
    document.body.removeChild(container);
    container = null;
    // } catch (e) {}
  }
};
const setTimer = (t: number) => {
  timer = t;
};
const _render = (
  props: ToastProps & { type: ToastType; position?: Position; custom?: string }
) => {
  if (container) {
    // 清除定时器
    timer && clearTimeout(timer);
    destroy();
  }
  container = document.createElement('div');
  options = {
    ...props,
    destroy,
    setTimer,
    show: true,
  };
  const vm = createVNode(Toast, options);
  render(vm, container);
  document.body.appendChild(container);
};
// 普通提示
const info = (props: ToastProps & { position?: Position }) => {
  _render({
    ...props,
    type: 'info',
  });
};
// 成功提示
const success = (props: ToastProps) => {
  _render({
    ...props,
    type: 'success',
  });
};
// 失败提示
const fail = (props: ToastProps) => {
  _render({
    ...props,
    type: 'fail',
  });
};
// 自定义图标
const custom = (props: ToastProps & { custom: string }) => {
  _render({
    ...props,
    type: 'custom',
  });
};
// 加载中
const loading = (props: ToastProps) => {
  _render({
    ...props,
    type: 'loading',
  });
};
// 隐藏
const hide = () => {
  // 用之前的数据创建一个vNode，进行更新
  if (container && options) {
    const vm = createVNode(Toast, { ...options, show: false });
    render(vm, container);
  }
};
export default {
  info,
  success,
  fail,
  custom,
  loading,
  hide,
};
