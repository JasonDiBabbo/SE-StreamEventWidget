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
                ? `<svg class="bar-icon" viewBox="0 0 187.35 242.67">\n                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>\n                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>\n             </svg><span class="bar-text">${this.name} ${e}</span>`
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
                ? `<i class="bar-icon ${e}"></i><span class="bar-text">${this.name}</span>`
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
                ? ` <i class="bar-icon ${e}"></i><span class="bar-text">${this.name} ${n}</span>`
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
                ? ` <i class="bar-icon ${e}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getHostAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    s.SInit = ((s.prototype.name = null), (s.prototype.amount = 0), void (s.prototype.html = null));
    class l extends t {
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
                ? ` <i class="bar-icon ${e}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getRaidAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    l.SInit = ((l.prototype.name = null), (l.prototype.amount = 0), void (l.prototype.html = null));
    class o extends t {
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
                ? ` <i class="bar-icon ${e}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getSubAmountString() {
            return this.amount && this.amount > 1 ? `X${this.amount.toString()}` : '';
        }
    }
    o.SInit = ((o.prototype.name = null), (o.prototype.amount = 0), void (o.prototype.html = null));
    class a {
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
    class h {
        static Get(e) {
            if (Object.prototype.hasOwnProperty.call(this.fieldData, e)) return this.fieldData[e];
        }
        static Set(e, t) {
            this.fieldData[e] = t;
        }
    }
    h.fieldData = {};
    class u {}
    (u.EventCycleDisplayTime = 'EventCycleDisplayTime'),
        (u.EventAlertSlideTime = 'EventAlertSlideTime'),
        (u.EventAlertFadeTime = 'EventAlertFadeTime'),
        (u.EventAlertDisplayTime = 'EventAlertDisplayTime'),
        (u.FollowAlertColor = 'FollowAlertColor'),
        (u.SubAlertColor = 'SubAlertColor'),
        (u.GiftedSubAlertColor = 'GiftedSubAlertColor'),
        (u.TierOneCheerAlertColor = 'TierOneCheerAlertColor'),
        (u.TierTwoCheerAlertColor = 'TierTwoCheerAlertColor'),
        (u.TierThreeCheerAlertColor = 'TierThreeCheerAlertColor'),
        (u.TierFourCheerAlertColor = 'TierFourCheerAlertColor'),
        (u.TierFiveCheerAlertColor = 'TierFiveCheerAlertColor'),
        (u.HostAlertColor = 'HostAlertColor'),
        (u.RaidAlertColor = 'RaidAlertColor');
    class c {
        static toMilliseconds(e) {
            return 1e3 * e;
        }
        static toSeconds(e) {
            return e / 1e3;
        }
    }
    class m {
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
    class d {
        constructor() {
            (this.timeEventAlertDisplay = h.Get(u.EventAlertDisplayTime)),
                (this.timeEventDisplay = h.Get(u.EventCycleDisplayTime)),
                (this.timeEventAlertSlide = h.Get(u.EventAlertSlideTime)),
                (this.timeEventAlertFade = h.Get(u.EventAlertFadeTime)),
                (this.bar = new a());
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
            return m.toPromise(e, 'opacity', '1');
        }
        hideElementAux(e) {
            return m.toPromise(e, 'opacity', '0');
        }
    }
    d.SInit =
        ((d.prototype.timeEventAlertDisplay = 2e3),
        (d.prototype.timeEventDisplay = 1e4),
        (d.prototype.timeEventAlertSlide = 750),
        (d.prototype.timeEventAlertFade = 2e3),
        (d.prototype.currentEventIndex = -1),
        void (d.prototype.events = []));
    const v = ['bot:counter', 'event:test', 'event:skip', 'message'];
    let p;
    window.addEventListener('onEventReceived', function (e) {
        if (
            ((e) => {
                try {
                    const t = e.detail.listener;
                    return v.includes(t);
                } catch {
                    return !1;
                }
            })(e)
        )
            return;
        const t = e.detail.listener,
            a = e.detail.event;
        -1 === v.indexOf(t) &&
            ('follower-latest' === t
                ? p.handleEventAlert(new i(a.name))
                : 'cheer-latest' === t
                ? p.handleEventAlert(new n(a.name, a.amount))
                : 'subscriber-latest' === t
                ? a.gifted && a.isCommunityGift
                    ? SE_API.resumeQueue()
                    : a.bulkGifted
                    ? p.handleEventAlert(new r(a.sender, a.amount))
                    : a.gifted
                    ? p.handleEventAlert(new r(a.sender))
                    : p.handleEventAlert(new o(a.name, a.amount))
                : 'host-latest' === t
                ? p.handleEventAlert(new s(a.name, a.amount), !1)
                : 'raid-latest' === t
                ? p.handleEventAlert(new l(a.name, a.amount), !1)
                : SE_API.resumeQueue());
    }),
        window.addEventListener('onWidgetLoad', function (e) {
            const t = e.detail.session.data,
                s = e.detail.fieldData,
                l = c.toMilliseconds(s.eventCycleDisplayTime),
                a = c.toMilliseconds(s.eventAlertDisplayTime),
                m = c.toMilliseconds(s.eventAlertSlideTime),
                v = c.toMilliseconds(s.eventAlertFadeTime);
            h.Set(u.EventCycleDisplayTime, l),
                h.Set(u.EventAlertDisplayTime, a),
                h.Set(u.EventAlertSlideTime, m),
                h.Set(u.EventAlertFadeTime, v),
                h.Set(u.FollowAlertColor, s.followAlertColor),
                h.Set(u.SubAlertColor, s.subAlertColor),
                h.Set(u.GiftedSubAlertColor, s.giftedSubAlertColor),
                h.Set(u.TierOneCheerAlertColor, s.tierOneCheerAlertColor),
                h.Set(u.TierTwoCheerAlertColor, s.tierTwoCheerAlertColor),
                h.Set(u.TierThreeCheerAlertColor, s.tierThreeCheerAlertColor),
                h.Set(u.TierFourCheerAlertColor, s.tierFourCheerAlertColor),
                h.Set(u.TierFiveCheerAlertColor, s.tierFiveCheerAlertColor),
                h.Set(u.HostAlertColor, s.hostAlertColor),
                h.Set(u.RaidAlertColor, s.raidAlertColor);
            const S = t['follower-latest'],
                E = t['subscriber-latest'],
                A = t['subscriber-gifted-latest'],
                C = t['cheer-latest'],
                y = new i(S.name),
                T = new o(E.name, E.amount),
                b = new r(A.sender, A.amount),
                g = new n(C.name, C.amount),
                f = [];
            y.isValid && f.push(y),
                T.isValid && f.push(T),
                b.isValid && f.push(b),
                g.isValid && f.push(g),
                (p = new d()),
                p.registerEvents(f),
                p.displayEvents();
        });
})();
