function r(t) {
    /*
        t - is the number of pixel away from the 
        edge of the browser
    */
    var e = t,
        n = window.innerWidth - e,
        i = window.innerHeight - e;
    x = window.innerWidth / 2, b = window.innerHeight / 2, w = [{
        x: e,
        y: e
    }, {
        x: e,
        y: i
    }, {
        x: n,
        y: i
    }, {
        x: n,
        y: e
    }]
}
function o() {
    for (r(10), i = 0; i < 4; i++) {
        u[i] = u.getItem(i);
        TweenMax.set(u[i], {
            x: w[i].x,
            y: w[i].y
        });
    }
}
function s() {
    /* 
        If you're in a function then var will create a local variable, 
        "no var" will look up the scope chain until it finds the variable 
        or hits the global scope (at which point it will create it)
    */
    for (i = 0; i < h.length; i++) {
        /* 
            THE DIFFERENCE BETWEEN get() and eq()

            eq() - returns it as a jQuery object, meaning the DOM element 
            is wrapped in the jQuery wrapper, which means that it accepts
            jQuery functions

            get() - return a raw DOM element. You may manipulate it by accessing
            its attributes and invoking its functions as you would on a raw 
            DOM element. But it loses its identity as a jQuery-wrapped object,
            so a jQuery function like .fadeIn won't work.
        */
        var t = d.eq(i).width();
        h.get(i).setAttribute("textLength", t);
        f.get(i).setAttribute("textLength", t);
        p.eq(i).each(function() {
            for (_image = $(this).find("image"), j = 0; j < _image.length; j++) {
                _image.eq(j).attr("y", i * -$(this).height());
                _image.eq(j).attr("x", j + -60);
            }
        })
    }
}

var M = {};
var a, l, u, c, p, h, f, d, m, g, v, y, _, w, x, b;
var C = N;

