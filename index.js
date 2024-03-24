const template = `<div class="subject">
<div class="subject-name"
id="<%= subject.name %>"
><%= subject.name %></div>
<div class="docs">
  <% for( let i = 0; i < subject.docs.length; i++ ) { %>

    <div class="doc">
    <img src="<%= subject.docs[i].thumbnail %>" alt="" />
    <a href="<%= subject.docs[i].path %>" target="_blank">
      <%= subject.docs[i].name %>
    </a>
    <div class="desc">
      <strong>description: </strong>
      <%= subject.docs[i].description %>
    </div>
  </div>
  <% } %>
</div>
</div>`;

const el = {
  subjects: document.querySelector(".subjects"),
  list: document.querySelector(".available-subjects"),
};
const jsonfilespaths = [
  "./chemistry-2/chemistry-2.json",
  "./control_and_automation/control_and_automation.json",
  "./electrical_engineering/electrical_engineering.json",
  "./environment-eng/environment-eng.json",
  "./fluid-dynamics/fluid-dynamics.json",
  "./heat-and-mass/heat-and-mass.json",
  "./math3/math3.json",
  "./mathematics-4-numerical/mathematics-4-numerical.json",
  "./mechanical-process-engineering/mechanical-process-engineering.json",
  "./mechanics-1/mechanics-1.json",
  "./mechanics-2/mechanics-2.json",
  "./mechanics-3/mechanics-3.json",
  "./process-laboratory/process-laboratory.json",
  "./thermal-sep/thermal-sep.json",
  "./thermodynamics-1/thermodynamics-1.json",
  "./thermodynamics-2/thermodynamics-2.json",
];
const listTempl = `<div>
<% for( let i = 0; i < list.length; i++ ) { %>
<li>
<a href="#<%= list[i] %>"><%= list[i] %></a>
</li>
<% } %>
</div>`;
const docresproms = jsonfilespaths.map((fp) => {
  return fetch(fp);
});
Promise.all(docresproms).then((ress) => {
  const docproms = ress.map((res) => res.json());
  Promise.all(docproms).then((arrsubs) => {
    const list = [];
    for (let i = 0; i < arrsubs.length; i++) {
      const subject = arrsubs[i];
      const html = ejs.render(template, { subject });
      el.subjects.innerHTML += html;
      list.push(subject.name);
    }
    el.list.innerHTML = ejs.render(listTempl, { list });
  });
});
