/* ---------- canonical linear RGB ---------- */
function srgbToLinear(v){v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}
function linearToSrgb(v){v=Math.max(0,Math.min(1,v));return v<=.0031308?v*12.92:1.055*Math.pow(v,1/2.4)-.055}
function rgbToLinear(x){return{r:srgbToLinear(x.r),g:srgbToLinear(x.g),b:srgbToLinear(x.b)}}
function linearToRgb(x){return{r:Math.round(linearToSrgb(x.r)*255),g:Math.round(linearToSrgb(x.g)*255),b:Math.round(linearToSrgb(x.b)*255)}}
function hex(x){return'#'+[x.r,x.g,x.b].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase()}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}

/* ---------- HSL / HSV ---------- */
function hsvToRgb(h,s,v){
  h=((h%360)+360)%360;const c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c;
  let r=0,g=0,b=0;
  if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];
  else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];
  return{r:(r+m)*255,g:(g+m)*255,b:(b+m)*255}
}
function rgbToHsv(x){
  let r=x.r/255,g=x.g/255,b=x.b/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,h=0;
  if(d)h=60*(mx===r?((g-b)/d%6):mx===g?(b-r)/d+2:(r-g)/d+4);
  return{h:(h+360)%360,s:mx?d/mx:0,v:mx}
}
function rgbToHsl(x){
  let r=x.r/255,g=x.g/255,b=x.b/255,mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn,l=(mx+mn)/2,h=0,s=0;
  if(d){s=d/(1-Math.abs(2*l-1));h=60*(mx===r?((g-b)/d%6):mx===g?(b-r)/d+2:(r-g)/d+4)}
  return{h:(h+360)%360,s,l}
}
function hslToRgb(h,s,l){
  const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;let r=0,g=0,b=0;
  if(h<60)[r,g,b]=[c,x,0];else if(h<120)[r,g,b]=[x,c,0];else if(h<180)[r,g,b]=[0,c,x];
  else if(h<240)[r,g,b]=[0,x,c];else if(h<300)[r,g,b]=[x,0,c];else[r,g,b]=[c,0,x];
  return{r:(r+m)*255,g:(g+m)*255,b:(b+m)*255}
}

/* ---------- OKLab ---------- */
function linearRgbToOklab(x){
  const L0=.4122214708*x.r+.5363325363*x.g+.0514459929*x.b;
  const M0=.2119034982*x.r+.6806995451*x.g+.1073969566*x.b;
  const S0=.0883024619*x.r+.2817188376*x.g+.6299787005*x.b;
  const L=Math.cbrt(L0),M=Math.cbrt(M0),S=Math.cbrt(S0);
  return{L:.2104542553*L+.793617785*M-.0040720468*S,a:1.9779984951*L-2.428592205*M+.4505937099*S,b:.0259040371*L+.7827717662*M-.808675766*S}
}
function oklabToLinearRgb(x){
  const L=Math.pow(x.L+.3963377774*x.a+.2158037573*x.b,3);
  const M=Math.pow(x.L-.1055613458*x.a-.0638541728*x.b,3);
  const S=Math.pow(x.L-.0894841775*x.a-1.291485548*x.b,3);
  return{r:4.0767416621*L-3.3077115913*M+.2309699292*S,g:-1.2684380046*L+2.6097574011*M-.3413193965*S,b:-.0041960863*L-.7034186147*M+1.707614701*S}
}

const ColorSpaces={
 HSL:{components:['H','S','L'],defaults:{H:0,S:1,L:.5},fromRGB:x=>{const v=rgbToHsl(linearToRgb(x));return{H:v.h,S:v.s,L:v.l}},toRGB:v=>rgbToLinear(hslToRgb(v.H,v.S,v.L)),format:v=>[v.H.toFixed(0),Math.round(v.S*100),Math.round(v.L*100)],range:c=>c==='H'?{min:0,max:360}:{min:0,max:1}},
 RGB:{components:['R','G','B'],defaults:{R:.5,G:.5,B:.5},fromRGB:x=>({R:x.r,G:x.g,B:x.b}),toRGB:v=>({r:v.R,g:v.G,b:v.B}),format:v=>[Math.round(v.R*255),Math.round(v.G*255),Math.round(v.B*255)],range:()=>({min:0,max:1})},
 OKLab:{components:['L','a','b'],defaults:{L:.5,a:0,b:0},fromRGB:linearRgbToOklab,toRGB:oklabToLinearRgb,format:v=>[v.L.toFixed(3),v.a.toFixed(3),v.b.toFixed(3)],range:c=>c==='L'?{min:0,max:1}:{min:-.4,max:.4}}
};

