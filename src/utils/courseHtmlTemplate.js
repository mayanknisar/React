export const createTemplateBlock = (type = "paragraph") => ({
  type,
  heading: "",
  content: "",
  items: [""]
});

export const createTemplateTopic = (tabNumber, topicNumber) => ({
  number: `${tabNumber}.${topicNumber}`,
  title: "",
  blocks: [createTemplateBlock("paragraph")]
});

export const createTemplateTab = (tabNumber) => ({
  label: `Tab ${tabNumber}`,
  title: "",
  intro: "",
  topics: [createTemplateTopic(tabNumber, 1)]
});

export const initialTemplateForm = {
  title: "",
  subtitle: "",
  watermark: "",
  tabs: [createTemplateTab(1)]
};

const escapeHtml = (value = "") =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const renderInline = (text = "") => escapeHtml(text).replaceAll("\n", "<br />");

const renderBlock = (block) => {
  const heading = block.heading ? `      <h4>${renderInline(block.heading)}</h4>\n` : "";

  if (block.type === "paragraph") {
    return `${heading}      <p>${renderInline(block.content)}</p>`;
  }

  if (block.type === "code") {
    return `${heading}      <div class="code-block"><pre>${escapeHtml(block.content)}</pre></div>`;
  }

  if (block.type === "tip") {
    return `${heading}      <div class="tip-box"><span class="tip-icon">💡</span><span>${renderInline(
      block.content
    )}</span></div>`;
  }

  if (block.type === "html") {
    return `${heading}      <div class="html-block">${block.content || ""}</div>`;
  }

  if (block.type === "list") {
    const items = block.items
      .filter((item) => item.trim())
      .map((item) => `        <li>${renderInline(item)}</li>`)
      .join("\n");
    return `${heading}      <ul>\n${items}\n      </ul>`;
  }

  if (block.type === "concepts") {
    const items = block.items
      .filter((item) => item.trim())
      .map((item) => `        <span class="concept-pill">${renderInline(item)}</span>`)
      .join("\n");
    return `${heading}      <div class="key-concepts">\n${items}\n      </div>`;
  }

  return "";
};

const templateStyles = `<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Sora:wght@300;400;600;700;800&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --go-blue: #00ACD7; --accent: #F4A623; --accent2: #2ECC71; --mono: 'JetBrains Mono', monospace; --sans: 'Sora', sans-serif;
}
body { font-family: var(--sans); background: transparent; color: var(--color-text-primary); }
.course-header { background: linear-gradient(135deg, #003C4D 0%, #005F7A 50%, #007A99 100%); border-radius: 16px; padding: 2rem 2.5rem; margin-bottom: 2rem; position: relative; overflow: hidden; }
.course-header::before { content: attr(data-watermark); position: absolute; right: -20px; top: -30px; font-size: 160px; font-weight: 800; color: rgba(255,255,255,0.05); pointer-events: none; }
.course-header h1 { font-size: 28px; font-weight: 800; color: #fff; }
.course-header p { font-size: 14px; color: rgba(255,255,255,0.65); margin-top: 6px; }
.badges { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px; text-transform: uppercase; background: rgba(0,172,215,0.25); color: #7BE4F5; border: 1px solid rgba(0,172,215,0.4); }
.nav-tabs { display: flex; border-bottom: 2px solid var(--color-border-tertiary); margin-bottom: 1.5rem; flex-wrap: wrap; }
.tab-btn { padding: 10px 20px; font-size: 14px; font-weight: 600; background: transparent; border: none; cursor: pointer; color: var(--color-text-secondary); border-bottom: 3px solid transparent; margin-bottom: -2px; }
.tab-btn.active { color: var(--go-blue); border-bottom-color: var(--go-blue); }
.tab-panel { display: none; }
.tab-panel.active { display: block; }
.tab-intro { border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid var(--go-blue); background: rgba(0,172,215,0.08); }
.tab-intro h2 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.tab-intro p { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }
.topic-card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: 12px; margin-bottom: 1rem; overflow: hidden; }
.topic-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer; }
.topic-num { font-family: var(--mono); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; min-width: 36px; text-align: center; background: rgba(0,172,215,0.12); color: #0098BE; }
.topic-title { font-size: 15px; font-weight: 600; flex: 1; }
.topic-arrow { font-size: 12px; color: var(--color-text-tertiary); transition: transform 0.25s; }
.topic-card.open .topic-arrow { transform: rotate(90deg); }
.topic-body { display: none; padding: 0 18px 18px; border-top: 0.5px solid var(--color-border-tertiary); }
.topic-card.open .topic-body { display: block; }
.topic-body h4 { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--color-text-secondary); margin: 14px 0 8px; }
.topic-body p, .topic-body li { font-size: 13px; line-height: 1.75; color: var(--color-text-secondary); }
.topic-body ul { padding-left: 16px; }
.code-block { background: #0D1117; border-radius: 8px; padding: 14px 16px; margin: 10px 0; overflow-x: auto; border: 1px solid rgba(255,255,255,0.06); }
.code-block pre { font-family: var(--mono); font-size: 12px; line-height: 1.65; color: #E6EDF3; }
.tip-box { display: flex; gap: 10px; background: rgba(244,166,35,0.07); border: 1px solid rgba(244,166,35,0.2); border-radius: 8px; padding: 10px 14px; margin: 10px 0; font-size: 13px; line-height: 1.65; color: var(--color-text-secondary); }
.key-concepts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; }
.concept-pill { font-size: 12px; font-family: var(--mono); padding: 5px 10px; border-radius: 6px; background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); color: var(--color-text-primary); }
</style>`;

