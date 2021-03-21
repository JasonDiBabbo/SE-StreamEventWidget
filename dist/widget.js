(() => {
    'use strict';
    class e {
        constructor(e) {
            this.eventType = e;
        }
    }
    var t, r;
    ((r = t || (t = {}))[(r.Cheer = 0)] = 'Cheer'),
        (r[(r.Follow = 1)] = 'Follow'),
        (r[(r.GiftedSubscription = 2)] = 'GiftedSubscription'),
        (r[(r.Host = 3)] = 'Host'),
        (r[(r.Raid = 4)] = 'Raid'),
        (r[(r.Subscription = 5)] = 'Subscription');
    class n extends e {
        constructor(e, r) {
            if ((super(t.Cheer), (this.name = e), (this.amount = r), !e))
                throw new Error("Parameter 'name' cannot be null or empty.");
            if (r < 1) throw new Error("Parameter 'amount' cannot be less than 1.");
            this.html = this.generateHtml();
        }
        generateHtml() {
            const e = `X${this.amount.toString()}`;
            return `<svg class="slide-icon" viewBox="0 0 187.35 242.67">\n                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>\n                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>\n            </svg><span class="slide-text">${this.name} ${e}</span>`;
        }
    }
    class i extends e {
        constructor(e) {
            if ((super(t.Follow), (this.name = e), !e))
                throw new Error("Parameter 'name' cannot be null or empty.");
            this.html = this.generateHtml();
        }
        generateHtml() {
            return `<i class="slide-icon fas fa-heart"></i><span class="slide-text">${this.name}</span>`;
        }
    }
    class s extends e {
        constructor(e, r) {
            if ((super(t.GiftedSubscription), (this.name = e), (this.amount = r), !e))
                throw new Error("Parameter 'name' cannot be null or empty.");
            if (r < 1) throw new Error("Parameter 'amount' cannot be less than 1.");
            this.html = this.generateHtml();
        }
        generateHtml() {
            const e = `X${this.amount.toString()}`;
            return ` <i class="slide-icon fas fa-gift"></i><span class="slide-text">${this.name} ${e}</span>`;
        }
    }
    class l extends e {
        constructor(e, r) {
            if ((super(t.Subscription), (this.name = e), (this.amount = r), !e))
                throw new Error("Parameter 'name' cannot be null or empty.");
            if (r < 1) throw new Error("Parameter 'amount' cannot be less than 1.");
            this.html = this.generateHtml();
        }
        generateHtml() {
            const e = `X${this.amount.toString()}`;
            return ` <i class="slide-icon fas fa-star"></i><span class="slide-text">${this.name} ${e}</span>`;
        }
    }
    class o {
        static Get(e) {
            if (Object.prototype.hasOwnProperty.call(this.fieldData, e)) return this.fieldData[e];
        }
        static Set(e, t) {
            this.fieldData[e] = t;
        }
    }
    o.fieldData = {};
    class a {}
    (a.EventCycleDisplayTime = 'EventCycleDisplayTime'),
        (a.EventAlertSlideTime = 'EventAlertSlideTime'),
        (a.EventAlertFadeTime = 'EventAlertFadeTime'),
        (a.EventAlertDisplayTime = 'EventAlertDisplayTime'),
        (a.FollowAlertColor = 'FollowAlertColor'),
        (a.SubAlertColor = 'SubAlertColor'),
        (a.GiftedSubAlertColor = 'GiftedSubAlertColor'),
        (a.TierOneCheerAlertColor = 'TierOneCheerAlertColor'),
        (a.TierTwoCheerAlertColor = 'TierTwoCheerAlertColor'),
        (a.TierThreeCheerAlertColor = 'TierThreeCheerAlertColor'),
        (a.TierFourCheerAlertColor = 'TierFourCheerAlertColor'),
        (a.TierFiveCheerAlertColor = 'TierFiveCheerAlertColor'),
        (a.HostAlertColor = 'HostAlertColor'),
        (a.RaidAlertColor = 'RaidAlertColor');
    class h {
        static toMilliseconds(e) {
            return 1e3 * e;
        }
        static toSeconds(e) {
            return e / 1e3;
        }
    }
    class c {
        static toPromise(e, t, r) {
            return e && t && r
                ? e.style[t] === r
                    ? Promise.resolve()
                    : new Promise((n) => {
                          const i = (r) => {
                              r.propertyName === t &&
                                  (e.removeEventListener('transitionend', i), n());
                          };
                          e.addEventListener('transitionend', i), (e.style[t] = r);
                      })
                : Promise.reject();
        }
    }
    class d {
        constructor(e) {
            (this.eventService = e), (this.eventDisplayTime = o.Get(a.EventCycleDisplayTime));
        }
        addEvents(...e) {
            if (!e) throw new Error("Parameter 'events' cannot be null or undefined.");
            e.forEach((e) => this.eventService.registerEvent(e));
        }
        beginCycle() {
            this.initializeCurrentSlide().then((e) => this.cycleContent(e));
        }
        triggerAlert(e, t = !0) {
            throw (t && this.addEvents(e), new Error('Method not implemented.'));
        }
        cycleContent(e) {
            this.processSlideContent(e).then(() => {
                e === this.getCurrentSlide() && this.cycleContent(e);
            });
        }
        getCurrentSlide() {
            const e = document.querySelector('.bar');
            if (!e) throw new Error("Element with '.bar' class not found.");
            const t = e.children;
            if (!t || t.length < 1) throw new Error('No children found in bar.');
            return t[0];
        }
        getSlideContent(e) {
            return e.children[0];
        }
        hideContent(e) {
            const t = this.getSlideContent(e);
            return new Promise((e) => {
                const r = (n) => {
                    'opacity' === n.propertyName &&
                        (t.removeEventListener('transitionend', r), e());
                };
                t.addEventListener('transitionend', r), t.classList.add('hidden');
            });
        }
        initializeCurrentSlide() {
            const e = this.getCurrentSlide(),
                t = this.eventService.getCurrentEvent();
            return this.populateSlide(e, t).then(() => e);
        }
        populateSlide(e, t) {
            const r = this.getSlideContent(e);
            return new Promise((e) => {
                (r.innerHTML = t.html), e();
            });
        }
        processSlideContent(e) {
            return this.waitForEventDisplayTime()
                .then(() => this.hideContent(e))
                .then(() => this.populateSlide(e, this.eventService.getNextEvent()))
                .then(() => this.revealContent(e));
        }
        revealContent(e) {
            const t = this.getSlideContent(e);
            return new Promise((e) => {
                const r = (n) => {
                    'opacity' === n.propertyName &&
                        (t.removeEventListener('transitionend', r), e());
                };
                t.addEventListener('transitionend', r), t.classList.remove('hidden');
            });
        }
        waitForEventDisplayTime() {
            return new Promise((e) => {
                window.setTimeout(() => e(), this.eventDisplayTime);
            });
        }
    }
    class v {
        get bar() {
            return document.querySelector('.bar');
        }
        get currentSlide() {
            return this.slides[0];
        }
        get slides() {
            return this.bar.children;
        }
        addSlide(e) {
            this.bar.appendChild(e);
        }
        animateSlideDownOut(e, t = !1) {
            t && this.requestBrowserAnimation(e), e.classList.add('offscreen-bottom');
        }
        animateSlideUpIn(e, t = !1) {
            t && this.requestBrowserAnimation(e), e.classList.remove('offscreen-bottom');
        }
        animateSlideUpOut(e, t = !1) {
            t && this.requestBrowserAnimation(e), e.classList.add('offscreen-top');
        }
        createEventAlertSlide(e) {
            const r = document.createElement('div');
            r.classList.add('bar-content'), (r.innerHTML = e.html);
            const n = document.createElement('div');
            switch ((n.classList.add('slide'), n.appendChild(r), e.eventType)) {
                case t.Cheer:
                    n.classList.add(this.getCheerEventAlertCSS(e));
                    break;
                case t.Follow:
                    n.classList.add('follow-event-alert');
                    break;
                case t.Subscription:
                    n.classList.add('sub-event-alert');
                    break;
                case t.GiftedSubscription:
                    n.classList.add('gifted-sub-event-alert');
                    break;
                case t.Host:
                    n.classList.add('host-event-alert');
                    break;
                case t.Raid:
                    n.classList.add('raid-event-alert');
            }
            return n;
        }
        resetSlideStyles(e) {
            e.classList.value = 'slide';
        }
        getCheerEventAlertCSS(e) {
            return e.amount < 1
                ? null
                : e.amount < 100
                ? 'cheer-event-alert-tier-1'
                : e.amount < 1e3
                ? 'cheer-event-alert-tier-2'
                : e.amount < 5e3
                ? 'cheer-event-alert-tier-3'
                : e.amount < 1e4
                ? 'cheer-event-alert-tier-4'
                : 'cheer-event-alert-tier-5';
        }
        requestBrowserAnimation(e) {
            e.offsetWidth;
        }
    }
    class u {
        constructor() {
            (this.timeEventAlertDisplay = o.Get(a.EventAlertDisplayTime)),
                (this.timeEventDisplay = o.Get(a.EventCycleDisplayTime)),
                (this.timeEventAlertSlide = o.Get(a.EventAlertSlideTime)),
                (this.timeEventAlertFade = o.Get(a.EventAlertFadeTime)),
                (this.bar = new v());
        }
        get currentEvent() {
            const e = this.events[this.currentEventIndex];
            if (!e) throw new Error('');
            return e;
        }
        get nextEvent() {
            this.currentEventIndex = this.calculateNextEventIndex();
            const e = this.events[this.currentEventIndex];
            if (!e) throw new Error('');
            return e;
        }
        displayEvents() {
            const e = this.bar.currentSlide,
                t = e.children[0];
            e.addEventListener('transitionend', (e) => {
                'opacity' === e.propertyName &&
                    ('1' === t.style.opacity
                        ? setTimeout(() => this.hideElement(t), this.timeEventDisplay)
                        : ((t.innerHTML = this.nextEvent.html), this.revealElement(t)));
            }),
                t.innerHTML.trim() || (t.innerHTML = this.currentEvent.html),
                window.setTimeout(() => this.hideElement(t), this.timeEventDisplay);
        }
        handleEventAlert(e, t = !0) {
            clearTimeout(this.currentEventAlertTimeout), t && this.registerEvent(e);
            const r = this.bar.createEventAlertSlide(e);
            this.bar.animateSlideDownOut(r),
                this.bar.addSlide(r),
                this.bar.animateSlideUpOut(this.bar.currentSlide),
                this.bar.animateSlideUpIn(r, !0),
                (this.currentEventAlertTimeout = window.setTimeout(() => {
                    const e = this.bar.slides;
                    for (let t = 0; t < e.length - 1; t++) e[t].remove();
                    this.currentEventAlertTimeout = window.setTimeout(() => {
                        this.bar.resetSlideStyles(r),
                            (this.currentEventAlertTimeout = window.setTimeout(() => {
                                this.displayEvents();
                            }, this.timeEventAlertFade));
                    }, this.timeEventAlertDisplay);
                }, this.timeEventAlertSlide));
        }
        registerEvent(e) {
            if (!e) return;
            const t = this.events.findIndex((t) => t.eventType === e.eventType);
            if (-1 === t) this.currentEventIndex = this.events.push(e) - 1;
            else {
                let r;
                t > this.currentEventIndex
                    ? (this.events.splice(t, 1),
                      (r =
                          this.currentEventIndex === this.events.length - 1
                              ? 0
                              : this.currentEventIndex + 1),
                      this.events.splice(r, 0, e))
                    : t < this.currentEventIndex
                    ? (this.events.splice(t, 1),
                      (r =
                          this.currentEventIndex - 1 == 0
                              ? this.events.length - 1
                              : this.currentEventIndex - 2),
                      this.events.splice(r, 0, e))
                    : (this.events.splice(t, 1, e), (r = t)),
                    (this.currentEventIndex = r);
            }
        }
        registerEvents(e) {
            e && e.forEach((e) => this.registerEvent(e));
        }
        calculateNextEventIndex() {
            return this.currentEventIndex === this.events.length - 1
                ? 0
                : this.currentEventIndex + 1;
        }
        hideElement(e) {
            e && (e.style.opacity = '0');
        }
        revealElement(e) {
            e && (e.style.opacity = '1');
        }
        beginEventCycle() {
            const e = this.bar.currentSlide.children[0];
            !!e.innerHTML || (e.innerHTML = this.currentEvent.html), this.cycleEvent();
        }
        cycleEvent() {
            const e = this.bar.currentSlide,
                t = e.children[0];
            this.displayEvent(t)
                .then(() => {
                    e === this.bar.currentSlide && this.cycleEvent();
                })
                .catch(() => {
                    console.log('Swallowing caught rejection');
                });
        }
        displayEvent(e) {
            return new Promise((t, r) => {
                window.setTimeout(() => {
                    this.hideElementAux(e)
                        .then(() => ((e.innerHTML = this.nextEvent.html), this.revealElementAux(e)))
                        .then(() => {
                            t();
                        })
                        .catch((e) => {
                            r(e);
                        });
                }, this.timeEventDisplay);
            });
        }
        revealElementAux(e) {
            return c.toPromise(e, 'opacity', '1');
        }
        hideElementAux(e) {
            return c.toPromise(e, 'opacity', '0');
        }
    }
    u.SInit =
        ((u.prototype.timeEventAlertDisplay = 2e3),
        (u.prototype.timeEventDisplay = 1e4),
        (u.prototype.timeEventAlertSlide = 750),
        (u.prototype.timeEventAlertFade = 2e3),
        (u.prototype.currentEventIndex = -1),
        void (u.prototype.events = []));
    class m {
        constructor() {
            (this.events = []), (this.eventIndex = -1);
        }
        getCurrentEvent() {
            if (this.events.length > 0 && this.eventIndex >= 0) return this.events[this.eventIndex];
            throw new Error('There are no events.');
        }
        getNextEvent() {
            if (this.events.length > 0 && this.eventIndex >= 0)
                return this.advanceEventIndex(), this.events[this.eventIndex];
            throw new Error('There are no events.');
        }
        registerEvent(e) {
            if (!e) throw new Error("Parameter 'event' cannot be null or undefined.");
            const t = this.events.findIndex((t) => t.eventType === e.eventType);
            -1 !== t && this.events.splice(t, 1),
                this.events.push(e),
                1 === this.events.length && (this.eventIndex = 0);
        }
        advanceEventIndex() {
            this.eventIndex < 0 || this.eventIndex + 1 === this.events.length
                ? (this.eventIndex = 0)
                : (this.eventIndex += 1);
        }
    }
    window.addEventListener('onWidgetLoad', function (e) {
        const t = e.detail.session.data,
            r = e.detail.fieldData,
            c = h.toMilliseconds(r.eventCycleDisplayTime),
            v = h.toMilliseconds(r.eventAlertDisplayTime),
            u = h.toMilliseconds(r.eventAlertSlideTime),
            E = h.toMilliseconds(r.eventAlertFadeTime);
        o.Set(a.EventCycleDisplayTime, c),
            o.Set(a.EventAlertDisplayTime, v),
            o.Set(a.EventAlertSlideTime, u),
            o.Set(a.EventAlertFadeTime, E),
            o.Set(a.FollowAlertColor, r.followAlertColor),
            o.Set(a.SubAlertColor, r.subAlertColor),
            o.Set(a.GiftedSubAlertColor, r.giftedSubAlertColor),
            o.Set(a.TierOneCheerAlertColor, r.tierOneCheerAlertColor),
            o.Set(a.TierTwoCheerAlertColor, r.tierTwoCheerAlertColor),
            o.Set(a.TierThreeCheerAlertColor, r.tierThreeCheerAlertColor),
            o.Set(a.TierFourCheerAlertColor, r.tierFourCheerAlertColor),
            o.Set(a.TierFiveCheerAlertColor, r.tierFiveCheerAlertColor),
            o.Set(a.HostAlertColor, r.hostAlertColor),
            o.Set(a.RaidAlertColor, r.raidAlertColor);
        const p = t['follower-latest'],
            C = t['subscriber-latest'],
            S = t['subscriber-gifted-latest'],
            w = t['cheer-latest'],
            A = new i(p.name),
            y = new l(C.name, C.amount),
            T = new s(S.sender, S.amount),
            b = new n(w.name, w.amount),
            f = [];
        f.push(A), f.push(y), f.push(T), f.push(b);
        const g = new m(),
            x = new d(g);
        x.addEvents(...f), x.beginCycle();
    });
})();
