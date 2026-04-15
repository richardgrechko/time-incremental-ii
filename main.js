let dt1 = Date.now()
let dt2 = Date.now()
funcs.load()
(function main(){
  dt1 = Date.now()
  let dt = dt2-dt1
  dt2 = Date.now()
  funcs.update(dt)
  updateUI()
  requestAnimationFrame(main)
})()
