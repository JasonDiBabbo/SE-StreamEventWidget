(() => {
    'use strict';
    var e;
    !(function (e) {
        (e[(e.Cheer = 0)] = 'Cheer'),
            (e[(e.Follow = 1)] = 'Follow'),
            (e[(e.GiftedSubscription = 2)] = 'GiftedSubscription'),
            (e[(e.Host = 3)] = 'Host'),
            (e[(e.Raid = 4)] = 'Raid'),
            (e[(e.Subscription = 5)] = 'Subscription');
    })(e || (e = {}));
    class t {
        constructor(e) {
            this.eventType = e;
        }
        static lookupIconCSS(t) {
            let n = '';
            switch (t) {
                case e.Follow:
                    n = 'fas fa-heart';
                    break;
                case e.Subscription:
                    n = 'fas fa-star';
                    break;
                case e.GiftedSubscription:
                    n = 'fas fa-gift';
                    break;
                case e.Host:
                    n = 'fas fa-desktop';
                    break;
                case e.Raid:
                    n = 'fas fa-users';
            }
            return n;
        }
    }
    class n extends t {
        constructor(t, n) {
            super(e.Cheer),
                (this.name = t || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const e = this.getCheerAmountString();
            return e
                ? `<svg class="slide-icon" viewBox="0 0 187.35 242.67">\n                    <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>\n                    <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>\n                </svg><span class="slide-text">${this.name} ${e}</span>`
                : null;
        }
        getCheerAmountString() {
            return 'number' == typeof this.amount && this.amount > 0
                ? `X${this.amount.toString()}`
                : '';
        }
    }
    n.SInit = ((n.prototype.name = null), (n.prototype.amount = 0), void (n.prototype.html = null));
    class i extends t {
        constructor(t) {
            super(e.Follow), (this.name = t || this.name), (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name;
        }
        getHTML() {
            const e = t.lookupIconCSS(this.eventType);
            return e && this.name
                ? `<i class="slide-icon ${e}"></i><span class="slide-text">${this.name}</span>`
                : null;
        }
    }
    i.SInit = ((i.prototype.name = null), void (i.prototype.html = null));
    class r extends t {
        constructor(t, n) {
            super(e.GiftedSubscription),
                (this.name = t || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name;
        }
        getHTML() {
            const e = t.lookupIconCSS(this.eventType),
                n = this.getGiftedSubCountString();
            return e && this.name
                ? ` <i class="slide-icon ${e}"></i><span class="slide-text">${this.name} ${n}</span>`
                : null;
        }
        getGiftedSubCountString() {
            return this.amount && this.amount > 1 ? `X${this.amount.toString()}` : '';
        }
    }
    r.SInit = ((r.prototype.name = null), (r.prototype.amount = 0), void (r.prototype.html = null));
    class s extends t {
        constructor(t, n) {
            super(e.Host),
                (this.name = t || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const e = t.lookupIconCSS(this.eventType),
                n = this.getHostAmountString();
            return e && this.name
                ? ` <i class="slide-icon ${e}"></i><span class="slide-text">${this.name} ${n}</span>`
                : null;
        }
        getHostAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    s.SInit = ((s.prototype.name = null), (s.prototype.amount = 0), void (s.prototype.html = null));
    class o extends t {
        constructor(t, n) {
            super(e.Raid),
                (this.name = t || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const e = t.lookupIconCSS(this.eventType),
                n = this.getRaidAmountString();
            return e && this.name
                ? ` <i class="slide-icon ${e}"></i><span class="slide-text">${this.name} ${n}</span>`
                : null;
        }
        getRaidAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    o.SInit = ((o.prototype.name = null), (o.prototype.amount = 0), void (o.prototype.html = null));
    class l extends t {
        constructor(t, n) {
            super(e.Subscription),
                (this.name = t || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const e = t.lookupIconCSS(this.eventType),
                n = this.getSubAmountString();
            return e && this.name
                ? ` <i class="slide-icon ${e}"></i><span class="slide-text">${this.name} ${n}</span>`
                : null;
        }
        getSubAmountString() {
            return this.amount && this.amount > 1 ? `X${this.amount.toString()}` : '';
        }
    }
    l.SInit = ((l.prototype.name = null), (l.prototype.amount = 0), void (l.prototype.html = null));
    class a {
        static Get(e) {
            if (Object.prototype.hasOwnProperty.call(this.fieldData, e)) return this.fieldData[e];
        }
        static Set(e, t) {
            this.fieldData[e] = t;
        }
    }
    a.fieldData = {};
    class h {}
    (h.EventCycleDisplayTime = 'EventCycleDisplayTime'),
        (h.EventAlertSlideTime = 'EventAlertSlideTime'),
        (h.EventAlertFadeTime = 'EventAlertFadeTime'),
        (h.EventAlertDisplayTime = 'EventAlertDisplayTime'),
        (h.FollowAlertColor = 'FollowAlertColor'),
        (h.SubAlertColor = 'SubAlertColor'),
        (h.GiftedSubAlertColor = 'GiftedSubAlertColor'),
        (h.TierOneCheerAlertColor = 'TierOneCheerAlertColor'),
        (h.TierTwoCheerAlertColor = 'TierTwoCheerAlertColor'),
        (h.TierThreeCheerAlertColor = 'TierThreeCheerAlertColor'),
        (h.TierFourCheerAlertColor = 'TierFourCheerAlertColor'),
        (h.TierFiveCheerAlertColor = 'TierFiveCheerAlertColor'),
        (h.HostAlertColor = 'HostAlertColor'),
        (h.RaidAlertColor = 'RaidAlertColor');
    class d {
        static toMilliseconds(e) {
            return 1e3 * e;
        }
        static toSeconds(e) {
            return e / 1e3;
        }
    }
    class u {
        static toPromise(e, t, n) {
            return e && t && n
                ? e.style[t] === n
                    ? Promise.resolve()
                    : new Promise((i) => {
                          const r = (n) => {
                              n.propertyName === t &&
                                  (e.removeEventListener('transitionend', r), i());
                          };
                          e.addEventListener('transitionend', r), (e.style[t] = n);
                      })
                : Promise.reject();
        }
    }
    class c {
        constructor(e) {
            (this.eventService = e), (this.eventDisplayTime = a.Get(h.EventCycleDisplayTime));
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
                const n = (i) => {
                    'opacity' === i.propertyName &&
                        (t.removeEventListener('transitionend', n), e());
                };
                t.addEventListener('transitionend', n), t.classList.add('hidden');
            });
        }
        initializeCurrentSlide() {
            const e = this.getCurrentSlide(),
                t = this.eventService.getCurrentEvent();
            return this.populateSlide(e, t).then(() => e);
        }
        populateSlide(e, t) {
            const n = this.getSlideContent(e);
            return new Promise((e) => {
                (n.innerHTML = t.html), e();
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
                const n = (i) => {
                    'opacity' === i.propertyName &&
                        (t.removeEventListener('transitionend', n), e());
                };
                t.addEventListener('transitionend', n), t.classList.remove('hidden');
            });
        }
        waitForEventDisplayTime() {
            return new Promise((e) => {
                window.setTimeout(() => e(), this.eventDisplayTime);
            });
        }
    }
    class m {
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
        createEventAlertSlide(t) {
            const n = document.createElement('div');
            n.classList.add('bar-content'), (n.innerHTML = t.html);
            const i = document.createElement('div');
            switch ((i.classList.add('slide'), i.appendChild(n), t.eventType)) {
                case e.Cheer:
                    i.classList.add(this.getCheerEventAlertCSS(t));
                    break;
                case e.Follow:
                    i.classList.add('follow-event-alert');
                    break;
                case e.Subscription:
                    i.classList.add('sub-event-alert');
                    break;
                case e.GiftedSubscription:
                    i.classList.add('gifted-sub-event-alert');
                    break;
                case e.Host:
                    i.classList.add('host-event-alert');
                    break;
                case e.Raid:
                    i.classList.add('raid-event-alert');
            }
            return i;
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
    class v {
        constructor() {
            (this.timeEventAlertDisplay = a.Get(h.EventAlertDisplayTime)),
                (this.timeEventDisplay = a.Get(h.EventCycleDisplayTime)),
                (this.timeEventAlertSlide = a.Get(h.EventAlertSlideTime)),
                (this.timeEventAlertFade = a.Get(h.EventAlertFadeTime)),
                (this.bar = new m());
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
            if (!e.isValid) return;
            clearTimeout(this.currentEventAlertTimeout), t && this.registerEvent(e);
            const n = this.bar.createEventAlertSlide(e);
            this.bar.animateSlideDownOut(n),
                this.bar.addSlide(n),
                this.bar.animateSlideUpOut(this.bar.currentSlide),
                this.bar.animateSlideUpIn(n, !0),
                (this.currentEventAlertTimeout = window.setTimeout(() => {
                    const e = this.bar.slides;
                    for (let t = 0; t < e.length - 1; t++) e[t].remove();
                    this.currentEventAlertTimeout = window.setTimeout(() => {
                        this.bar.resetSlideStyles(n),
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
                let n;
                t > this.currentEventIndex
                    ? (this.events.splice(t, 1),
                      (n =
                          this.currentEventIndex === this.events.length - 1
                              ? 0
                              : this.currentEventIndex + 1),
                      this.events.splice(n, 0, e))
                    : t < this.currentEventIndex
                    ? (this.events.splice(t, 1),
                      (n =
                          this.currentEventIndex - 1 == 0
                              ? this.events.length - 1
                              : this.currentEventIndex - 2),
                      this.events.splice(n, 0, e))
                    : (this.events.splice(t, 1, e), (n = t)),
                    (this.currentEventIndex = n);
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
            return new Promise((t, n) => {
                window.setTimeout(() => {
                    this.hideElementAux(e)
                        .then(() => ((e.innerHTML = this.nextEvent.html), this.revealElementAux(e)))
                        .then(() => {
                            t();
                        })
                        .catch((e) => {
                            n(e);
                        });
                }, this.timeEventDisplay);
            });
        }
        revealElementAux(e) {
            return u.toPromise(e, 'opacity', '1');
        }
        hideElementAux(e) {
            return u.toPromise(e, 'opacity', '0');
        }
    }
    v.SInit =
        ((v.prototype.timeEventAlertDisplay = 2e3),
        (v.prototype.timeEventDisplay = 1e4),
        (v.prototype.timeEventAlertSlide = 750),
        (v.prototype.timeEventAlertFade = 2e3),
        (v.prototype.currentEventIndex = -1),
        void (v.prototype.events = []));
    class p {
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
            s = e.detail.fieldData,
            o = d.toMilliseconds(s.eventCycleDisplayTime),
            u = d.toMilliseconds(s.eventAlertDisplayTime),
            m = d.toMilliseconds(s.eventAlertSlideTime),
            v = d.toMilliseconds(s.eventAlertFadeTime);
        a.Set(h.EventCycleDisplayTime, o),
            a.Set(h.EventAlertDisplayTime, u),
            a.Set(h.EventAlertSlideTime, m),
            a.Set(h.EventAlertFadeTime, v),
            a.Set(h.FollowAlertColor, s.followAlertColor),
            a.Set(h.SubAlertColor, s.subAlertColor),
            a.Set(h.GiftedSubAlertColor, s.giftedSubAlertColor),
            a.Set(h.TierOneCheerAlertColor, s.tierOneCheerAlertColor),
            a.Set(h.TierTwoCheerAlertColor, s.tierTwoCheerAlertColor),
            a.Set(h.TierThreeCheerAlertColor, s.tierThreeCheerAlertColor),
            a.Set(h.TierFourCheerAlertColor, s.tierFourCheerAlertColor),
            a.Set(h.TierFiveCheerAlertColor, s.tierFiveCheerAlertColor),
            a.Set(h.HostAlertColor, s.hostAlertColor),
            a.Set(h.RaidAlertColor, s.raidAlertColor);
        const S = t['follower-latest'],
            E = t['subscriber-latest'],
            C = t['subscriber-gifted-latest'],
            y = t['cheer-latest'],
            T = new i(S.name),
            A = new l(E.name, E.amount),
            g = new r(C.sender, C.amount),
            w = new n(y.name, y.amount),
            b = [];
        T.isValid && b.push(T),
            A.isValid && b.push(A),
            g.isValid && b.push(g),
            w.isValid && b.push(w);
        const f = new p(),
            x = new c(f);
        x.addEvents(...b), x.beginCycle();
    });
})();
