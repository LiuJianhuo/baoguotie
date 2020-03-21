// 自定义指令
import Vue from 'vue'

const handleOnlyInputPureNumber = (e) => {
  const target = e.currentTarget
  let inputNode = target
  if (target.tagName !== 'INPUT') inputNode = e.currentTarget.querySelector('input')
  if (!inputNode) return
  const val = inputNode.value
  inputNode.value = val.match(/\d*/)[0]
}
// 只能输入纯数字
Vue.directive('pure-number', {
  bind (el, arg) {
    el.addEventListener('input', handleOnlyInputPureNumber)
  },
  unbind (el) {
    el.removeEventListener('input', handleOnlyInputPureNumber)
  }
})

// const hanldeOnlyInputFloatNumber = (el, { decimalPlaces = '', intPlaces = '' }) => {
//   let inputNode = el
//   console.log(el)
//   if (el.tagName !== 'INPUT') inputNode = el.querySelector('input')
//   const realVal = el.value
//   if (!inputNode || realVal === '') return
//   const formatVal = realVal.match(/^\d*(\.?\d*)/)[0]
//   // alert(formatVal)
//   if (!formatVal) {
//     inputNode.value = formatVal
//     return
//   }
//   // alert('sss')
//   if (decimalPlaces < 1 && intPlaces < 1) return
//   let [intPart, decimalPart] = formatVal.split['.']
//   if (intPlaces > 0 && intPart.length > intPlaces) {
//     intPart = intPart.subs(0, intPlaces)
//   }
//   if (decimalPart === undefined) {
//     inputNode.value = intPart
//     return
//   }
//   inputNode.value = intPart + '.' + decimalPart
// }
// // 只能输入纯数字
// Vue.directive('float-number', {
//   bind (el, binding, vnode) {
//     console.log(binding.value)
//     el.addEventListener('input', (e) => hanldeOnlyInputFloatNumber(e.currentTarget, binding.value || {}), vnode)
//     // hanldeOnlyInputFloatNumber(el, binding.value)
//   }
// })
