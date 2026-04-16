import { useEffect, useMemo, useState } from "react";
import {
  createTemplateBlock,
  createTemplateTab,
  createTemplateTopic,
  initialTemplateForm,
  renderCourseTemplateHtml
} from "../utils/courseHtmlTemplate";

const toGeneratorForm = (initialData) => ({
  title: initialData?.title ?? "",
  subtitle: initialData?.subtitle ?? "",
  watermark: initialData?.watermark ?? "",
  tabs:
    initialData?.tabs?.map((tab, tabIndex) => ({
      label: tab.label ?? `Tab ${tabIndex + 1}`,
      title: tab.title ?? "",
      intro: tab.intro ?? "",
      topics:
        tab.topics?.map((topic, topicIndex) => ({
          number: topic.number ?? `${tabIndex + 1}.${topicIndex + 1}`,
          title: topic.title ?? "",
          blocks:
            topic.blocks?.map((block) => ({
              type: block.type ?? "paragraph",
              heading: block.heading ?? "",
              content: block.content ?? "",
              items: block.items ?? [""]
            })) ?? [createTemplateBlock("paragraph")]
        })) ?? [createTemplateTopic(tabIndex + 1, 1)]
    })) ?? [createTemplateTab(1)]
});

function HtmlCourseGenerator({
  onSaveCourse,
  initialData = null,
  submitLabel = "Save To Learning Topics"
}) {
  const [form, setForm] = useState(initialTemplateForm);
  const [copyState, setCopyState] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm(toGeneratorForm(initialData));
      return;
    }
    setForm(initialTemplateForm);
  }, [initialData]);

  const updateRootField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const updateTabField = (tabIndex, field, value) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      tabs[tabIndex] = { ...tabs[tabIndex], [field]: value };
      return { ...prev, tabs };
    });
  };

  const addTab = () => {
    setForm((prev) => ({ ...prev, tabs: [...prev.tabs, createTemplateTab(prev.tabs.length + 1)] }));
  };

  const removeTab = (tabIndex) => {
    setForm((prev) => {
      if (prev.tabs.length === 1) return prev;
      return { ...prev, tabs: prev.tabs.filter((_, index) => index !== tabIndex) };
    });
  };

  const updateTopicField = (tabIndex, topicIndex, field, value) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      topics[topicIndex] = { ...topics[topicIndex], [field]: value };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const addTopic = (tabIndex) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const tabNumber = tabIndex + 1;
      tabs[tabIndex] = {
        ...tabs[tabIndex],
        topics: [
          ...tabs[tabIndex].topics,
          createTemplateTopic(tabNumber, tabs[tabIndex].topics.length + 1)
        ]
      };
      return { ...prev, tabs };
    });
  };

  const removeTopic = (tabIndex, topicIndex) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      if (tabs[tabIndex].topics.length === 1) return prev;
      tabs[tabIndex] = {
        ...tabs[tabIndex],
        topics: tabs[tabIndex].topics.filter((_, index) => index !== topicIndex)
      };
      return { ...prev, tabs };
    });
  };

  const updateBlockField = (tabIndex, topicIndex, blockIndex, field, value) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      blocks[blockIndex] = { ...blocks[blockIndex], [field]: value };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const addBlock = (tabIndex, topicIndex) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      topics[topicIndex] = {
        ...topics[topicIndex],
        blocks: [...topics[topicIndex].blocks, createTemplateBlock("paragraph")]
      };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const removeBlock = (tabIndex, topicIndex, blockIndex) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      if (topics[topicIndex].blocks.length === 1) return prev;
      topics[topicIndex] = {
        ...topics[topicIndex],
        blocks: topics[topicIndex].blocks.filter((_, index) => index !== blockIndex)
      };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const updateBlockItem = (tabIndex, topicIndex, blockIndex, itemIndex, value) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      const items = [...blocks[blockIndex].items];
      items[itemIndex] = value;
      blocks[blockIndex] = { ...blocks[blockIndex], items };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const addBlockItem = (tabIndex, topicIndex, blockIndex) => {
    setForm((prev) => {
      const tabs = [...prev.tabs];
      const topics = [...tabs[tabIndex].topics];
      const blocks = [...topics[topicIndex].blocks];
      blocks[blockIndex] = { ...blocks[blockIndex], items: [...blocks[blockIndex].items, ""] };
      topics[topicIndex] = { ...topics[topicIndex], blocks };
      tabs[tabIndex] = { ...tabs[tabIndex], topics };
      return { ...prev, tabs };
    });
  };

  const generatedHtml = useMemo(() => renderCourseTemplateHtml(form), [form]);

  const copyHtml = async () => {
    await navigator.clipboard.writeText(generatedHtml);
    setCopyState("Copied HTML");
    window.setTimeout(() => setCopyState(""), 2000);
  };

  const saveCourse = () => {
    onSaveCourse?.(form, generatedHtml);
    if (!initialData) {
      setForm(initialTemplateForm);
    }
  };

  return (
    <section className="generator-layout">
       
      <div className="panel">
        <div className="inline-actions">
          <h2 className="panel-title">{initialData ? "Edit Generated Course HTML" : "Generate HTML Like Go Crash Course"}
          </h2>
          <div className="menu-actions">
            <button type="button" className="back-button"  onClick={saveCourse}>
              {submitLabel}
            </button>
          </div>
        </div>
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

          {form.tabs.map((tab, tabIndex) => (
            <details key={`tab-${tabIndex}`} className="nested-section collapsible" open>
              <summary className="collapse-summary">
                Tab {tabIndex + 1}: {tab.label || "Untitled Tab"}
              </summary>
              <div className="topic-form">
                <div className="inline-actions">
                  <h3>Tab Details</h3>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => removeTab(tabIndex)}
                    disabled={form.tabs.length === 1}
                  >
                    Delete Tab
                  </button>
                </div>

                <input
                  placeholder="Tab label"
                  value={tab.label}
                  onChange={(event) => updateTabField(tabIndex, "label", event.target.value)}
                />
                <input
                  placeholder="Tab title"
                  value={tab.title}
                  onChange={(event) => updateTabField(tabIndex, "title", event.target.value)}
                />
                <textarea
                  placeholder="Tab intro"
                  value={tab.intro}
                  onChange={(event) => updateTabField(tabIndex, "intro", event.target.value)}
                />

                {tab.topics.map((topic, topicIndex) => (
                  <details key={`topic-${topicIndex}`} className="nested-card collapsible" open>
                    <summary className="collapse-summary">
                      Topic {topicIndex + 1}: {topic.title || "Untitled Topic"}
                    </summary>
                    <div className="topic-form">
                      <div className="inline-actions">
                        <h4>Topic Details</h4>
                        <button
                          type="button"
                          className="danger-button"
                          onClick={() => removeTopic(tabIndex, topicIndex)}
                          disabled={tab.topics.length === 1}
                        >
                          Delete Topic
                        </button>
                      </div>

                      <input
                        placeholder="Topic number like 1.1"
                        value={topic.number}
                        onChange={(event) =>
                          updateTopicField(tabIndex, topicIndex, "number", event.target.value)
                        }
                      />
                      <input
                        placeholder="Topic title"
                        value={topic.title}
                        onChange={(event) =>
                          updateTopicField(tabIndex, topicIndex, "title", event.target.value)
                        }
                      />

                      {topic.blocks.map((block, blockIndex) => (
                        <details
                          key={`block-${blockIndex}`}
                          className="paragraph-card collapsible"
                          open
                        >
                          <summary className="collapse-summary">
                            Content Block {blockIndex + 1}: {block.type}
                          </summary>
                          <div className="topic-form">
                            <div className="inline-actions">
                              <h4>Block Details</h4>
                              <button
                                type="button"
                                className="danger-button"
                                onClick={() => removeBlock(tabIndex, topicIndex, blockIndex)}
                                disabled={topic.blocks.length === 1}
                              >
                                Delete Block
                              </button>
                            </div>

                            <select
                              className="styled-select"
                              value={block.type}
                              onChange={(event) =>
                                updateBlockField(
                                  tabIndex,
                                  topicIndex,
                                  blockIndex,
                                  "type",
                                  event.target.value
                                )
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
                                updateBlockField(
                                  tabIndex,
                                  topicIndex,
                                  blockIndex,
                                  "heading",
                                  event.target.value
                                )
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
                                        tabIndex,
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
                                  onClick={() => addBlockItem(tabIndex, topicIndex, blockIndex)}
                                >
                                  Add {block.type === "list" ? "List Item" : "Concept"}
                                </button>
                              </div>
                            ) : (
                              <textarea
                                placeholder={block.type === "code" ? "Code content" : "Block content"}
                                value={block.content}
                                onChange={(event) =>
                                  updateBlockField(
                                    tabIndex,
                                    topicIndex,
                                    blockIndex,
                                    "content",
                                    event.target.value
                                  )
                                }
                              />
                            )}
                          </div>
                        </details>
                      ))}

                      <button type="button" onClick={() => addBlock(tabIndex, topicIndex)}>
                        Add Content Block
                      </button>
                    </div>
                  </details>
                ))}

                <button type="button" onClick={() => addTopic(tabIndex)}>
                  Add Topic
                </button>
              </div>
            </details>
          ))}

          <button type="button" onClick={addTab}>
            Add Tab
          </button>
        </div>
      </div>
    </section>
  );
}

export default HtmlCourseGenerator;
