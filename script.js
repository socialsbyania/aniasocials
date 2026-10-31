(function(){
  var d=document;d.documentElement.className+=' js';
  var nav=d.getElementById('nav'),btn=d.getElementById('menuBtn'),links=d.getElementById('navLinks');

  /* Mobile menu */
  if(btn&&links){
    btn.addEventListener('click',function(){btn.classList.toggle('open');links.classList.toggle('open');});
    links.addEventListener('click',function(e){if(e.target.tagName==='A'){btn.classList.remove('open');links.classList.remove('open');}});
  }

  /* Nav background on scroll */
  if(nav){window.addEventListener('scroll',function(){nav.classList.toggle('scrolled',window.scrollY>30);},{passive:true});}

  /* Reveal on scroll */
  var rv=[].slice.call(d.querySelectorAll('.reveal'));
  function showAll(){rv.forEach(function(el){el.classList.add('visible');});}
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}});},{threshold:.12});
    rv.forEach(function(el){io.observe(el);});
    setTimeout(function(){rv.forEach(function(el){if(el.getBoundingClientRect().top<window.innerHeight)el.classList.add('visible');});},400);
  }else{showAll();}

  /* Active nav link while scrolling (homepage only) */
  if(d.getElementById('home')&&links){
    var secs=[].slice.call(d.querySelectorAll('main section[id]')),als=[].slice.call(links.querySelectorAll('a'));
    window.addEventListener('scroll',function(){
      var cur='home';secs.forEach(function(s){if(s.getBoundingClientRect().top<160)cur=s.id;});
      als.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+cur);});
    },{passive:true});
  }

  /* View more projects (homepage) */
  var grid=d.getElementById('workGrid'),more=d.getElementById('moreBtn');
  if(grid&&more){
    more.addEventListener('click',function(){grid.classList.toggle('all');more.textContent=grid.classList.contains('all')?'Show Less':'View More Projects';});
  }

  /* Lightbox (project pages) */
  var lb=d.getElementById('lightbox'),lbi=d.getElementById('lbImg'),gal=d.getElementById('pGal');
  if(lb&&lbi){
    if(gal){gal.addEventListener('click',function(e){var im=e.target.closest('img');if(!im)return;lbi.src=im.src;lb.classList.add('show');});}
    lb.addEventListener('click',function(){lb.classList.remove('show');});
    d.addEventListener('keydown',function(e){if(e.key==='Escape')lb.classList.remove('show');});
  }
})();
