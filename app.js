const RE = {
    data: {
        exp: [{ co: 'Vela Software', r: 'SDET', t: '2022-Pres', d: 'Automated 200+ regression cases.\nPrepared FRS documents.' }],
        proj: [{ n: 'Automation Framework', d: 'Scalable Selenium grid for banking modules.' }]
    },

    init() {
        lucide.createIcons();
        ['pSelect', 'tSelect'].forEach(id => document.getElementById(id).onchange = () => this.render());
        ['userName', 'userRole', 'userContact', 'userSkills'].forEach(id => document.getElementById(id).oninput = () => this.render());
        document.getElementById('downloadBtn').onclick = () => {
            alert("Pro Tip: In the print dialog, ensure 'Background Graphics' is CHECKED to see the full design.");
            window.print();
        };
        document.getElementById('clearBtn').onclick = () => this.clearAll();
        this.renderFields();
        this.render();
    },

    clearAll() {
        if(confirm("Start fresh?")) {
            this.data.exp = []; this.data.proj = [];
            ['userName', 'userRole', 'userContact', 'userSkills'].forEach(id => document.getElementById(id).value = "");
            this.renderFields(); this.render();
        }
    },

    add(type) {
        if(type === 'exp') this.data.exp.push({ co: '', r: '', t: '', d: '' });
        else this.data.proj.push({ n: '', d: '' });
        this.renderFields(); this.render();
    },

    del(type, i) {
        this.data[type].splice(i, 1);
        this.renderFields(); this.render();
    },

    renderFields() {
        document.getElementById('expList').innerHTML = this.data.exp.map((e, i) => `
            <div class="card"><button class="del-btn" onclick="RE.del('exp',${i})">×</button>
            <input placeholder="Company" value="${e.co}" oninput="RE.data.exp[${i}].co=this.value; RE.render()">
            <input placeholder="Role" value="${e.r}" oninput="RE.data.exp[${i}].r=this.value; RE.render()">
            <input placeholder="Tenure" value="${e.t}" oninput="RE.data.exp[${i}].t=this.value; RE.render()">
            <textarea placeholder="Details" oninput="RE.data.exp[${i}].d=this.value; RE.render()">${e.d}</textarea></div>`).join('');

        document.getElementById('projList').innerHTML = this.data.proj.map((p, i) => `
            <div class="card"><button class="del-btn" onclick="RE.del('proj',${i})">×</button>
            <input placeholder="Project Name" value="${p.n}" oninput="RE.data.proj[${i}].n=this.value; RE.render()">
            <textarea placeholder="Description" oninput="RE.data.proj[${i}].d=this.value; RE.render()">${p.d}</textarea></div>`).join('');
    },

    render() {
        const style = document.getElementById('tSelect').value;
        const prof = document.getElementById('pSelect').value;
        const canvas = document.getElementById('canvas');
        canvas.className = `${style} ${prof}-theme`;

        const name = document.getElementById('userName').value;
        const role = document.getElementById('userRole').value;
        const contact = document.getElementById('userContact').value;
        const skills = document.getElementById('userSkills').value.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('');
        const formatList = (text) => `<ul>${text.split('\n').filter(l => l.trim()).map(l => `<li>${l}</li>`).join('')}</ul>`;

        const expHtml = this.data.exp.map(e => `
            <div class="job-item"><div style="display:flex; justify-content:space-between"><strong>${e.r}</strong><span>${e.t}</span></div>
            <div style="color:var(--accent); font-weight:800; font-size:12px">${e.co}</div>${formatList(e.d)}</div>`).join('');
        
        const projHtml = this.data.proj.map(p => `<div class="job-item"><strong>${p.n}</strong>${formatList(p.d)}</div>`).join('');

        if (style === 'style-10') {
            canvas.innerHTML = `
            <div style="display: block; width: 100%;">
                <header style="background-color: #1e293b !important; color: white !important; padding: 40px 50px; text-align: left; -webkit-print-color-adjust: exact;">
                    <h1 style="font-size: 42px; margin: 0; line-height: 1.1; color: white !important;">${name}</h1>
                    <p style="font-size: 18px; color: var(--accent) !important; margin: 5px 0; font-weight: 800; text-transform: uppercase;">${role}</p>
                    <div style="font-size: 11px; opacity: 0.7; border-top: 1px solid #334155; padding-top: 10px; margin-top: 10px; color: white !important;">${contact}</div>
                </header>
                
                <div style="padding: 40px 50px; display: grid; grid-template-columns: 1.8fr 1fr; gap: 40px;">
                    <section>
                        <div class="section-title">Professional Path</div>
                        ${expHtml}
                    </section>
                    <section>
                        <div class="section-title">Expertise</div>
                        <div style="margin-bottom: 30px;">${skills}</div>
                        <div class="section-title" style="margin-top:20px">Strategic Projects</div>
                        ${projHtml}
                    </section>
                </div>
            </div>`;
        } else if (style === 'style-3') {
            canvas.innerHTML = `<div style="display:flex; height:100%"><aside style="width:280px; background:#f8fafc; padding:50px 30px; border-right:1px solid #eee">
                <h1 style="font-size:28px">${name}</h1><p style="color:var(--accent); font-weight:700">${role}</p><div class="section-title" style="margin-top:40px">Skills</div>${skills}</aside>
                <main style="flex:1; padding:50px"><div class="section-title">Experience</div>${expHtml}<div class="section-title" style="margin-top:40px">Projects</div>${projHtml}</main></div>`;
        } else {
            canvas.innerHTML = `<header style="padding:60px 50px 30px; text-align:center"><h1>${name}</h1><p style="color:var(--accent); font-weight:700">${role}</p><p>${contact}</p></header>
                <div style="padding:0 60px 60px"><div class="section-title">Experience</div>${expHtml}<div class="section-title">Projects</div>${projHtml}<div class="section-title">Skills</div>${skills}</div>`;
        }
    }
};
window.onload = () => RE.init();