export const renderCourseTemplateHtml = (form) => {
  const tabs = form.tabs ?? [];
  const header = `
<div class="course-header" data-watermark="${escapeHtml(form.watermark || form.title || "Course")}">
  <h1>${renderInline(form.title || "Course Title")}</h1>
  <p>${renderInline(form.subtitle || "Course subtitle")}</p>
  <div class="badges">
${tabs
      .map((tab) => `    <span class="badge">${renderInline(tab.label || "Tab")} · ${renderInline(tab.title || "Module")}</span>`)
      .join("\n")}
  </div>
</div>`.trim();

  const nav = `
<div class="nav-tabs">
${tabs
      .map(
        (tab, index) =>
          `  <button class="tab-btn ${index === 0 ? "active" : ""}" onclick="switchTab(${index})">${renderInline(
            tab.label || `Tab ${index + 1}`
          )} · ${renderInline(tab.title || "Module")}</button>`
      )
      .join("\n")}
</div>`.trim();

  const panels = tabs
    .map((tab, tabIndex) => {
      const topics = (tab.topics ?? [])
        .map(
          (topic) => `  <div class="topic-card">
    <div class="topic-header" onclick="toggle(this)">
      <span class="topic-num">${escapeHtml(topic.number || `${tabIndex + 1}.1`)}</span>
      <span class="topic-title">${renderInline(topic.title || "Topic")}</span>
      <span class="topic-arrow">▶</span>
    </div>
    <div class="topic-body">
${(topic.blocks ?? []).map((block) => renderBlock(block)).join("\n")}
    </div>
  </div>`
        )
        .join("\n\n");

      return `<div class="tab-panel ${tabIndex === 0 ? "active" : ""}" id="tab-${tabIndex}">
  <div class="tab-intro">
    <h2>${renderInline(tab.label || `Tab ${tabIndex + 1}`)} · ${renderInline(tab.title || "Module")}</h2>
    <p>${renderInline(tab.intro || "Intro")}</p>
  </div>

${topics}
</div>`;
    })
    .join("\n\n");

  const script = `<script>
function switchTab(idx) {
  document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', i===idx));
  document.querySelectorAll('.tab-panel').forEach((p,i) => p.classList.toggle('active', i===idx));
}
function toggle(card) {
  card.parentElement.classList.toggle('open');
}
</script>`;

  return `${templateStyles}

${header}

${nav}

${panels}

${script}`;
};
