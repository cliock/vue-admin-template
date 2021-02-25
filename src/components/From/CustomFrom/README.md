### 组件说明
- 根据后台数据定制的表单样式组件
- froms为需要渲染的数据列表
### 参数参考
##### Attributes
 参数 | 说明 | 类型 | 可选值 | 默认值
 -----|-----|-----|------|-----
froms | 表单样式数据 | Array | / | [ ]
showBtn | 底部按钮组控件 | Object | / | 参照showBtn对象参数表

##### froms 数据参考
 参数 | 说明  | 示例
 -----|-----|-----
label | 表单标题 | 用户名、密码、地址
type | 需要渲染的表单类型 | Text、Select、Number
disabled | 是否禁用表单 | true、false
require | 是否必填 | true、false
echoValue | 回显数据 | 无
option | select类型的下拉数据 | [ ]
 

##### showBtn 对象参数
 参数 | 说明 | 类型 | 可选值 | 默认值
 -----|-----|-----|------|-----
showBtnRow | 是否显示底部按钮组 | Boolean | true、false | true
showCancelBtn | 是否显示取消按钮,前提showBtnRow为true | Boolean | true、false | true
showSubmitBtn | 是否确认按钮,前提showBtnRow为true | Boolean | true、false | true
btnPosition | 按钮位置 | String | left、right | right


#### Events
 事件名称 | 说明 | 回调参数
 -----|-----|-----
submitBtn | 点击确定按钮 | 表单数据 
cancelBtn | 点击取消按钮 | 无
