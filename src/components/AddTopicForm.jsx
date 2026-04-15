import { useState } from "react";

const createHeading = () => ({
  mainTitle: "",
  subTitle: "",
  description: "",
  tags: [],
  tagInput: ""
});

const createParagraph = () => ({
  title: "",
  description: ""
});

const createCategory = () => ({
  name: "",
  paragraphs: [createParagraph()]
});

const initialForm = {
  title: "",
  headings: [createHeading()],
  categories: [createCategory()]
};

function AddTopicForm({ onAddTopic }) {
  const [form, setForm] = useState(initialForm);
  const [submitError, setSubmitError] = useState("");

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateHeadingField = (index, field, value) => {
    setForm((prev) => {
      const headings = [...prev.headings];
      headings[index] = { ...headings[index], [field]: value };
      return { ...prev, headings };
    });
  };

  const addHeading = () => {
    setForm((prev) => ({ ...prev, headings: [...prev.headings, createHeading()] }));
  };

  const removeHeading = (indexToRemove) => {
    setForm((prev) => {
      if (prev.headings.length === 1) return prev;
      return {
        ...prev,
        headings: prev.headings.filter((_, index) => index !== indexToRemove)
      };
    });
  };

  const addTag = (headingIndex) => {
    setForm((prev) => {
      const headings = [...prev.headings];
      const heading = headings[headingIndex];
      const tag = heading.tagInput.trim();

      if (!tag) return prev;

      headings[headingIndex] = {
        ...heading,
        tags: [...heading.tags, tag],
        tagInput: ""
      };
      return { ...prev, headings };
    });
  };

  const removeTag = (headingIndex, tagIndex) => {
    setForm((prev) => {
      const headings = [...prev.headings];
      const nextTags = headings[headingIndex].tags.filter((_, index) => index !== tagIndex);
      headings[headingIndex] = { ...headings[headingIndex], tags: nextTags };
      return { ...prev, headings };
    });
  };

  const addCategory = () => {
    setForm((prev) => ({ ...prev, categories: [...prev.categories, createCategory()] }));
  };

  const removeCategory = (indexToRemove) => {
    setForm((prev) => {
      if (prev.categories.length === 1) return prev;
      return {
        ...prev,
        categories: prev.categories.filter((_, index) => index !== indexToRemove)
      };
    });
  };

  const updateCategoryField = (categoryIndex, field, value) => {
    setForm((prev) => {
      const categories = [...prev.categories];
      categories[categoryIndex] = { ...categories[categoryIndex], [field]: value };
      return { ...prev, categories };
    });
  };

  const updateParagraphField = (categoryIndex, paragraphIndex, field, value) => {
    setForm((prev) => {
      const categories = [...prev.categories];
      const paragraphs = [...categories[categoryIndex].paragraphs];
      paragraphs[paragraphIndex] = { ...paragraphs[paragraphIndex], [field]: value };
      categories[categoryIndex] = { ...categories[categoryIndex], paragraphs };
      return { ...prev, categories };
    });
  };

  const addParagraph = (categoryIndex) => {
    setForm((prev) => {
      const categories = [...prev.categories];
      categories[categoryIndex] = {
        ...categories[categoryIndex],
        paragraphs: [...categories[categoryIndex].paragraphs, createParagraph()]
      };
      return { ...prev, categories };
    });
  };

  const removeParagraph = (categoryIndex, paragraphIndexToRemove) => {
    setForm((prev) => {
      const categories = [...prev.categories];
      const paragraphs = categories[categoryIndex].paragraphs;
      if (paragraphs.length === 1) return prev;
      categories[categoryIndex] = {
        ...categories[categoryIndex],
        paragraphs: paragraphs.filter((_, index) => index !== paragraphIndexToRemove)
      };
      return { ...prev, categories };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const hasValidHeading = form.headings.every(
      (heading) => heading.mainTitle.trim() && heading.subTitle.trim() && heading.description.trim()
    );
    const hasValidCategory = form.categories.every(
      (category) =>
        category.name.trim() &&
        category.paragraphs.length > 0 &&
        category.paragraphs.every(
          (paragraph) => paragraph.title.trim() && paragraph.description.trim()
        )
    );

    if (!hasValidHeading || !hasValidCategory) {
      setSubmitError("Please complete all heading, category, and paragraph fields.");
      return;
    }

    setSubmitError("");
    onAddTopic(form);
    setForm(initialForm);
  };

  return (
    <section className="panel">
      <h2 className="panel-title">Add New Learning Topic</h2>
      <form className="topic-form" onSubmit={onSubmit}>
        <input
          name="title"
          placeholder="Main topic title"
          value={form.title}
          onChange={onChange}
          required
        />

        <div className="nested-section">
          <h3>Heading Sections</h3>
          {form.headings.map((heading, headingIndex) => (
            <div key={`heading-${headingIndex}`} className="nested-card">
              <div className="inline-actions">
                <h4>Heading {headingIndex + 1}</h4>
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => removeHeading(headingIndex)}
                  disabled={form.headings.length === 1}
                >
                  Delete Heading
                </button>
              </div>
              <input
                placeholder="Main title"
                value={heading.mainTitle}
                onChange={(event) =>
                  updateHeadingField(headingIndex, "mainTitle", event.target.value)
                }
                required
              />
              <input
                placeholder="Sub title"
                value={heading.subTitle}
                onChange={(event) =>
                  updateHeadingField(headingIndex, "subTitle", event.target.value)
                }
                required
              />
              <textarea
                placeholder="Description"
                value={heading.description}
                onChange={(event) =>
                  updateHeadingField(headingIndex, "description", event.target.value)
                }
                required
              />
              <div className="tag-editor">
                <input
                  placeholder="Add tag"
                  value={heading.tagInput}
                  onChange={(event) =>
                    updateHeadingField(headingIndex, "tagInput", event.target.value)
                  }
                />
                <button type="button" onClick={() => addTag(headingIndex)}>
                  Add Tag
                </button>
              </div>
              <div className="tag-list">
                {heading.tags.map((tag, tagIndex) => (
                  <button
                    key={`${tag}-${tagIndex}`}
                    type="button"
                    className="tag-chip"
                    onClick={() => removeTag(headingIndex, tagIndex)}
                  >
                    {tag} x
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button type="button" onClick={addHeading}>
            Add Heading Section
          </button>
        </div>

        <div className="nested-section">
          <h3>Categories</h3>
          {form.categories.map((category, categoryIndex) => (
            <div key={`category-${categoryIndex}`} className="nested-card">
              <div className="inline-actions">
                <h4>Category {categoryIndex + 1}</h4>
                <button
                  type="button"
                  className="danger-button"
                  onClick={() => removeCategory(categoryIndex)}
                  disabled={form.categories.length === 1}
                >
                  Delete Category
                </button>
              </div>
              <input
                placeholder="Category title"
                value={category.name}
                onChange={(event) =>
                  updateCategoryField(categoryIndex, "name", event.target.value)
                }
                required
              />

              {category.paragraphs.map((paragraph, paragraphIndex) => (
                <div key={`paragraph-${paragraphIndex}`} className="paragraph-card">
                  <div className="inline-actions">
                    <h4>Paragraph {paragraphIndex + 1}</h4>
                    <button
                      type="button"
                      className="danger-button"
                      onClick={() => removeParagraph(categoryIndex, paragraphIndex)}
                      disabled={category.paragraphs.length === 1}
                    >
                      Delete Paragraph
                    </button>
                  </div>
                  <input
                    placeholder="Paragraph title"
                    value={paragraph.title}
                    onChange={(event) =>
                      updateParagraphField(
                        categoryIndex,
                        paragraphIndex,
                        "title",
                        event.target.value
                      )
                    }
                    required
                  />
                  <textarea
                    placeholder="Paragraph description"
                    value={paragraph.description}
                    onChange={(event) =>
                      updateParagraphField(
                        categoryIndex,
                        paragraphIndex,
                        "description",
                        event.target.value
                      )
                    }
                    required
                  />
                </div>
              ))}

              <button type="button" onClick={() => addParagraph(categoryIndex)}>
                Add Paragraph
              </button>
            </div>
          ))}
          <button type="button" onClick={addCategory}>
            Add Category
          </button>
        </div>

        {submitError ? <p className="error-text">{submitError}</p> : null}
        <button type="submit">Add Topic</button>
      </form>
    </section>
  );
}

export default AddTopicForm;
