function registerTransition(e, t) {
    var n, r;
    e.indexOf("In") >= 0 ? (n = aniEase, r = aniDuration, t.opacity = [1, 0]) : (r = aniDuration / 1.66, n = aniEaseOut, t.opacity = 0), $.Velocity.RegisterUI(e, {
        defaultDuration: r,
        calls: [
            [t, aniDuration / 1e3, {
                easing: n
            }]
        ]
    })
}

function changeEventInfo(e, t, n) {
    if (!Sidebar.isAnimating()) {
        if (!stateHandler.supported()) return void(window.location = e.children("a").attr("href"));
        Sidebar.isOpen() && Sidebar.animClose(e);
        var r = $(t[t.index(e) - 1]),
            i = $(t[t.index(e) + 1]),
            a = $(".js-event-next-prev");
        a.html(""), r.length && ($eventPrev = $('<a href="" class="nav-arrows--arrow"><img src="/svg/arrow-left.svg" alt="Previous"></a>'), a.append($eventPrev), $eventPrev.on("click touch", function(e) {
            e.preventDefault(), r.trigger("click")
        })), i.length && ($eventNext = $('<a href="#" class="nav-arrows--arrow"><img src="/svg/arrow-right.svg" alt="Next"></a>'), a.append($eventNext), $eventNext.on("click touch", function(e) {
            e.preventDefault(), i.trigger("click")
        }));
        var o = e.children("a").attr("href");
        setEventDetails(o + ".json", function(t) {
            n || stateHandler.push({
                url: o,
                title: t.title + " – jc",
                eventId: e.attr("id")
            })
        }), $(".event--active").removeClass("event--active"), e.addClass("event--active")
    }
}

function setEventDetails(e, t) {
    $.getJSON(e, function(e) {
        $(".event-info--title").html(e.title), 
        $(".js-event-info-date").html(e.longDates), 
        $(".js-event-info-time").html(e.language), 
        $(".js-event-info-venue").html(e.category), 
        //$(".js-event-info-fb").attr("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURI(e.url)), 
        //$(".js-event-info-twitter").attr("href", "https://twitter.com/home?status=" + encodeURI(e.title + " " + e.url)), 
        null != e.more_info ? $(".js-event-info-wrapper").html('<a href="' + e.more_info + '" target="_blank">More Info</a>') : $(".js-event-info-wrapper").html(""), 
        $(".event-info .body-copy").html("<p>" + e.content + "</p>");
        var n;
        n = ".event-background-color { background: " + e.color_scheme.color_1 + "; fill: " + e.color_scheme.color_1 + ";}", 
        n += n += ".event-primary-color { color: " + e.color_scheme.color_2 + "; fill: " + e.color_scheme.color_2 + ";}", 
        n += ".slash { stroke: " + e.color_scheme.color_3 + ";}", 
        n += ".event-secondary-color { color: " + e.color_scheme.color_3 + "; fill: " + e.color_scheme.color_3 + ";}", 
        //n += ".event-info .body-copy a, .event-info .meta-data a { color: " + e.color_scheme.color_3 + ";}", 
        n += ".event-info .js-event-info-wrapper a { color: " + e.color_scheme.color_3 + ";}", 
        n += ".event-info .event-info--share a:hover { color: " + e.color_scheme.color_3 + ";}", $("#js-event-color-scheme").remove(), $('<style id="js-event-color-scheme" type="text/css">' + n + "</style>").appendTo("head"), Sidebar.animOpen(), t && t(e)
    })
}

var stateHandler = {
    supported: function() {
        return "function" == typeof history.pushState
    },
    replace: function(e) {
        history.replaceState({
            title: e,
            slug: location.pathname.replace("/", "")
        }, null, null)
    },
    push: function(e) {
        history.pushState(e, null, e.url), document.title = e.title
    },
    onPop: function(e) {
        window.onpopstate = function(t) {
            null != t.state && (document.title = t.state.title, e(t))
        }
    }
};
var globalAnimSpeed = 1;
$.Velocity.mock = globalAnimSpeed, registerTransition("custom.slideUpIn", {
    translateY: [0, 10]
}), registerTransition("custom.slideDownOut", {
    translateY: [10, 0]
});

var aniDuration = 550,
    aniEase = [.075, .82, .165, 1],
    aniEaseOut = [.6, .04, .98, .335];

var Sidebar = function() {
    var e = $(".event-info"),
        t = $(".left-align-wrapper"),
        n = e.children(),
        r = 300,
        i = function() {
            var i = [{
                elements: n,
                properties: {
                    opacity: 0
                },
                options: {
                    duration: 0
                }
            }];
            $(window).width() > 1200 && i.push({
                elements: t,
                properties: {
                    paddingRight: "30%"
                },
                options: {
                    easing: [.075, .82, .165, 1]
                }
            }), i.push({
                elements: e,
                properties: {
                    translateX: ["0%", "100%"]
                },
                options: {
                    sequenceQueue: !1,
                    easing: [.075, .82, .165, 1]
                }
            }, {
                elements: n,
                properties: "custom.slideUpIn",
                options: {
                    duration: r,
                    stagger: 120,
                    drag: !0,
                    complete: function() {
                        e.addClass("event-info--open"), t.addClass("event-info--open")
                    }
                }
            }), $.Velocity.RunSequence(i)
        },
        a = function(n) {
            var r = [{
                elements: t,
                properties: {
                    padding: 0
                },
                options: {
                    easing: [.075, .82, .165, 1]
                }
            }, {
                elements: e,
                properties: {
                    translateX: ["100%"]
                },
                options: {
                    sequenceQueue: !1,
                    easing: [.075, .82, .165, 1],
                    complete: function() {
                        e.removeClass("event-info--open").scrollTop(0), $(".event--active").removeClass("event--active"), n && n.addClass("event--active")
                    }
                }
            }];
            $.Velocity.RunSequence(r)
        },
        o = function() {
            return e.hasClass("event-info--open") ? !0 : !1
        },
        s = function() {
            return e.hasClass("velocity-animating") || e.children().hasClass("velocity-animating") ? !0 : !1
        };
    return {
        animOpen: i,
        animClose: a,
        isOpen: o,
        isAnimating: s
    }
}();

//http://stackoverflow.com/questions/7614574/dollar-sign-before-self-declaring-anonymous-function-in-javascript
$(function() {
    FastClick.attach(document.body);
    var e = $(".event"),
        t = $(".js-close-sidebar"),
        n = $(".filter");
    $(".event.event--active").length && changeEventInfo($(".event.event--active"), e), t.on("click touch", function(e) {
        e.preventDefault(), stateHandler.push({
            url: "/",
            title: "Joey Comeau",
            eventId: null
        }), Sidebar.animClose()
    }), e.on("click touch", function(t) {
        t.preventDefault(), changeEventInfo($(this), e)
    }), $(window).keydown(function(t) {
        if ($eventItem = $(".event.event--active").length ? $(".event.event--active") : $(".event:first"), eventItemIndex = e.index($eventItem), 40 === t.which) {
            var n = eventItemIndex < e.length - 1 ? eventItemIndex + 1 : 0;
            changeEventInfo($(e[n]), e)
        } else if (38 === t.which) {
            var n = eventItemIndex > 0 ? eventItemIndex - 1 : e.length - 1;
            changeEventInfo($(e[n]), e)
        }
    }), $(window).on("popstate", function(t) {
        t.originalEvent.state && t.originalEvent.state.eventId ? changeEventInfo($("#" + t.originalEvent.state.eventId), e, !0) : Sidebar.animClose()
    })
});