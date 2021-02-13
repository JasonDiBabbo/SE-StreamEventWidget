(() => {
    'use strict';
    var t;
    !(function (t) {
        (t[(t.Cheer = 0)] = 'Cheer'),
            (t[(t.Follow = 1)] = 'Follow'),
            (t[(t.GiftedSubscription = 2)] = 'GiftedSubscription'),
            (t[(t.Host = 3)] = 'Host'),
            (t[(t.Raid = 4)] = 'Raid'),
            (t[(t.Subscription = 5)] = 'Subscription');
    })(t || (t = {}));
    class e {
        constructor(t) {
            this.eventType = t;
        }
        static lookupIconCSS(e) {
            let n = '';
            switch (e) {
                case t.Follow:
                    n = 'fas fa-heart';
                    break;
                case t.Subscription:
                    n = 'fas fa-star';
                    break;
                case t.GiftedSubscription:
                    n = 'fas fa-gift';
                    break;
                case t.Host:
                    n = 'fas fa-desktop';
                    break;
                case t.Raid:
                    n = 'fas fa-users';
            }
            return n;
        }
    }
    class n extends e {
        constructor(e, n) {
            super(t.Cheer),
                (this.name = e || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const t = this.getCheerAmountString();
            return t
                ? `<svg class="bar-icon" viewBox="0 0 187.35 242.67">\n                <path d="M221.2,159.15l-82.46-29.27a6.63,6.63,0,0,0-4.48,0L51.8,159.15a6.7,6.7,0,0,1-7.83-10l86.95-131a6.7,6.7,0,0,1,11.16,0l86.95,131A6.7,6.7,0,0,1,221.2,159.15Z" transform="translate(-42.83 -15.17)"/>\n                <path d="M220.25,195.51l-80.09,61.24a6.7,6.7,0,0,1-7.32,0L52.75,195.51a6.69,6.69,0,0,1,1.42-11.92l80.09-28.44a6.75,6.75,0,0,1,4.48,0l80.09,28.44A6.69,6.69,0,0,1,220.25,195.51Z" transform="translate(-42.83 -15.17)"/>\n             </svg><span class="bar-text">${this.name} ${t}</span>`
                : null;
        }
        getCheerAmountString() {
            return 'number' == typeof this.amount && this.amount > 0
                ? `X${this.amount.toString()}`
                : '';
        }
    }
    n.SInit = ((n.prototype.name = null), (n.prototype.amount = 0), void (n.prototype.html = null));
    class s extends e {
        constructor(e) {
            super(t.Follow), (this.name = e || this.name), (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name;
        }
        getHTML() {
            const t = e.lookupIconCSS(this.eventType);
            return t && this.name
                ? `<i class="bar-icon ${t}"></i><span class="bar-text">${this.name}</span>`
                : null;
        }
    }
    s.SInit = ((s.prototype.name = null), void (s.prototype.html = null));
    class i extends e {
        constructor(e, n) {
            super(t.GiftedSubscription),
                (this.name = e || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name;
        }
        getHTML() {
            const t = e.lookupIconCSS(this.eventType),
                n = this.getGiftedSubCountString();
            return t && this.name
                ? ` <i class="bar-icon ${t}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getGiftedSubCountString() {
            return this.amount && this.amount > 1 ? `X${this.amount.toString()}` : '';
        }
    }
    i.SInit = ((i.prototype.name = null), (i.prototype.amount = 0), void (i.prototype.html = null));
    class r extends e {
        constructor(e, n) {
            super(t.Host),
                (this.name = e || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const t = e.lookupIconCSS(this.eventType),
                n = this.getHostAmountString();
            return t && this.name
                ? ` <i class="bar-icon ${t}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getHostAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    r.SInit = ((r.prototype.name = null), (r.prototype.amount = 0), void (r.prototype.html = null));
    class a extends e {
        constructor(e, n) {
            super(t.Raid),
                (this.name = e || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const t = e.lookupIconCSS(this.eventType),
                n = this.getRaidAmountString();
            return t && this.name
                ? ` <i class="bar-icon ${t}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getRaidAmountString() {
            return this.amount && this.amount > 0 ? `X${this.amount.toString()}` : '';
        }
    }
    a.SInit = ((a.prototype.name = null), (a.prototype.amount = 0), void (a.prototype.html = null));
    class l extends e {
        constructor(e, n) {
            super(t.Subscription),
                (this.name = e || this.name),
                (this.amount = n && n > 0 ? n : this.amount),
                (this.html = this.getHTML());
        }
        get isValid() {
            return !!this.html && !!this.name && !!this.amount && this.amount > 0;
        }
        getHTML() {
            const t = e.lookupIconCSS(this.eventType),
                n = this.getSubAmountString();
            return t && this.name
                ? ` <i class="bar-icon ${t}"></i><span class="bar-text">${this.name} ${n}</span>`
                : null;
        }
        getSubAmountString() {
            return this.amount && this.amount > 1 ? `X${this.amount.toString()}` : '';
        }
    }
    l.SInit = ((l.prototype.name = null), (l.prototype.amount = 0), void (l.prototype.html = null));
    class o {
        get bar() {
            return document.querySelector('.bar');
        }
        get currentSlide() {
            return this.slides[0];
        }
        get slides() {
            return this.bar.children;
        }
        addSlide(t) {
            this.bar.appendChild(t);
        }
        animateSlideDownOut(t, e = !1) {
            e && this.requestBrowserAnimation(t), t.classList.add('offscreen-bottom');
        }
        animateSlideUpIn(t, e = !1) {
            e && this.requestBrowserAnimation(t), t.classList.remove('offscreen-bottom');
        }
        animateSlideUpOut(t, e = !1) {
            e && this.requestBrowserAnimation(t), t.classList.add('offscreen-top');
        }
        createEventAlertSlide(e) {
            const n = document.createElement('div');
            n.classList.add('bar-content'), (n.innerHTML = e.html);
            const s = document.createElement('div');
            switch ((s.classList.add('slide'), s.appendChild(n), e.eventType)) {
                case t.Cheer:
                    s.classList.add(this.getCheerEventAlertCSS(e));
                    break;
                case t.Follow:
                    s.classList.add('follow-event-alert');
                    break;
                case t.Subscription:
                    s.classList.add('sub-event-alert');
                    break;
                case t.GiftedSubscription:
                    s.classList.add('gifted-sub-event-alert');
                    break;
                case t.Host:
                    s.classList.add('host-event-alert');
                    break;
                case t.Raid:
                    s.classList.add('raid-event-alert');
            }
            return s;
        }
        resetSlideStyles(t) {
            t.classList.value = 'slide';
        }
        getCheerEventAlertCSS(t) {
            return t.amount < 1
                ? null
                : t.amount < 100
                ? 'cheer-event-alert-tier-1'
                : t.amount < 1e3
                ? 'cheer-event-alert-tier-2'
                : t.amount < 5e3
                ? 'cheer-event-alert-tier-3'
                : t.amount < 1e4
                ? 'cheer-event-alert-tier-4'
                : 'cheer-event-alert-tier-5';
        }
        requestBrowserAnimation(t) {
            t.offsetWidth;
        }
    }
    class h {
        static Get(t) {
            if (Object.prototype.hasOwnProperty.call(this.fieldData, t)) return this.fieldData[t];
        }
        static Set(t, e) {
            this.fieldData[t] = e;
        }
    }
    h.fieldData = {};
    class u {}
    (u.EventCycleDisplayTime = 'EventCycleDisplayTime'),
        (u.EventAlertSlideTime = 'EventAlertSlideTime'),
        (u.EventAlertFadeTime = 'EventAlertFadeTime'),
        (u.EventAlertDisplayTime = 'EventAlertDisplayTime');
    class m {
        static toMilliseconds(t) {
            return 1e3 * t;
        }
        static toSeconds(t) {
            return t / 1e3;
        }
    }
    class c {
        constructor() {
            (this.timeEventAlertDisplay = h.Get(u.EventAlertDisplayTime)),
                (this.timeEventDisplay = h.Get(u.EventAlertDisplayTime)),
                (this.timeEventAlertSlide = h.Get(u.EventAlertSlideTime)),
                (this.timeEventAlertFade = h.Get(u.EventAlertFadeTime)),
                (this.bar = new o());
        }
        get currentEvent() {
            const t = this.events[this.currentEventIndex];
            if (!t) throw new Error('');
            return t;
        }
        get nextEvent() {
            this.currentEventIndex = this.calculateNextEventIndex();
            const t = this.events[this.currentEventIndex];
            if (!t) throw new Error('');
            return t;
        }
        displayEvents() {
            const t = this.bar.currentSlide,
                e = t.children[0];
            t.addEventListener('transitionend', (t) => {
                'opacity' === t.propertyName &&
                    ('1' === e.style.opacity
                        ? setTimeout(() => this.hideElement(e), this.timeEventDisplay)
                        : ((e.innerHTML = this.nextEvent.html), this.revealElement(e)));
            }),
                e.innerHTML.trim() || (e.innerHTML = this.currentEvent.html),
                setTimeout(() => this.hideElement(e), this.timeEventDisplay);
        }
        handleEventAlert(t, e = !0) {
            if (!t.isValid) return;
            clearTimeout(this.currentEventAlertTimeout), e && this.registerEvent(t);
            const n = this.bar.createEventAlertSlide(t);
            this.bar.animateSlideDownOut(n),
                this.bar.addSlide(n),
                this.bar.animateSlideUpOut(this.bar.currentSlide),
                this.bar.animateSlideUpIn(n, !0),
                (this.currentEventAlertTimeout = window.setTimeout(() => {
                    const t = this.bar.slides;
                    for (let e = 0; e < t.length - 1; e++) t[e].remove();
                    this.currentEventAlertTimeout = window.setTimeout(() => {
                        this.bar.resetSlideStyles(n),
                            (this.currentEventAlertTimeout = window.setTimeout(() => {
                                this.displayEvents();
                            }, this.timeEventAlertFade));
                    }, this.timeEventAlertDisplay);
                }, this.timeEventAlertSlide));
        }
        registerEvent(t) {
            if (!t) return;
            const e = this.events.findIndex((e) => e.eventType === t.eventType);
            if (-1 === e) this.currentEventIndex = this.events.push(t) - 1;
            else {
                let n;
                e > this.currentEventIndex
                    ? (this.events.splice(e, 1),
                      (n =
                          this.currentEventIndex === this.events.length - 1
                              ? 0
                              : this.currentEventIndex + 1),
                      this.events.splice(n, 0, t))
                    : e < this.currentEventIndex
                    ? (this.events.splice(e, 1),
                      (n =
                          this.currentEventIndex - 1 == 0
                              ? this.events.length - 1
                              : this.currentEventIndex - 2),
                      this.events.splice(n, 0, t))
                    : (this.events.splice(e, 1, t), (n = e)),
                    (this.currentEventIndex = n);
            }
        }
        registerEvents(t) {
            t && t.forEach((t) => this.registerEvent(t));
        }
        calculateNextEventIndex() {
            return this.currentEventIndex === this.events.length - 1
                ? 0
                : this.currentEventIndex + 1;
        }
        hideElement(t) {
            t && (t.style.opacity = '0');
        }
        revealElement(t) {
            t && (t.style.opacity = '1');
        }
    }
    c.SInit =
        ((c.prototype.timeEventAlertDisplay = 2e3),
        (c.prototype.timeEventDisplay = 1e4),
        (c.prototype.timeEventAlertSlide = 750),
        (c.prototype.timeEventAlertFade = 2e3),
        (c.prototype.currentEventIndex = -1),
        void (c.prototype.events = []));
    const d = ['bot:counter', 'event:test', 'event:skip', 'message'];
    let p;
    window.addEventListener('onEventReceived', function (t) {
        if (
            ((t) => {
                try {
                    const e = t.detail.listener;
                    return d.includes(e);
                } catch {
                    return !1;
                }
            })(t)
        )
            return;
        const e = t.detail.listener,
            o = t.detail.event;
        -1 === d.indexOf(e) &&
            ('follower-latest' === e
                ? p.handleEventAlert(new s(o.name))
                : 'cheer-latest' === e
                ? p.handleEventAlert(new n(o.name, o.amount))
                : 'subscriber-latest' === e
                ? o.gifted && o.isCommunityGift
                    ? SE_API.resumeQueue()
                    : o.bulkGifted
                    ? p.handleEventAlert(new i(o.sender, o.amount))
                    : o.gifted
                    ? p.handleEventAlert(new i(o.sender))
                    : p.handleEventAlert(new l(o.name, o.amount))
                : 'host-latest' === e
                ? p.handleEventAlert(new r(o.name, o.amount), !1)
                : 'raid-latest' === e
                ? p.handleEventAlert(new a(o.name, o.amount), !1)
                : SE_API.resumeQueue());
    }),
        window.addEventListener('onWidgetLoad', function (t) {
            const e = t.detail.session.data,
                r = t.detail.fieldData,
                a = m.toMilliseconds(r.eventCycleDisplayTime),
                o = m.toMilliseconds(r.eventAlertDisplayTime),
                d = m.toMilliseconds(r.eventAlertSlideTime),
                v = m.toMilliseconds(r.eventAlertFadeTime);
            h.Set(u.EventCycleDisplayTime, a),
                h.Set(u.EventAlertDisplayTime, o),
                h.Set(u.EventAlertSlideTime, d),
                h.Set(u.EventAlertFadeTime, v);
            const E = e['follower-latest'],
                S = e['subscriber-latest'],
                y = e['subscriber-gifted-latest'],
                g = e['cheer-latest'],
                b = new s(E.name),
                f = new l(S.name, S.amount),
                A = new i(y.sender, y.amount),
                T = new n(g.name, g.amount),
                w = [];
            b.isValid && w.push(b),
                f.isValid && w.push(f),
                A.isValid && w.push(A),
                T.isValid && w.push(T),
                (p = new c()),
                p.registerEvents(w),
                p.displayEvents();
        });
})();
