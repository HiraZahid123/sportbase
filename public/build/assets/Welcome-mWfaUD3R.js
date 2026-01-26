import{a as p,r as h,j as e,H as b,L as g}from"./app-tpvOUcZE.js";import{y as c,L as u}from"./ReactToastify-OXlYkGv9.js";import{P as f}from"./PublicFooter-DYmmucHx.js";import{c as r,M as y,m as t,U as j}from"./MainNavbar-kFjKJjLE.js";import{T as N}from"./trophy-D5mF6oc6.js";import{Z as v}from"./zap-Fad1B39c.js";import"./transition-CZjzgGkd.js";const w=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}],["path",{d:"M8 14h.01",key:"6423bh"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 18h.01",key:"lrp35t"}],["path",{d:"M12 18h.01",key:"mhygvu"}],["path",{d:"M16 18h.01",key:"kzsmim"}]],m=r("calendar-days",w);const k=[["path",{d:"M4 10h12",key:"1y6xl8"}],["path",{d:"M4 14h9",key:"1loblj"}],["path",{d:"M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2",key:"1j6lzo"}]],_=r("euro",k);const S=[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]],M=r("star",S);const L=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],D=r("target",L);function C({events:d=[],auth:I}){const{flash:s}=p().props;h.useEffect(()=>{s?.success&&c.success(s.success),s?.error&&c.error(s.error)},[s]);const x=a=>{const o=new Date,n=a.registration_deadline?new Date(a.registration_deadline):new Date(a.starts_at),i=a.capacity||0,l=a.registered_count||0;return i>0&&l>=i?{label:"Full",color:"bg-red-500"}:a.available_places<=0?{label:"Full",color:"bg-brand-red"}:o>n?{label:"Registration Closed",color:"bg-yellow-500"}:{label:"Open",color:"bg-brand-green"}};return e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 font-sans",children:[e.jsx(b,{title:"Welcome"}),e.jsx("style",{children:`
                @keyframes float {
                    0%,
                    100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                @keyframes shimmer {
                    0% {
                        background-position: -200px 0;
                    }
                    100% {
                        background-position: calc(200px + 100%) 0;
                    }
                }

                @keyframes gradientShift {
                    0%,
                    100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .text-gradient {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6,
                        #1d4ed8
                    );
                    background-size: 200% 200%;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: gradientShift 3s ease infinite;
                    line-height: 1.2;
                    display: inline-block;
                }

                .hero-animation {
                    animation: fadeInUp 0.8s ease-out;
                }

                .float-animation {
                    animation: float 6s ease-in-out infinite;
                }

                .slide-in-left {
                    animation: slideInLeft 0.6s ease-out;
                }

                .feature-card {
                    backdrop-filter: blur(10px);
                    background: rgba(255, 255, 255, 0.9);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
                        0 10px 10px -5px rgb(0 0 0 / 0.04);
                    background: rgba(255, 255, 255, 0.95);
                }

                .sport-card {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    transition: all 0.4s ease;
                }

                .sport-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25);
                    background: rgba(255, 255, 255, 1);
                }

                .shimmer-button {
                    background: linear-gradient(
                        135deg,
                        #2563eb,
                        #3b82f6,
                        #1d4ed8
                    );
                    background-size: 200% 200%;
                    animation: gradientShift 2s ease infinite;
                    position: relative;
                    overflow: hidden;
                }

                .shimmer-button::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        90deg,
                        transparent,
                        rgba(255, 255, 255, 0.2),
                        transparent
                    );
                    animation: shimmer 2s infinite;
                }

                .progress-bar {
                    background: linear-gradient(
                        90deg,
                        #10b981,
                        #059669,
                        #047857
                    );
                    background-size: 200% 100%;
                    animation: gradientShift 3s ease infinite;
                }


                .decorative-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(40px);
                    opacity: 0.1;
                    animation: float 8s ease-in-out infinite;
                }

                .blob-1 {
                    top: 10%;
                    left: 10%;
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(45deg, #3b82f6, #2563eb);
                    animation-delay: 0s;
                }

                .blob-2 {
                    top: 60%;
                    right: 10%;
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(45deg, #10b981, #059669);
                    animation-delay: 2s;
                }

                .blob-3 {
                    bottom: 20%;
                    left: 20%;
                    width: 250px;
                    height: 250px;
                    background: linear-gradient(45deg, #f59e0b, #d97706);
                    animation-delay: 4s;
                }

                .stagger-animation {
                    animation: fadeInUp 0.6s ease-out backwards;
                }

                .stagger-animation:nth-child(1) {
                    animation-delay: 0.1s;
                }
                .stagger-animation:nth-child(2) {
                    animation-delay: 0.2s;
                }
                .stagger-animation:nth-child(3) {
                    animation-delay: 0.3s;
                }
            `}),e.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[e.jsx("div",{className:"decorative-blob blob-1"}),e.jsx("div",{className:"decorative-blob blob-2"}),e.jsx("div",{className:"decorative-blob blob-3"})]}),e.jsx(y,{}),e.jsxs("div",{className:"relative max-w-7xl mx-auto px-6 py-6 text-center",children:[e.jsxs(t.div,{initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{duration:.8},className:"mb-8",children:[e.jsxs("h1",{className:"text-5xl md:text-6xl font-extrabold mb-6 text-center",children:[e.jsx("span",{className:"block text-slate-800 hero-animation",children:"Welcome to"}),e.jsx("img",{src:"/logos.png",className:"h-[2.3em] mx-auto mt-2 object-contain float-animation",alt:"SportBase Logo"})]}),e.jsxs(t.p,{className:"text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.8,delay:.3},children:["SportBase is your one-stop platform to"," ",e.jsx("span",{className:"font-semibold text-gradient",children:"discover, register, and join"})," ","sports sports, tournaments, and training camps. Whether you're an athlete looking to compete or a manager managing participants, we make the process"," ",e.jsx("span",{className:"font-semibold text-slate-800",children:"smooth and reliable."})]})]}),e.jsxs(t.div,{className:"grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16",initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:.8,delay:.5},children:[e.jsxs("div",{className:"feature-card stagger-animation rounded-2xl p-6",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-green-400 to-green-600 p-3 rounded-full w-fit mx-auto mb-3",children:e.jsx(D,{className:"h-6 w-6 text-white"})}),e.jsx("h3",{className:"font-bold text-lg text-slate-800 mb-2",children:"Easy Registration"})]}),e.jsx("p",{className:"text-slate-600",children:"Sign up for sports in just a few clicks with our streamlined process"})]}),e.jsxs("div",{className:"feature-card stagger-animation rounded-2xl p-6",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-blue-400 to-blue-600 p-3 rounded-full w-fit mx-auto mb-3",children:e.jsx(M,{className:"h-6 w-6 text-white"})}),e.jsx("h3",{className:"font-bold text-lg text-slate-800 mb-2",children:"Secure Payments"})]}),e.jsx("p",{className:"text-slate-600",children:"Pay safely and get instant confirmation with our secure payment system"})]}),e.jsxs("div",{className:"feature-card stagger-animation rounded-2xl p-6",children:[e.jsxs("div",{className:"mb-4",children:[e.jsx("div",{className:"bg-gradient-to-br from-purple-400 to-purple-600 p-3 rounded-full w-fit mx-auto mb-3",children:e.jsx(N,{className:"h-6 w-6 text-white"})}),e.jsx("h3",{className:"font-bold text-lg text-slate-800 mb-2",children:"Live Availability"})]}),e.jsx("p",{className:"text-slate-600",children:"Track remaining spots in real-time and never miss your chance"})]})]})]}),e.jsx(t.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6},viewport:{once:!0},className:"max-w-7xl mx-auto px-6 py-4",children:e.jsx("div",{className:"feature-card rounded-2xl p-8 md:p-12",children:e.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-8",children:[e.jsxs("div",{className:"flex-1 text-center md:text-left",children:[e.jsx("h3",{className:"text-2xl md:text-3xl font-bold text-slate-800 mb-3",children:"Secure & Trusted Payments"}),e.jsx("p",{className:"text-slate-600 text-base md:text-lg leading-relaxed mb-2",children:"All transactions are processed securely through Stripe, the world's leading payment platform trusted by millions."}),e.jsx("p",{className:"text-slate-500 text-sm md:text-base",children:"Your payment information is encrypted and protected with industry-leading security standards."})]}),e.jsx("div",{className:"flex-shrink-0",children:e.jsx("img",{src:"/blurple.svg",alt:"Powered by Stripe",className:"h-16 md:h-20 object-contain opacity-90 hover:opacity-100 transition-all duration-300 hover:scale-105"})})]})})}),e.jsx("div",{className:"max-w-7xl mx-auto px-6 mb-8 py-6",children:e.jsxs(t.div,{initial:{opacity:0,y:20},whileInView:{opacity:1,y:0},transition:{duration:.6},viewport:{once:!0},className:"text-center",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold text-slate-800 mb-4",children:e.jsx("span",{className:"text-gradient",children:"Upcoming Sports"})}),e.jsx("p",{className:"text-lg text-slate-600 max-w-2xl mx-auto",children:"Discover amazing sports sports, tournaments, and training opportunities near you"})]})}),e.jsx("main",{className:"flex-1 pb-16",children:e.jsx("div",{className:"max-w-7xl mx-auto px-6",children:d.length===0?e.jsxs(t.div,{className:"sport-card rounded-2xl p-12 text-center text-slate-500",initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{duration:.5},children:[e.jsx("div",{className:"float-animation",children:e.jsx(m,{className:"h-16 w-16 mx-auto mb-6 text-slate-400"})}),e.jsx("h3",{className:"text-2xl font-bold text-slate-700 mb-2",children:"No sports available"}),e.jsx("p",{className:"text-slate-500",children:"Check back later for exciting new sports and opportunities"})]}):e.jsx("div",{className:"grid gap-8 sm:grid-cols-2 lg:grid-cols-3",children:d.map((a,o)=>{const n=x(a),i=a.registered_count||0,l=a.capacity||0;return e.jsxs(t.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},transition:{delay:o*.1,duration:.6},viewport:{once:!0},className:"sport-card rounded-2xl overflow-hidden",children:[e.jsxs("div",{className:"bg-white/95 from-slate-50 to-blue-50 p-6 relative",children:[e.jsx("div",{className:"absolute top-4 right-4",children:e.jsx("span",{className:`px-3 py-1.5 text-xs font-semibold rounded-full text-white ${n.color} shadow-lg`,children:n.label})}),e.jsx("h3",{className:"text-xl font-bold text-slate-800 leading-tight mb-3 pr-20",children:a.title}),e.jsx("p",{className:"text-slate-600 text-sm leading-relaxed line-clamp-3",children:a.description})]}),e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"space-y-4 mb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"bg-blue-500 p-2 rounded-lg flex-shrink-0",children:e.jsx(m,{className:"h-4 w-4 text-white"})}),e.jsxs("div",{className:"flex flex-col",children:[e.jsx("span",{className:"text-xs text-slate-600 font-medium",children:"Date"}),e.jsx("time",{className:"text-sm font-semibold text-slate-800",children:new Date(a.starts_at).toLocaleDateString("en-GB")})]})]}),e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"bg-green-500 p-2 rounded-lg",children:e.jsx(_,{className:"h-4 w-4 text-white"})}),e.jsxs("div",{children:[e.jsx("div",{className:"text-xs text-slate-600",children:"Price"}),e.jsx("div",{className:"text-sm font-semibold text-slate-800",children:a.price?`€${a.price}`:"Free"})]})]}),e.jsxs("div",{className:"bg-slate-50 rounded-lg p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[e.jsx(j,{className:"h-4 w-4 text-slate-600"}),e.jsxs("span",{className:"text-sm font-semibold text-slate-800",children:[i," / ",l," participants"]})]}),e.jsx("div",{className:"w-full bg-slate-200 rounded-full h-2 overflow-hidden",children:e.jsx("div",{className:"h-full bg-brand-blue transition-all duration-1000 ease-out",style:{width:`${l>0?i/l*100:0}%`}})})]})]}),e.jsxs(g,{href:route("welcome"),className:"w-full inline-flex items-center justify-center gap-2 shimmer-button text-white font-semibold rounded-xl px-6 py-3.5 transition-all duration-300 hover:scale-105 hover:shadow-xl relative",children:[e.jsx(v,{className:"h-5 w-5"}),"View Details"]})]})]},a.id)})})})}),e.jsx(f,{}),e.jsx(u,{position:"top-right",autoClose:3e3})]})}export{C as default};