/* ---------- state ---------- */
const state={
  space:'HSL',strip:'H',selected:0,maxSamples:5,
  samples:[
    {rgb:rgbToLinear({r:111,g:214,b:177}),planeCanvas:null,stripCanvas:null},
    {rgb:rgbToLinear({r:112,g:143,b:255}),planeCanvas:null,stripCanvas:null}
  ]
};

const planeStack=document.querySelector('#planeStack'),stripStack=document.querySelector('#stripStack');
const markers=document.querySelector('#markers'),hueMarkers=document.querySelector('#hueMarkers'),samplesEl=document.querySelector('#samples');

/* Canvas resolution is deliberately modest: CSS scales it to the viewport.
   This makes generation dramatically cheaper while preserving visual smoothness. */
const PLANE_W=220, PLANE_H=440, STRIP_W=24, STRIP_H=440;

function makeCanvas(cls,w,h){
  const c=document.createElement('canvas');c.className=cls;c.width=w;c.height=h;return c;
}
function currentValues(sample){return ColorSpaces[state.space].fromRGB(sample.rgb)}
function axesFor(space,strip){return space.components.filter(c=>c!==strip)}
function paintPlane(sample){
  const sp=ColorSpaces[state.space],v=sp.fromRGB(sample.rgb),strip=state.strip,axes=axesFor(sp,strip);
  const xr=sp.range(axes[0]),yr=sp.range(axes[1]),c=sample.planeCanvas,ctx=c.getContext('2d'),im=ctx.createImageData(PLANE_W,PLANE_H);
  for(let y=0;y<PLANE_H;y++){
    const yv=yr.max-y/(PLANE_H-1)*(yr.max-yr.min);
    for(let x=0;x<PLANE_W;x++){
      const xv=x/(PLANE_W-1)*(xr.max-xr.min)+xr.min;
      const cv={...sp.defaults,[strip]:v[strip],[axes[0]]:xv,[axes[1]]:yv};
      const rgb=sp.toRGB(cv),p=(y*PLANE_W+x)*4;
      im.data[p]=clamp(linearToSrgb(rgb.r),0,1)*255;
      im.data[p+1]=clamp(linearToSrgb(rgb.g),0,1)*255;
      im.data[p+2]=clamp(linearToSrgb(rgb.b),0,1)*255;
      im.data[p+3]=255;
    }
  }
  ctx.putImageData(im,0,0);
}
function paintStrip(sample){
  const sp=ColorSpaces[state.space],v=sp.fromRGB(sample.rgb),range=sp.range(state.strip),c=sample.stripCanvas,ctx=c.getContext('2d'),im=ctx.createImageData(STRIP_W,STRIP_H);
  for(let y=0;y<STRIP_H;y++){
    const value=range.max-y/(STRIP_H-1)*(range.max-range.min),cv={...sp.defaults,[state.strip]:value},rgb=sp.toRGB(cv);
    for(let x=0;x<STRIP_W;x++){const p=(y*STRIP_W+x)*4;im.data[p]=clamp(linearToSrgb(rgb.r),0,1)*255;im.data[p+1]=clamp(linearToSrgb(rgb.g),0,1)*255;im.data[p+2]=clamp(linearToSrgb(rgb.b),0,1)*255;im.data[p+3]=255}
  }
  ctx.putImageData(im,0,0);
}
function ensureCanvases(sample){
  if(!sample.planeCanvas){sample.planeCanvas=makeCanvas('plane-canvas',PLANE_W,PLANE_H);planeStack.appendChild(sample.planeCanvas)}
  if(!sample.stripCanvas){sample.stripCanvas=makeCanvas('strip-canvas',STRIP_W,STRIP_H);stripStack.appendChild(sample.stripCanvas)}
}
function rebuildSampleCanvas(sample){
  ensureCanvases(sample);paintPlane(sample);paintStrip(sample);
}

/* Every sample owns a canvas. The active sample is simply the visible canvas.
   Switching uses CSS opacity; no expensive repaint is performed during the transition. */