M.init = function() {
    a = $("#menu");
    if ( a.get(0) ) {
        l = document.getElementById('polygon');
        u = l.points;
        c = $("#list");
        p = c.find("a");
        h = c.find(".clip");
        f = c.find(".text");
        d = $(".spacing");
        m = a.find(".background-container");
        v = $(".stroke.top, .stroke.bottom");
        y = $(".stroke.right, .stroke.left");
        _ = v.add(y);
        a.find(".title").get(0).href = '';
        g = a.find(".title, #list a, .social, .lang");
        s();

        p.on("click", function(t) {

            var e = window.location.href,
                i = e.split("/"),
                r = i[i.length - 1],
                o = this.href.split("/"),
                s = o[o.length - 1];
            t.preventDefault();
            M.close(r === s ? !0 : !1);
            
            C.buttonState(1);
        });

        c.find(".icon-cross").on("click", function() {
            M.close(!0);
        });
        $(window).on("resize", o);
    }
},M.open = function(t) {
    new TimelineMax;
    if ($("#loader").length) {
        a.find(".icon-cross").css({
            display: "none"
        });
    } else {
        g = g.add(a.find(".icon-cross"));
        a.find(".icon-cross").css({
            display: "inline-block"
        });
    }
    TweenMax.set(g, {
        y: -10,
        autoAlpha: 0,
    });
    if ("number" != typeof t) {
        t = 10;
    }
    TweenMax.set(a, {
        autoAlpha: 1,
    });
    r(t);
    
    var e = 4;
    for (i = 0; i < e; i++) {
        u[i] = u.getItem(i);
        //HAVE EACH POINT START IN THE CENTER OF THE SCREEN
        TweenMax.set(u[i], {
            x: x,
            y: b
        });

        //NOW ANIMATE THE POINTS ONE AT A TIME
        TweenMax.to(u[i], 1.2, {
            //animate the points out to the edge of the browser
            x: w[i].x,
            y: w[i].y,
            delay: .1 * i,
            ease: Expo.easeInOut,
            //now animate the strokes that surround the menu
            onComplete: function() {
                var n = new TimelineMax;
                //When the last point has finished adjust menu by 10 pixels
                if (e--, 0 === t && !e) {
                    for (r(10), e = 0; 4 > e; e++) n.set(u[e], {
                        x: w[e].x,
                        y: w[e].y
                    });
                    //NOTE: THE STROKES ARE WHITE 
                    //v - top and bottom
                    n.set(v, {
                        width: "100%",
                        autoAlpha: 1
                    });
                    n.set(y, {
                        height: "100%",
                        autoAlpha: 1
                    });
                    n.set(m, {
                        autoAlpha: 1
                    });
                    n.to(v, 1, {
                        width: "0%",
                        /*
                            easeInOut - Specifies a transition effect with a slow start and end 
                                (equivalent to cubic-bezier(0.42,0,0.58,1))
                        */
                        ease: Expo.easeInOut
                    });
                    n.to(y, 1, {
                        height: "0%",
                        ease: Expo.easeInOut
                    }, "-=1");
                }
            }
        });
    }
    //Now display the content in menu (list)
    TweenMax.staggerTo(g, 1.2, {
        y: 0,
        autoAlpha: 1,
        delay: .8,
        force3D: !0,
        /*
            easeOut - Specifies a transition effect with a slow end 
                (equivalent to cubic-bezier(0,0,0.58,1))
        */
        ease: Expo.easeOut
    }, .2);
}, M.close = function(t) {
    var e = new TimelineMax,
        n = window.location.href;
    e.to(v, 1, {
        width: "100%",
        ease: Expo.easeInOut
    }), e.to(y, 1, {
        height: "100%",
        ease: Expo.easeInOut
    }, "-=1"), e.set(_, {
        autoAlpha: 0
    }), e.set(m, {
        autoAlpha: 0
    });
    //t = 1 or if same as current page
    if (t || this.href === n) {
        
        /* 
            not sure how these for loops work
            
            they are returning the menu's corners
            to the edge of the browser
        */
        for (r(0), i = 0; i < 4; i++) {
            for (u[i] = u.getItem(i), j = 0; j < 4; j++) {
                e.set(u[j], {
                    x: w[j].x,
                    y: w[j].y
                });
            }
        }
        e.staggerTo(u, .6, {
            x: x,
            y: b,
            ease: Expo.easeInOut
        }, .1);

    } else {
        //new page 
        e.eventCallback("onComplete", function() {
            $(document).trigger("navigation:animateIn")
        });
    }
    e.staggerTo(g, .4, {
        y: -10,
        autoAlpha: 0,
        force3D: !0,
        ease: Expo.easeOut
    }, .05, '-=1');
    e.set(a, {
        autoAlpha: 0,
        onComplete: function() {
            TweenMax.set(a.find("background-container"), {
                autoAlpha: 0
            })
        }
    });

}

/*-------------------------Start of navigation-------------------------*/


