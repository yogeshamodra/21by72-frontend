/**
 * hero-hex.js
 * Animated hexagon grid behind the hero (canvas#hex): shimmer wave, cursor
 * glow, auto + click ripples. Pauses off-screen; static for reduced motion.
 * Needs: nothing.
 */
(function(){
  var cv=document.getElementById('hex');if(!cv)return;
  var ctx=cv.getContext('2d'),hero=cv.parentNode,R=36,W,H,dpr,cells=[],mx=-999,my=-999,ripples=[],visible=true,still=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  function build(){
    dpr=Math.min(window.devicePixelRatio||1,2);W=hero.clientWidth;H=hero.clientHeight;
    cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    cells=[];var w=Math.sqrt(3)*R,rows=Math.ceil(H/(R*1.5))+2,cols=Math.ceil(W/w)+2;
    for(var r=-1;r<rows;r++)for(var c=-1;c<cols;c++)cells.push([c*w+(r&1?w/2:0),r*R*1.5]);
  }
  function hex(x,y){ctx.beginPath();for(var i=0;i<6;i++){var a=Math.PI/3*i+Math.PI/6;ctx.lineTo(x+R*.94*Math.cos(a),y+R*.94*Math.sin(a))}ctx.closePath()}
  function spawn(){ripples.push({x:Math.random()*W,y:Math.random()*H,t:performance.now()})}
  function draw(now){
    ctx.clearRect(0,0,W,H);
    ripples=ripples.filter(function(p){return now-p.t<3600});
    for(var i=0;i<cells.length;i++){
      var x=cells[i][0],y=cells[i][1],dx=x-mx,dy=y-my,md=Math.sqrt(dx*dx+dy*dy);
      var a=.08+.08*(Math.sin(x*.004+y*.003-now*.0008)+1)/2+Math.max(0,1-md/230)*.7,o=0;
      for(var k=0;k<ripples.length;k++){
        var p=ripples[k],age=now-p.t,ring=age*.32,ex=x-p.x,ey=y-p.y,d=Math.sqrt(ex*ex+ey*ey),g=(d-ring)/45;
        o=Math.max(o,Math.exp(-g*g)*(1-age/3600))
      }
      a+=o*.9;if(a>1)a=1;
      var rr=Math.round(80+o*175),gg=Math.round(150-o*44),bb=Math.round(255-o*194);
      ctx.strokeStyle='rgba('+rr+','+gg+','+bb+','+a.toFixed(3)+')';ctx.lineWidth=1+o*1.2;hex(x,y);ctx.stroke();
      if(a>.4){ctx.fillStyle='rgba('+rr+','+gg+','+bb+','+((a-.4)*.18).toFixed(3)+')';ctx.fill()}
    }
  }
  function loop(now){if(visible)draw(now);requestAnimationFrame(loop)}
  build();window.addEventListener('resize',build);
  hero.addEventListener('mousemove',function(e){var b=cv.getBoundingClientRect();mx=e.clientX-b.left;my=e.clientY-b.top});
  hero.addEventListener('mouseleave',function(){mx=my=-999});
  hero.addEventListener('click',function(e){if(e.target.closest('a'))return;var b=cv.getBoundingClientRect();ripples.push({x:e.clientX-b.left,y:e.clientY-b.top,t:performance.now()})});
  if('IntersectionObserver' in window)new IntersectionObserver(function(en){visible=en[0].isIntersecting}).observe(hero);
  if(still){draw(0)}else{spawn();setInterval(spawn,1400);requestAnimationFrame(loop)}
})();
