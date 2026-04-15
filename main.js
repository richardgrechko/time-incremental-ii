let dt1 = Date.now();
let dt2 = Date.now();
funcs.save();
funcs.load();
(function main(){
  dt1 = Date.now()
  funcs.update((dt1-dt2)/1000)
  dt2 = Date.now()
  updateUI()
  requestAnimationFrame(main)
})()