function rr() {
    console.log("navigation:setVerticalAnimation");
    yy = new TimelineMax;

    //adds a zero-duration tween to the end of the timeline that sets values 
    //immediately (when the virtual playhead reaches the position on the timeline)
    yy.set(ff.find(".title, .exit-filter"), {
        autoAlpha: 0
    });
    //change the opacity from 0 to 1 for navigation 
    yy.set(hh, {
        autoAlpha: 1
    });
    //yPercent and xPercent setup gives it the affect of 
    //sliding iN. 
    yy.set(dd, {
        autoAlpha: 0,
        yPercent: -100

    });
    yy.set(mm, {
        autoAlpha: 0,
        xPercent: -100
    });
    yy.set(gg, {
        autoAlpha: 0,
        yPercent: 100
    });

    //to() - adds a TweenLite().to() tween to the end of the timeline
    yy.to(mm, 1, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: !0,
        //a comma-delimited list of property names that you want to clear
        // from the elements "style" property when the twenn 
        //completes
        clearProps: "transform",
        ease: Expo.easeOut
    });
    /* staggerTo(targets, duration, vars, stagger, position, ...)
        targets - an array of objects 
        stagger - the amount of time in seconds to stagger the start
        time of each tween
        position - controls the placement of the first tween in the 
        timeline (by default, its the end of the timeline, like +=0)
        
        By setting the position to -1 it makes all of the animation 
        run at the same time.
    */
    yy.staggerTo(dd, 1, {
        autoAlpha: 1,
        yPercent: 0,
        force3D: !0,
        clearProps: "transform",
        ease: Expo.easeOut
    }, .2, "=-1");
    yy.staggerTo(gg, 1, {
        autoAlpha: 1,
        yPercent: 0,
        force3D: !0,
        clearProps: "transform",
        ease: Expo.easeOut
    }, .2, "-=1");

    /* progress(value, suppressEvent) 
        Gets or sets the timeline's progress which is a value between 0 and 1 indicating the 
        position of the virtual playhead where 0 is at the beginning and 1 is complete
    
        This causes it to jump right to the end, by passing the animation aspect
    */
    yy.progress(1);
}
function oo() {
    console.log("navigation:setHorizontalAnimation");
    yy = new TimelineMax;
    yy.set(ff.find(".title, .exit-filter"), {
        autoAlpha: 0
    }), yy.set(hh, {
        autoAlpha: 1
    }), yy.set(dd, {
        autoAlpha: 0,
        xPercent: -100
    }), yy.set(mm, {
        autoAlpha: 0,
        yPercent: -100
    }), yy.set(gg, {
        autoAlpha: 0,
        xPercent: 100
    }), yy.staggerTo(dd, 1, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: !0,
        ease: Expo.easeOut
    }, .2), yy.to(mm, 1, {
        autoAlpha: 1,
        yPercent: 0,
        force3D: !0,
        ease: Expo.easeOut
    }, "-=1"), yy.staggerTo(gg, 1, {
        autoAlpha: 1,
        xPercent: 0,
        force3D: !0,
        ease: Expo.easeOut
    }, .2, "-=1"), yy.progress(1)
}
function ss() {
    pp = TT.width();
    if (765 >= pp && "horizontal" !== __) {
        __ = "horizontal";
        oo();
    } else {
        if ( pp >= 765 && "vertical" !== __) {
            __ = "vertical";
            rr();
            ff.insertBefore(mm);
        }
    }
    N.buttonState(bb)
}

var N = {};

FastClick.attach(document.body);
var pp, hh, ff, dd, mm, gg, vv, yy, __, ww, xx, bb, TT = $(window), 
    SS = !1;

N.buttonState = function(t) {
    console.log("navigation: buttonState " + t);
}, N.init = function() {
    hh = $("#navigation");
    //finds all elements with the class subtitle that 
    //are the descendants of h. 
    ff = hh.find(".subtitle");

    //select all .title elements where their parent is a
    //#navigation 
    dd = hh.find("> .title");
    mm = hh.find(".burger-menu");
    gg = hh.find(".social .icon").add(".mute");
    vv = hh.find(".mute");
    ww = $("#social-responsive");
    xx = $(".icon-soc");

    if (hh.length) {
        console.log("navigation:init");
        ss();
        TT.on("resize", s);

        mm.find("svg").on("click", function() {
            M.open(0)
        });

        //attach an event handler function for events
        //this can then be called using the trigger()
        $(document).on("navigation:animateIn", N.open);
        
        $(window).on("popstate", N.open);
        
        $(document).on("navigation:changeTitle", function() {
            "" != arguments[1] && "" + dd.find("span").text() != "" + arguments[1] && dd.find("span").text(arguments[1])
        });
        $(document).on("navigation:close", function() {
            //reverse() - reverses playback so that all aspects of the animation 
            //are oriented backwards
            yy && yy.reverse()
        });
    }
}, N.open = function() {
    console.log("navigation: open");
    $(document).trigger("navigation:changeTitle");
    //animate the nav bar coming in 
    yy.restart()
}



N.init();
M.init();

