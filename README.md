# 常用组件库

## 包含但不限于如下组件
* Toast
* Alert
* Confirm

[体验地址，请使用手机或者浏览器打开开发者工具，选择手机尺寸观看](http://www.uicoder.cn/lin_component)



**使用方法**

```javascript
// 全局引入css
import 'lin-component/dist/lin-component.css';

// 用到的页面中引入对应组件
import {Toast,Alert,Confirm} from 'lin-component';
```



**土司使用方法**

```javascript
// 普通提示
// position: top、middle、bottom字符串，用于控制显示位置。
// duration 用于控制显示时长。
// mask控制是否在显示的时候点击穿透
Toast.info({
        content: 'hello, this is toast',
        position,
      });

// 成功提示
Toast.success({
        content: 'success',
        mask: true,
      });

// 失败提示
 Toast.fail({
        content: 'fail',
        mask: true,
      });
// 自定义内容
Toast.custom({
        content: 'custom',
        mask: true,
        custom: `<svg viewBox="0 0 1024 1024" width="36" height="36"><path d="M1024 512C1024 229.230208 794.769792 0 512 0 229.230208 0 0 229.230208 0 512 0 794.769792 229.230208 1024 512 1024 629.410831 1024 740.826187 984.331046 830.768465 912.686662 841.557579 904.092491 843.33693 888.379234 834.742758 877.590121 826.148587 866.801009 810.43533 865.021658 799.646219 873.615827 718.470035 938.277495 618.001779 974.048781 512 974.048781 256.817504 974.048781 49.951219 767.182496 49.951219 512 49.951219 256.817504 256.817504 49.951219 512 49.951219 767.182496 49.951219 974.048781 256.817504 974.048781 512 974.048781 599.492834 949.714859 683.336764 904.470807 755.960693 897.177109 767.668243 900.755245 783.071797 912.462793 790.365493 924.170342 797.659191 939.573897 794.081058 946.867595 782.373508 997.013826 701.880796 1024 608.898379 1024 512Z" p-id="2679" fill="#ffffff"></path>
        <path d="M499.512194 743.02439C499.512194 756.818039 510.694157 768 524.487806 768 538.281453 768 549.463415 756.818039 549.463415 743.02439L549.463415 424.585365C549.463415 410.791718 538.281453 399.609756 524.487806 399.609756 510.694157 399.609756 499.512194 410.791718 499.512194 424.585365L499.512194 743.02439Z" p-id="2680" fill="#ffffff"></path><path d="M499.512194 318.439025C499.512194 332.232672 510.694157 343.414635 524.487806 343.414635 538.281453 343.414635 549.463415 332.232672 549.463415 318.439025L549.463415 274.731708C549.463415 260.938059 538.281453 249.756098 524.487806 249.756098 510.694157 249.756098 499.512194 260.938059 499.512194 274.731708L499.512194 318.439025Z" p-id="2681" fill="#ffffff"></path></svg>`,
      });

// 加载中与隐藏
Toast.loading({
        content: 'loading...',
        mask: true,
      });
      setTimeout(() => {
        Toast.hide();
      }, 3000);


```



**Alert使用方法**

```javascript
// 方式一 普通弹窗
Alert.show({
        title: 'Title',
        content: 'this is content',
        afterClose() {
          Toast.info({
            content: 'afterClose',
            position: 'bottom',
          });
        },
      });

// 方式二
Alert.show({
        title: 'Title',
        content: 'this is content',
        model: 'countDown', // 弹窗模式，normal为普通弹窗、countDown为倒计时弹窗（按钮多少s后可用）
        prefix: 'available after ', // 不可用时前缀
        postfix: ' seconds', // 不可用时后缀
        duration: 5, // 倒计时时长，单位s
        afterClose() { // 弹窗关闭动画执行完成时回调
          Toast.info({
            content: 'afterClose',
            position: 'bottom',
          });
        },
      });
```



**Confirm使用方法**

```javascript
/**
	title: string; // 标题
  content: string; // 内容
  confirmText?: string; // 确定按钮文字
  cancelText?: string; // 取消按钮文字
  confirmColor?: string; // 确定按钮文字颜色
  cancelColor?: string; // 取消按钮文字颜色
  confirm?: () => void; // 确定按钮回调
  cancel?: () => void; // 取消按钮回调
  afterClose?: (params: AfterClose) => void; // 动画完成回调
  */
Confirm.show({
        title: 'Title',
        content: 'this is content',
        cancelText: 'Cancel', // 取消按钮文本
        cancel() { // 取消按钮回调
          ...
        },
        confirm() { // 确定按钮回调
          ...
        },
        afterClose(params: any) { // 关闭窗口时动画执行完回调
          ...
        },
      });
```

