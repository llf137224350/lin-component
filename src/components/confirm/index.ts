import { render, createVNode } from 'vue';
import Confirm from './Confirm.vue';
export interface AfterClose {
  cancel: boolean;
  confirm: boolean;
}
export interface ConfirmProps {
  title: string; // 标题
  content: string; // 内容
  confirmText?: string; // 确定按钮文字
  cancelText?: string; // 取消按钮文字
  confirmColor?: string; // 确定按钮文字颜色
  cancelColor?: string; // 取消按钮文字颜色
  confirm?: () => void; // 确定按钮回调
  cancel?: () => void; // 取消按钮回调
  afterClose?: (params: AfterClose) => void; // 动画完成回调
}

let container: null | HTMLElement;
let options: any;

const destroy = () => {
  if (container) {
    // 如果没有开启mask 多次点击弹出提示，销毁时容易出错
    render(null, container);
    document.body.removeChild(container);
    container = null;
  }
};

const _render = (props: ConfirmProps) => {
  if (container) {
    // 清除定时器
    destroy();
  }
  container = document.createElement('div');
  options = {
    ...props,
    destroy,
    show: true,
  };
  const vm = createVNode(Confirm, options);
  render(vm, container);
  document.body.appendChild(container);
};
// 普通提示
const show = (props: ConfirmProps) => {
  _render({
    ...props,
  });
};

export default {
  show,
};
