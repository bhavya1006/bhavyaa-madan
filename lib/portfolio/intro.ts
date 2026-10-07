import { motion } from "./motion"

// Runs before the first body paint. The CSS overlay is absent unless this opts in.
// A fail-open timeout prevents missing/failed hydration from covering the page.
export const introBootstrap = `(()=>{try{
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const navigation=performance.getEntriesByType('navigation')[0];
const replay=${process.env.NODE_ENV === "development"}&&new URLSearchParams(location.search).has('introDebug');
if(reduced||location.hash||(!replay&&navigation&&navigation.type!=='navigate'))return;
if(!replay&&sessionStorage.getItem('portfolio:intro-seen'))return;
sessionStorage.setItem('portfolio:intro-seen','1');
const root=document.documentElement;
root.dataset.intro='pending';root.dataset.introStarted=String(performance.now());
const events=['scroll','wheel','touchstart','keydown','pointerdown','resize','focusin','pagehide'];
function disarm(){events.forEach(name=>window.removeEventListener(name,dismiss));window.removeEventListener('portfolio:intro-hydrated',disarm)}
function dismiss(){delete root.dataset.intro;delete root.dataset.introStarted;disarm()}
events.forEach(name=>window.addEventListener(name,dismiss,{passive:true}));
window.addEventListener('portfolio:intro-hydrated',disarm,{once:true});
setTimeout(dismiss,${motion.intro.failOpen});
}catch{}})()`