function activateSampleCanvas(oldIndex,newIndex){
  const old=state.samples[oldIndex],next=state.samples[newIndex];
  ensureCanvases(next);
  state.samples.forEach(s=>{s.planeCanvas.classList.remove('current','transitioning');s.stripCanvas.classList.remove('current','transitioning')});
  old.planeCanvas.classList.add('current');old.stripCanvas.classList.add('current');
  next.planeCanvas.classList.add('transitioning');next.stripCanvas.classList.add('transitioning');
  requestAnimationFrame(()=>{
    next.planeCanvas.style.transition='opacity .2s linear';next.stripCanvas.style.transition='opacity .2s linear';
    next.planeCanvas.offsetWidth;
    next.planeCanvas.style.opacity='1';next.stripCanvas.style.opacity='1';
    setTimeout(()=>{
      state.samples.forEach((s,i)=>{
        s.planeCanvas.classList.remove('current','transitioning');
        s.stripCanvas.classList.remove('current','transitioning');
        s.planeCanvas.style.opacity=i===newIndex?'1':'0';
        s.stripCanvas.style.opacity=i===newIndex?'1':'0';
      });
      next.planeCanvas.classList.add('current');next.stripCanvas.classList.add('current');
    },220);
  });
}

/* Initial canvas stack. */
function initializeCanvases(){
  state.samples.forEach(s=>rebuildSampleCanvas(s));
  state.samples.forEach((s,i)=>{
    s.planeCanvas.style.opacity=i===state.selected?'1':'0';
    s.stripCanvas.style.opacity=i===state.selected?'1':'0';
    if(i===state.selected){s.planeCanvas.classList.add('current');s.stripCanvas.classList.add('current')}
  });
}

function renderMarkers(){
  const sp=ColorSpaces[state.space];markers.innerHTML='';hueMarkers.innerHTML='';
  state.samples.forEach((sample,i)=>{
    const v=sp.fromRGB(sample.rgb),axes=axesFor(sp,state.strip),xr=sp.range(axes[0]),yr=sp.range(axes[1]);
    const m=document.createElement('div');m.className='marker'+(i===state.selected?' selected':'');
    m.style.left=((v[axes[0]]-xr.min)/(xr.max-xr.min)*100)+'%';
    m.style.top=((yr.max-v[axes[1]])/(yr.max-yr.min)*100)+'%';
    m.style.setProperty('--marker-color',hex(linearToRgb(sample.rgb)));
    m.onclick=e=>selectSample(i,e);markers.appendChild(m);
    const sr=sp.range(state.strip),hm=document.createElement('div');hm.className='hue-marker'+(i===state.selected?' selected':'');
    hm.style.top=((sr.max-v[state.strip])/(sr.max-sr.min)*100)+'%';hm.onclick=e=>selectSample(i,e);hueMarkers.appendChild(hm);
  });
}
function renderSamples(){
  samplesEl.innerHTML='';
  state.samples.forEach((sample,i)=>{
    const el=document.createElement('div');el.className='sample'+(i===state.selected?' selected':'');
    el.innerHTML='<button class="swatch" style="background:'+hex(linearToRgb(sample.rgb))+'"></button><div class="hex">'+hex(linearToRgb(sample.rgb))+'</div>';
    el.onclick=e=>selectSample(i,e);samplesEl.appendChild(el);
  });
  const actions=document.createElement('div');actions.className='sample-actions';
  const add=document.createElement('button');add.className='add';add.textContent='+';add.onclick=e=>{e.stopPropagation();addSample()};actions.appendChild(add);
  if(state.samples.length>1){const rm=document.createElement('button');rm.className='remove';rm.textContent='−';rm.onclick=e=>{e.stopPropagation();removeSample()};actions.appendChild(rm)}
  samplesEl.appendChild(actions);
}
function renderDetails(){
  const sp=ColorSpaces[state.space],v=sp.fromRGB(state.samples[state.selected].rgb);
  document.querySelector('#space').innerHTML=Object.keys(ColorSpaces).map(k=>'<option '+(k===state.space?'selected':'')+'>'+k+'</option>').join('');
  document.querySelector('#strip').innerHTML=sp.components.map(c=>'<option '+(c===state.strip?'selected':'')+'>'+c+'</option>').join('');
  document.querySelector('#values').innerHTML=sp.format(v).map(x=>'<input readonly value="'+x+'">').join('');
  const a=linearToRgb(state.samples[state.selected].rgb),b=linearToRgb(state.samples[(state.selected+1)%state.samples.length].rgb);
  document.querySelector('#gradient').style.background='linear-gradient(90deg,'+hex(a)+','+hex(b)+')';
  const h=rgbToHsv(a).h;document.querySelector('#harmony').innerHTML=[0,30,60,180,210].map(d=>'<button style="background:'+hex(hslToRgb((h+d)%360,.7,.55))+'"></button>').join('');
  document.querySelector('#presets').innerHTML=['#6FD6B1','#708FFF','#FF6F91','#FFC857','#A78BFA','#60A5FA','#F3F4F6'].map(c=>'<button class="preset" style="background:'+c+'" data-color="'+c+'"></button>').join('');
  document.querySelectorAll('.preset').forEach(b=>b.onclick=()=>setHex(b.dataset.color));
}
function refreshUI(){renderMarkers();renderSamples();renderDetails()}

