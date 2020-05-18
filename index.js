
var $ = function (el) {
  return document.querySelector(el);
}
/**
 * 轮播插件   实现动画
 */
const glide = new Glide('.glide');

const captionEl = document.querySelectorAll('.slide-caption');

glide.on(['mount.after','run.after'],() => {
  const caption = captionEl[glide.index];
  anime({
    targets:caption.children,
    opacity:[0,1],
    duration:400,
    easing:'linear',
    delay:anime.stagger(400,{start:300}),
    translateY:[anime.stagger([40,10]),0]
  })
})

glide.on('run.before',()=>{
  document.querySelectorAll('.slide-caption>*').forEach(el=>{
    el.style.opacity = 0;
  })
})
glide.mount();


/**
 * 监听滚动  固定header 返回顶部按钮
 */

 const header = document.querySelector('header');
 const backtop = document.querySelector('.backtop');
 window.addEventListener('scroll',()=>{
  var height =  document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
  if(height > 1000) {
    header.classList.add('fix')
  }else{
    header.classList.remove('fix')
  }

  if(height > 1200) {
    backtop.classList.add('isShow')
  }else {
    backtop.classList.remove('isShow')
  }
})



/**
 * 监听折叠按钮的点击
 */
const burger = $('.burger');
const nav = $('nav');
burger.addEventListener('click',()=>{
  console.log(header.classList.value)
  var index = header.classList.value.indexOf('open')
  
  if(index != -1) {
    header.classList.remove('open')
  }else{
    header.classList.add('open')
  }
})
nav.addEventListener('click',()=>{
  header.classList.remove('open')
})
/**
 * smooth-scroll实现平滑滚动效果
 */

 const scroll = new SmoothScroll('nav a[href*="#"], .backtop a',{
   header:"header",
   offset:80
 })

 /**
  * isotope实现筛选过滤
  */
 const isotope = new Isotope('.grides',{
   itemSelector:".grid_item",
  //  layoutModel:"fitRows"
 })

 const isotopeBtn = document.querySelector('.isotope_btn');
 isotopeBtn.addEventListener('click',(e)=>{
   let {target} = e;
   const filterOption = target.getAttribute("data-filter");
   if(filterOption) {
    document.querySelector('.isotope_btn .active').classList.remove('active');
    target.classList.add('active');
    isotope.arrange({filter:filterOption});
   }
 })

 /**
  * ScrollReveal库实现滚动显示动画
  */
  const options = {
    delay:300,
    distance:'50px',
    duration:500,
    easing:'ease-in-out',
    origin:'bottom'
  }
  ScrollReveal().reveal(".item",{...options,interval:350});
  
  ScrollReveal().reveal(".server_item",{...options,interval:350});

  
   /**
    * 数字增长效果
    */
  ScrollReveal().reveal(".numbers",{
    beforeReveal:()=>{
      anime({
        targets:".number .num",
        innerHTML:el=>{
          return [0,el.innerHTML]
        },
        duration:2000,
        round:1,
        easing:"easeInExpo"
      })
    }
  });