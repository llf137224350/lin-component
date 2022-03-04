import {createVNode, render} from 'vue';
import Alert from './Alert.vue';

export type Model = 'normal' | 'countDown';

export interface AlertProps {
  title: string;
  content: string;
  model?: Model;
  duration?: number;
  prefix?: string;
  postfix?: string;
  btnText?: string;
  afterClose?: () => void;
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

const _render = (props: AlertProps) => {
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
  const vm = createVNode(Alert, options);
  render(vm, container);
  document.body.appendChild(container);
};
// 普通提示
const show = (props: AlertProps) => {
  _render({
    ...props,
  });
};

export default {
  show,
};