function selectSample(i,e){
  e.stopPropagation();
  if(i===state.selected)return;
  const old=state.selected;state.selected=i;
  activateSampleCanvas(old,i);refreshUI();
}
function setPlanePointer(e){
  const r=planeStack.getBoundingClientRect(),x=clamp((e.clientX-r.left)/r.width,0,1),y=clamp((e.clientY-r.top)/r.height,0,1);
  const sp=ColorSpaces[state.space],v=sp.fromRGB(state.samples[state.selected].rgb),axes=axesFor(sp,state.strip),xr=sp.range(axes[0]),yr=sp.range(axes[1]);
  v[axes[0]]=xr.min+x*(xr.max-xr.min);v[axes[1]]=yr.max-y*(yr.max-yr.min);
  state.samples[state.selected].rgb=sp.toRGB(v);
  /* Plane coordinates change, but the plane itself does not: only the marker moves. */
  renderMarkers();renderSamples();renderDetails();
}
function setStripPointer(e){
  const r=stripStack.getBoundingClientRect(),y=clamp((e.clientY-r.top)/r.height,0,1),sp=ColorSpaces[state.space],v=sp.fromRGB(state.samples[state.selected].rgb),rg=sp.range(state.strip);
  v[state.strip]=rg.max-y*(rg.max-rg.min);state.samples[state.selected].rgb=sp.toRGB(v);
  paintPlane(state.samples[state.selected]);paintStrip(state.samples[state.selected]);renderMarkers();renderSamples();renderDetails();
}
function drag(el,fn){let down=false;el.addEventListener('pointerdown',e=>{down=true;el.setPointerCapture(e.pointerId);fn(e)});el.addEventListener('pointermove',e=>{if(down)fn(e)});el.addEventListener('pointerup',()=>down=false);el.addEventListener('pointercancel',()=>down=false)}
function addSample(){
  if(state.samples.length>=state.maxSamples)return;
  const h=rgbToHsv(linearToRgb(state.samples[state.selected].rgb));
  const sample={rgb:rgbToLinear(hsvToRgb((h.h+35)%360,h.s,h.v)),planeCanvas:null,stripCanvas:null};
  state.samples.push(sample);ensureCanvases(sample);paintPlane(sample);paintStrip(sample);
  const old=state.selected;state.selected=state.samples.length-1;activateSampleCanvas(old,state.selected);refreshUI();
}
function removeSample(){
  if(state.samples.length<=1)return;
  const removed=state.samples[state.selected],old=state.selected;
  const next=Math.max(0,old-1);
  removed.planeCanvas.remove();removed.stripCanvas.remove();state.samples.splice(old,1);state.selected=next;
  ensureCanvases(state.samples[next]);activateSampleCanvas(old===next?0:old,next);refreshUI();
}
function setHex(v){
  v=v.replace('#','');state.samples[state.selected].rgb=rgbToLinear({r:parseInt(v.slice(0,2),16),g:parseInt(v.slice(2,4),16),b:parseInt(v.slice(4,6),16)});
  rebuildSampleCanvas(state.samples[state.selected]);refreshUI();
}

document.querySelector('#detailsBtn').onclick=()=>document.querySelector('#details').classList.remove('hidden');
document.querySelector('#closeDetails').onclick=()=>document.querySelector('#details').classList.add('hidden');
document.querySelector('#space').onchange=e=>{
  state.space=e.target.value;state.strip=ColorSpaces[state.space].components[0];
  state.samples.forEach(rebuildSampleCanvas);refreshUI();
};
document.querySelector('#strip').onchange=e=>{
  state.strip=e.target.value;state.samples.forEach(rebuildSampleCanvas);refreshUI();
};

drag(planeStack,setPlanePointer);drag(stripStack,setStripPointer);

initializeCanvases();refreshUI();

window.MiniBotColorPicker={
  state,ColorSpaces,addSample,removeSample,setHex,refreshUI,
  rebuildSampleCanvas,activateSampleCanvas
};
