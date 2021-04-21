(()=>{"use strict";class e{constructor(e){this.type=e}}var t,n;(n=t||(t={}))[n.Cheer=0]="Cheer",n[n.Follow=1]="Follow",n[n.GiftedSubscription=2]="GiftedSubscription",n[n.Host=3]="Host",n[n.Raid=4]="Raid",n[n.Subscription=5]="Subscription";class r extends e{constructor(e,n){if(super(t.Cheer),this.name=e,this.amount=n,!e)throw new Error("Parameter 'name' cannot be null or empty.");if(n<1)throw new Error("Parameter 'amount' cannot be less than 1.");this.html=this.generateHtml(),this.alertSound=l.Get(d.CheerAlertSound)}generateHtml(){const e=`X${this.amount.toString()}`;return`<svg class="slide-icon" viewBox="0 0 187.35 242.67">\n                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>\n                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>\n            </svg><span class="slide-text">${this.name} ${e}</span>`}}class s extends e{constructor(e){if(super(t.Follow),this.name=e,!e)throw new Error("Parameter 'name' cannot be null or empty.");this.html=this.generateHtml(),this.alertSound=l.Get(d.FollowAlertSound)}generateHtml(){return`<i class="slide-icon fas fa-heart"></i><span class="slide-text">${this.name}</span>`}}class i extends e{constructor(e,n){if(super(t.GiftedSubscription),this.name=e,this.amount=n,!e)throw new Error("Parameter 'name' cannot be null or empty.");n||(this.amount=1),this.html=this.generateHtml(),this.alertSound=l.Get(d.GiftedSubAlertSound)}generateHtml(){const e=`X${this.amount.toString()}`;return` <i class="slide-icon fas fa-gift"></i><span class="slide-text">${this.name} ${e}</span>`}}class a extends e{constructor(e,n){if(super(t.Raid),this.name=e,this.amount=n,!e)throw new Error("Parameter 'name' cannot be null or empty.");if(n<1)throw new Error("Parameter 'amount' cannot be less than 1.");this.html=this.generateHtml(),this.alertSound=l.Get(d.RaidAlertSound)}generateHtml(){const e=`X${this.amount.toString()}`;return` <i class="slide-icon fas fa-users"></i><span class="slide-text">${this.name} ${e}</span>`}getRaidAmountString(){if(!(this.amount&&this.amount>0))return""}}class o extends e{constructor(e,n,r){if(super(t.Subscription),this.name=e,this.amount=n,this.tier=r,!e)throw new Error("Parameter 'name' cannot be null, empty or undefined..");if(n<1)throw new Error("Parameter 'amount' cannot be less than 1.");if(!r)throw new Error("Parameter 'tier' cannot be null, empty or undefined.");this.html=this.generateHtml(),this.alertSound=l.Get(d.SubAlertSound)}generateHtml(){const e=`X${this.amount.toString()}`;let t;return t="prime"===this.tier?'<svg class="slide-icon" viewBox="0 0 200.9 124.26">\n            <path d="M187.63,120.42H13.27c-5.1,0-9.22-4.14-9.2-9.24L4.4,22.26c0.01-1.85,2.22-2.81,3.58-1.55L45.17,55.4\n                c0.84,0.78,2.15,0.76,2.96-0.06L98.18,4.78c1.25-1.26,3.28-1.26,4.53,0l49.57,50.07c1.08,1.09,2.83,1.12,3.95,0.08l35.5-33.12\n                c1.81-1.69,4.76-0.41,4.77,2.06l0.33,87.3C196.85,116.28,192.73,120.42,187.63,120.42z"/>\n            </svg>':'<i class="slide-icon fas fa-star"></i>',` ${t}<span class="slide-text">${this.name} ${e}</span>`}}class l{static Get(e){if(Object.prototype.hasOwnProperty.call(this.fieldData,e))return this.fieldData[e]}static Set(e,t){this.fieldData[e]=t}}l.fieldData={};class d{}d.AlertFadeTime="AlertFadeTime",d.AlertDisplayTime="AlertDisplayTime",d.AlertSlideTime="AlertSlideTime",d.CheerAlertSound="CheerAlertSound",d.EventDisplayTime="EventDisplayTime",d.FollowAlertSound="FollowAlertSound",d.HostAlertSound="HostAlertSound",d.GiftedSubAlertSound="GiftedSubAlertSound",d.RaidAlertSound="RaidAlertSound",d.SubAlertSound="SubAlertSound",d.TipAlertSound="TipAlertSound";class c{static toMilliseconds(e){return 1e3*e}static toSeconds(e){return e/1e3}}class u{constructor(e){this.eventService=e,this.alertDisplayTime=l.Get(d.AlertDisplayTime),this.eventDisplayTime=l.Get(d.EventDisplayTime)}addEvents(...e){if(!e)throw new Error("Parameter 'events' cannot be null or undefined.");e.forEach((e=>this.eventService.registerEvent(e)))}beginCycle(){this.initializeCurrentSlide().then((e=>this.cycleContent(e)))}triggerAlert(e,n=!0){n&&this.addEvents(e);const r=this.getBar(),s=this.getCurrentSlide(),i=class{static createAlertSlide(e){const t=document.createElement("div");t.classList.add("slide-content"),t.innerHTML=e.html;const n=document.createElement("div");n.classList.add("slide"),n.appendChild(t);const r=this.lookupAlertCssClass(e);return n.classList.add(r),n}static lookupAlertCssClass(e){if(!e)throw new Error("Parameter 'event' cannot be null or undefined.");let n;switch(e.type){case t.Cheer:n=this.lookupCheerAlertCssClass(e.amount);break;case t.Follow:n="follow-alert";break;case t.GiftedSubscription:n="gifted-sub-alert";break;case t.Host:n="host-alert";break;case t.Raid:n="raid-alert";break;case t.Subscription:n=this.lookupSubAlertCssClass(e.tier)}return n}static lookupCheerAlertCssClass(e){if(e<=0)throw new Error("Parameter 'amount' cannot be less than or equal to 0.");return e<100?"cheer-alert-tier-1":e<1e3?"cheer-alert-tier-2":e<5e3?"cheer-alert-tier-3":e<1e4?"cheer-alert-tier-4":"cheer-alert-tier-5"}static lookupSubAlertCssClass(e){let t;switch(e){case"1000":case"2000":case"3000":t="sub-alert";break;case"prime":t="prime-sub-alert";break;default:t="sub-alert"}return t}}.createAlertSlide(e);this.placeSlideOffscreenBottom(i),r.appendChild(i),Promise.all([this.animateSlideUpOut(s),this.animateSlideUpIn(i)]).then((()=>r.removeChild(s))).then((()=>this.waitForAlertDisplay())).then((()=>this.markAlertAsRead(i))).then((()=>this.cycleContent(i)))}animateSlideUpIn(e){return this.requestBrowserAnimation(e),new Promise((t=>{const n=r=>{"transform"===r.propertyName&&(e.removeEventListener("transitionend",n),t())};e.addEventListener("transitionend",n),e.classList.remove("offscreen-bottom")}))}animateSlideUpOut(e){return new Promise((t=>{const n=r=>{"transform"===r.propertyName&&(e.removeEventListener("transitionend",n),t())};e.addEventListener("transitionend",n),e.classList.add("offscreen-top")}))}cycleContent(e){this.processSlideContent(e).then((()=>{e===this.getCurrentSlide()&&this.cycleContent(e)}))}getBar(){return document.querySelector(".bar")}getCurrentSlide(){const e=this.getBar();if(!e)throw new Error("Element with '.bar' class not found.");const t=e.children;if(!t||t.length<1)throw new Error("No children found in bar.");return t[0]}getSlideContent(e){return e.children[0]}hideContent(e){const t=this.getSlideContent(e);return new Promise((e=>{const n=r=>{"opacity"===r.propertyName&&(t.removeEventListener("transitionend",n),e())};t.addEventListener("transitionend",n),t.classList.add("hidden")}))}initializeCurrentSlide(){const e=this.getCurrentSlide(),t=this.eventService.getCurrentEvent();return this.populateSlide(e,t).then((()=>e))}markAlertAsRead(e){return new Promise((t=>{const n=r=>{"background-color"===r.propertyName&&(e.removeEventListener("transitionend",n),t())};e.addEventListener("transitionend",n),e.classList.value="slide"}))}placeSlideOffscreenBottom(e){e.classList.add("offscreen-bottom")}populateSlide(e,t){const n=this.getSlideContent(e);return new Promise((e=>{n.innerHTML=t.html,e()}))}processSlideContent(e){return this.waitForEventDisplay().then((()=>this.hideContent(e))).then((()=>this.populateSlide(e,this.eventService.getNextEvent()))).then((()=>this.revealContent(e)))}requestBrowserAnimation(e){e.offsetWidth}revealContent(e){const t=this.getSlideContent(e);return new Promise((e=>{const n=r=>{"opacity"===r.propertyName&&(t.removeEventListener("transitionend",n),e())};t.addEventListener("transitionend",n),t.classList.remove("hidden")}))}waitForAlertDisplay(){return new Promise((e=>{window.setTimeout((()=>e()),this.alertDisplayTime)}))}waitForEventDisplay(){return new Promise((e=>{window.setTimeout((()=>e()),this.eventDisplayTime)}))}}class h{constructor(){this.alertAudio=document.getElementById("alert-audio"),this.alertAudio.volume=.35}playAudio(e){return this.alertAudio.src=e,this.alertAudio.play()}}class m{constructor(){this.events=[],this.eventIndex=-1}getCurrentEvent(){if(this.events.length>0&&this.eventIndex>=0)return this.events[this.eventIndex];throw new Error("There are no events.")}getNextEvent(){if(this.events.length>0&&this.eventIndex>=0)return this.advanceEventIndex(),this.events[this.eventIndex];throw new Error("There are no events.")}registerEvent(e){if(!e)throw new Error("Parameter 'event' cannot be null or undefined.");const t=this.events.findIndex((t=>t.type===e.type));-1!==t?this.events.splice(t,1,e):this.events.push(e),1===this.events.length&&(this.eventIndex=0)}advanceEventIndex(){this.eventIndex<0||this.eventIndex+1===this.events.length?this.eventIndex=0:this.eventIndex+=1}}const v=new class{constructor(){this.skippableEvents=["bot:counter","event:test","event:skip","message"]}onEventReceived(e){if(this.canSkipEvent(e))return;let t,n=!0;"follower-latest"===e.listener?t=new s(e.event.name):"cheer-latest"===e.listener?t=new r(e.event.name,e.event.amount):"subscriber-latest"===e.listener?e.event.gifted&&e.event.isCommunityGift||(t=e.event.bulkGifted?new i(e.event.sender,e.event.amount):e.event.gifted?new i(e.event.sender):new o(e.event.name,e.event.amount,e.event.tier)):"host-latest"===e.listener||"raid-latest"===e.listener&&(t=new a(e.event.name,e.event.amount),n=!1),t?(this.bar.triggerAlert(t,n),this.audioService.playAudio(t.alertSound)):SE_API.resumeQueue()}onWidgetLoad(e){const t=e.session.data,n=e.fieldData;this.loadFieldData(n),this.audioService=new h,this.eventService=new m,this.bar=new u(this.eventService),this.loadInitialEvents(t),this.bar.beginCycle()}canSkipEvent(e){return this.skippableEvents.includes(e.listener)}loadFieldData(e){const t=e.cheerAlertSound,n=e.followAlertSound,r=e.subAlertSound,s=e.giftedSubAlertSound,i=e.raidAlertSound,a=e.hostAlertSound,o=c.toMilliseconds(e.eventDisplayTime),u=c.toMilliseconds(e.alertDisplayTime),h=c.toMilliseconds(e.alertSlideTime),m=c.toMilliseconds(e.alertFadeTime);l.Set(d.CheerAlertSound,t),l.Set(d.FollowAlertSound,n),l.Set(d.SubAlertSound,r),l.Set(d.GiftedSubAlertSound,s),l.Set(d.RaidAlertSound,i),l.Set(d.HostAlertSound,a),l.Set(d.EventDisplayTime,o),l.Set(d.AlertDisplayTime,u),l.Set(d.AlertSlideTime,h),l.Set(d.AlertFadeTime,m)}loadInitialEvents(e){const t=this.getLatestFollowEvent(e),n=this.getLatestSubEvent(e),r=this.getLatestCheerEvent(e);this.bar.addEvents(t,n,r)}getLatestCheerEvent(e){const t=e["cheer-latest"];return new r(t.name,t.amount)}getLatestFollowEvent(e){const t=e["follower-latest"];return new s(t.name)}getLatestSubEvent(e){const t=e["subscriber-latest"];let n;return n=t.gifted&&"gift"===t.amount?new o(t.name,t.count,t.tier):new o(t.name,t.amount,t.tier),n}};window.addEventListener("onEventReceived",(function(e){v.onEventReceived(e.detail)})),window.addEventListener("onWidgetLoad",(function(e){v.onWidgetLoad(e.detail)}))})();