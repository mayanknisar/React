import { useMemo, useState } from "react";

const createBlock = (type = "paragraph") => ({
  type,
  heading: "",
  content: "",
  items: [""]
});

const createTopic = (dayNumber, topicNumber) => ({
  number: `${dayNumber}.${topicNumber}`,
  title: "",
  blocks: [createBlock("paragraph")]
});

const createDay = (dayNumber) => ({
  label: `Day ${dayNumber}`,
  title: "",
  intro: "",
  badgeClass: `badge-day${dayNumber}`,
  accentClass: `day${dayNumber}-intro`,
  topicClass: `d${dayNumber}`,
  progressClass: `d${dayNumber}-fill`,
  topics: [createTopic(dayNumber, 1)]
});

const initialForm = {
  title: "",
  subtitle: "",
  watermark: "",
  days: [createDay(1), createDay(2), createDay(3)]
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
  --go-blue: #00ACD7;
  --go-dark: #00758D;
  --go-light: #E8F8FC;
  --accent: #F4A623;
  --accent2: #2ECC71;
  --accent3: #E74C3C;
  --mono: 'JetBrains Mono', monospace;
  --sans: 'Sora', sans-serif;
}
body { font-family: var(--sans); background: transparent; color: var(--color-text-primary); }
.course-header {
  background: linear-gradient(135deg, #003C4D 0%, #005F7A 50%, #007A99 100%);
  border-radius: 16px;
  padding: 2rem 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
}
.course-header::before {
  content: attr(data-watermark);
  position: absolute;
  right: -20px;
  top: -30px;
  font-family: var(--sans);
  font-size: 160px;
  font-weight: 800;
  color: rgba(255,255,255,0.05);
  pointer-events: none;
}
.course-header h1 { font-size: 28px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
.course-header p { font-size: 14px; color: rgba(255,255,255,0.65); margin-top: 6px; }
.badges { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
.badge { font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.5px; text-transform: uppercase; }
.badge-day1 { background: rgba(0,172,215,0.3); color: #7BE4F5; border: 1px solid rgba(0,172,215,0.4); }
.badge-day2 { background: rgba(244,166,35,0.25); color: #FAC75A; border: 1px solid rgba(244,166,35,0.4); }
.badge-day3 { background: rgba(46,204,113,0.2); color: #6EDFA4; border: 1px solid rgba(46,204,113,0.4); }
.nav-tabs { display: flex; gap: 0; margin-bottom: 1.5rem; border-bottom: 2px solid var(--color-border-tertiary); }
.tab-btn { padding: 10px 20px; font-size: 14px; font-weight: 600; font-family: var(--sans); background: transparent; border: none; cursor: pointer; color: var(--color-text-secondary); border-bottom: 3px solid transparent; margin-bottom: -2px; transition: color 0.2s, border-color 0.2s; }
.tab-btn.active { color: var(--go-blue); border-bottom-color: var(--go-blue); }
.day-panel { display: none; }
.day-panel.active { display: block; }
.day-intro { border-radius: 12px; padding: 1.25rem 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid; }
.day1-intro { background: rgba(0,172,215,0.08); border-color: var(--go-blue); }
.day2-intro { background: rgba(244,166,35,0.08); border-color: var(--accent); }
.day3-intro { background: rgba(46,204,113,0.08); border-color: var(--accent2); }
.day-intro h2 { font-size: 16px; font-weight: 700; margin-bottom: 4px; }
.day-intro p { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; }
.topic-card { background: var(--color-background-primary); border: 0.5px solid var(--color-border-tertiary); border-radius: 12px; margin-bottom: 1rem; overflow: hidden; transition: border-color 0.2s; }
.topic-header { display: flex; align-items: center; gap: 12px; padding: 14px 18px; cursor: pointer; user-select: none; }
.topic-num { font-family: var(--mono); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; min-width: 36px; text-align: center; }
.d1 { background: rgba(0,172,215,0.12); color: #0098BE; }
.d2 { background: rgba(244,166,35,0.15); color: #C07B00; }
.d3 { background: rgba(46,204,113,0.12); color: #1A9E56; }
.topic-title { font-size: 15px; font-weight: 600; flex: 1; }
.topic-arrow { font-size: 12px; color: var(--color-text-tertiary); transition: transform 0.25s; }
.topic-card.open .topic-arrow { transform: rotate(90deg); }
.topic-body { display: none; padding: 0 18px 18px; border-top: 0.5px solid var(--color-border-tertiary); }
.topic-card.open .topic-body { display: block; }
.topic-body h4 { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--color-text-secondary); margin: 14px 0 8px; }
.topic-body p, .topic-body li { font-size: 13px; line-height: 1.75; color: var(--color-text-secondary); }
.topic-body ul { padding-left: 16px; }
.topic-body li { margin-bottom: 3px; }
.code-block { background: #0D1117; border-radius: 8px; padding: 14px 16px; margin: 10px 0; overflow-x: auto; border: 1px solid rgba(255,255,255,0.06); }
.code-block pre { font-family: var(--mono); font-size: 12px; line-height: 1.65; color: #E6EDF3; }
.tip-box { display: flex; align-items: flex-start; gap: 10px; background: rgba(244,166,35,0.07); border: 1px solid rgba(244,166,35,0.2); border-radius: 8px; padding: 10px 14px; margin: 10px 0; font-size: 13px; line-height: 1.65; color: var(--color-text-secondary); }
.tip-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.key-concepts { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin: 10px 0; }
.concept-pill { font-size: 12px; font-family: var(--mono); padding: 5px 10px; border-radius: 6px; background: var(--color-background-secondary); border: 0.5px solid var(--color-border-tertiary); color: var(--color-text-primary); }
</style>`;

function HtmlCourseGenerator() {
  const [form, setForm] = useState(initialForm);
  const [copyState, setCopyState] = useState("");

  const updateRootField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateDayField = (dayIndex, field, value) => {
    setForm((prev) => {
      const days = [...prev.days];
      days[dayIndex] = { ...days[dayIndex], [field]: value };
      return { ...prev, days };
    });
  };

  const addDay = () => {
    setForm((prev) => ({ ...prev, days: [...prev.days, createDay(prev.days.length + 1)] }));
  };

  const removeDay = (dayIndex) => {
    setForm((prev) => {
      if (prev.days.length === 1) return prev;
      return { ...prev, days: prev.days.filter((_, index) => index !== dayIndex) };
    });
  };

  const updateTopicField = (dayIndex, topicIndex, field, value) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      topics[topicIndex] = { ...topics[topicIndex], [field]: value };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const addTopic = (dayIndex) => {
    setForm((prev) => {
      const days = [...prev.days];
      const dayNumber = dayIndex + 1;
      days[dayIndex] = {
        ...days[dayIndex],
        topics: [...days[dayIndex].topics, createTopic(dayNumber, days[dayIndex].topics.length + 1)]
      };
      return { ...prev, days };
    });
  };

  const removeTopic = (dayIndex, topicIndex) => {
    setForm((prev) => {
      const days = [...prev.days];
      if (days[dayIndex].topics.length === 1) return prev;
      days[dayIndex] = {
        ...days[dayIndex],
        topics: days[dayIndex].topics.filter((_, index) => index !== topicIndex)
      };
      return { ...prev, days };
    });
  };

  const updateBlockField = (dayIndex, topicIndex, blockIndex, field, value) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      blocks[blockIndex] = { ...blocks[blockIndex], [field]: value };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const addBlock = (dayIndex, topicIndex) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      topics[topicIndex] = {
        ...topics[topicIndex],
        blocks: [...topics[topicIndex].blocks, createBlock("paragraph")]
      };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const removeBlock = (dayIndex, topicIndex, blockIndex) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      if (topics[topicIndex].blocks.length === 1) return prev;
      topics[topicIndex] = {
        ...topics[topicIndex],
        blocks: topics[topicIndex].blocks.filter((_, index) => index !== blockIndex)
      };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const updateBlockItem = (dayIndex, topicIndex, blockIndex, itemIndex, value) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      const items = [...blocks[blockIndex].items];
      items[itemIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], items };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const addBlockItem = (dayIndex, topicIndex, blockIndex) => {
    setForm((prev) => {
      const days = [...prev.days];
      const topics = [...days[dayIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      blocks[blockIndex] = { ...blocks[blockIndex], items: [...blocks[blockIndex].items, ""] };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      days[dayIndex] = { ...days[dayIndex], topics };
      return { ...prev, days };
    });
  };

  const generatedHtml = useMemo(() => {
    const header = `
<div class="course-header" data-watermark="${escapeHtml(form.watermark || form.title || "Course")}">
  <h1>${renderInline(form.title || "Course Title")}</h1>
  <p>${renderInline(form.subtitle || "Course subtitle")}</p>
  <div class="badges">
${form.days
  .map(
    (day, index) =>
      `    <span class="badge ${day.badgeClass || `badge-day${index + 1}`}">${renderInline(
        day.label || `Day ${index + 1}`
      )} · ${renderInline(day.title || "Module")}</span>`
  )
  .join("\n")}
  </div>
</div>`.trim();

    const tabs = `
<div class="nav-tabs">
${form.days
  .map(
    (day, index) =>
      `  <button class="tab-btn ${index === 0 ? "active" : ""}" onclick="switchDay(${index})">${renderInline(
        day.label || `Day ${index + 1}`
      )} — ${renderInline(day.title || "Module")}</button>`
  )
  .join("\n")}
</div>`.trim();

    const panels = form.days
      .map((day, dayIndex) => {
        const topics = day.topics
          .map(
            (topic) => `  <div class="topic-card">
    <div class="topic-header" onclick="toggle(this)">
      <span class="topic-num ${day.topicClass || `d${dayIndex + 1}`}">${escapeHtml(
                topic.number || `${dayIndex + 1}.1`
              )}</span>
      <span class="topic-title">${renderInline(topic.title || "Topic title")}</span>
      <span class="topic-arrow">▶</span>
    </div>
    <div class="topic-body">
${topic.blocks.map((block) => renderBlock(block)).join("\n")}
    </div>
  </div>`
          )
          .join("\n\n");

        return `<!-- ===== ${escapeHtml(day.label || `Day ${dayIndex + 1}`)} ===== -->
<div class="day-panel ${dayIndex === 0 ? "active" : ""}" id="day-${dayIndex}">
  <div class="day-intro ${day.accentClass || `day${dayIndex + 1}-intro`}">
    <h2>${renderInline(day.label || `Day ${dayIndex + 1}`)} · ${renderInline(
          day.title || "Module"
        )}</h2>
    <p>${renderInline(day.intro || "Day intro")}</p>
  </div>

${topics}
</div>`;
      })
      .join("\n\n");

    const script = `<script>
function switchDay(idx) {
  document.querySelectorAll('.tab-btn').forEach((b,i) => b.classList.toggle('active', i===idx));
  document.querySelectorAll('.day-panel').forEach((p,i) => p.classList.toggle('active', i===idx));
}
function toggle(card) {
  card.parentElement.classList.toggle('open');
}
</script>`;

    return `${templateStyles}

${header}

${tabs}

${panels}

${script}`;
  }, [form]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(generatedHtml);
    setCopyState("Copied HTML");
    window.setTimeout(() => setCopyState(""), 2000);
  };

  return (
    <section className="generator-layout">
      <div className="panel">
        <h2 className="panel-title">Generate HTML Like Go Crash Course</h2>
        <div className="topic-form">
          <input
            placeholder="Course title"
            value={form.title}
            onChange={(event) => updateRootField("title", event.target.value)}
          />
          <input
            placeholder="Course subtitle"
            value={form.subtitle}
            onChange={(event) => updateRootField("subtitle", event.target.value)}
          />
          <input
            placeholder="Header watermark text"
            value={form.watermark}
            onChange={(event) => updateRootField("watermark", event.target.value)}
          />

          {form.days.map((day, dayIndex) => (
            <div key={`day-${dayIndex}`} className="nested-section">
              <div className="inline-actions">
                <h3>Day {dayIndex + 1}</h3>
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => removeDay(dayIndex)}
                  disabled={form.days.length === 1}
                >
                  Delete Day
                </button>
              </div>

              <input
                placeholder="Day label"
                value={day.label}
                onChange={(event) => updateDayField(dayIndex, "label", event.target.value)}
              />
              <input
                placeholder="Day title"
                value={day.title}
                onChange={(event) => updateDayField(dayIndex, "title", event.target.value)}
              />
              <textarea
                placeholder="Day intro"
                value={day.intro}
                onChange={(event) => updateDayField(dayIndex, "intro", event.target.value)}
              />

              {day.topics.map((topic, topicIndex) => (
                <div key={`topic-${topicIndex}`} className="nested-card">
                  <div className="inline-actions">
                    <h4>Topic {topicIndex + 1}</h4>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => removeTopic(dayIndex, topicIndex)}
                      disabled={day.topics.length === 1}
                    >
                      Delete Topic
                    </button>
                  </div>

                  <input
                    placeholder="Topic number like 1.1"
                    value={topic.number}
                    onChange={(event) =>
                      updateTopicField(dayIndex, topicIndex, "number", event.target.value)
                    }
                  />
                  <input
                    placeholder="Topic title"
                    value={topic.title}
                    onChange={(event) =>
                      updateTopicField(dayIndex, topicIndex, "title", event.target.value)
                    }
                  />

                  {topic.blocks.map((block, blockIndex) => (
                    <div key={`block-${blockIndex}`} className="paragraph-card">
                      <div className="inline-actions">
                        <h4>Content Block {blockIndex + 1}</h4>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={() => removeBlock(dayIndex, topicIndex, blockIndex)}
                          disabled={topic.blocks.length === 1}
                        >
                          Delete Block
                        </button>
                      </div>

                      <select
                        className="styled-select"
                        value={block.type}
                        onChange={(event) =>
                          updateBlockField(dayIndex, topicIndex, blockIndex, "type", event.target.value)
                        }
                      >
                        <option value="paragraph">Paragraph</option>
                        <option value="list">Bullet List</option>
                        <option value="code">Code Block</option>
                        <option value="tip">Tip Box</option>
                        <option value="concepts">Concept Pills</option>
                      </select>

                      <input
                        placeholder="Block heading"
                        value={block.heading}
                        onChange={(event) =>
                          updateBlockField(dayIndex, topicIndex, blockIndex, "heading", event.target.value)
                        }
                      />

                      {block.type === "list" || block.type === "concepts" ? (
                        <div className="topic-form">
                          {block.items.map((item, itemIndex) => (
                            <input
                              key={`item-${itemIndex}`}
                              placeholder={block.type === "list" ? "List item" : "Concept"}
                              value={item}
                              onChange={(event) =>
                                updateBlockItem(
                                  dayIndex,
                                  topicIndex,
                                  blockIndex,
                                  itemIndex,
                                  event.target.value
                                )
                              }
                            />
                          ))}
                          <button
                            type="button"
                            onClick={() => addBlockItem(dayIndex, topicIndex, blockIndex)}
                          >
                            Add {block.type === "list" ? "List Item" : "Concept"}
                          </button>
                        </div>
                      ) : (
                        <textarea
                          placeholder={
                            block.type === "code" ? "Code content" : "Block content"
                          }
                          value={block.content}
                          onChange={(event) =>
                            updateBlockField(
                              dayIndex,
                              topicIndex,
                              blockIndex,
                              "content",
                              event.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  ))}

                  <button type="button" onClick={() => addBlock(dayIndex, topicIndex)}>
                    Add Content Block
                  </button>
                </div>
              ))}

              <button type="button" onClick={() => addTopic(dayIndex)}>
                Add Topic
              </button>
            </div>
          ))}

          <button type="button" onClick={addDay}>
            Add Day
          </button>
        </div>
      </div>

      <div className="panel">
        <div className="inline-actions">
          <h2 className="panel-title">Generated HTML Output</h2>
          <button type="button" onClick={copyHtml}>
            {copyState || "Copy HTML"}
          </button>
        </div>
        <textarea className="output-area" value={generatedHtml} readOnly />
      </div>
    </section>
  );
}

export default HtmlCourseGenerator;
