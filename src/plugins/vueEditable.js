// export default{
//   install (Vue) {
//     Vue.prototype.$editable = function (e, callback) {
//       const target = e.target
//       const value = target.innerText
//       target.innerHTML = '<input type=\'text\' value=\'' + value + '\' id=\'_editable\' style=\'width:100%;box-sizing:border-box;background:transparent;font-size:13px;color:red;text-align:center\'>'
//       const input = document.getElementById('_editable')
//       input.focus()
//       const len = input.value.length
//       if (document.selection) {
//         const sel = input.createTextRange()
//         sel.moveStart('character', len)
//         sel.collapse()
//         sel.select()
//       } else if (typeof input.selectionStart === 'number' && typeof input.selectionEnd === 'number') {
//         input.selectionStart = input.selectionEnd = len
//       }

//       const action = function () {
//         if (value !== this.value && this.value !== '') {
//           target.innerHTML = this.value
//           callback(this.value)
//         } else {
//           target.innerHTML = value
//         }
//         input.removeEventListener('blur', action, false)
//       }
//       input.addEventListener('blur', action, false)
//     }
//   }
// }