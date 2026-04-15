var cur = 0, done = {};

var sections = [

// ─── SECTION 1 ───────────────────────────────────────────────────────────────
{ phase:"Phase 1 · Foundations", title:"JSX & Component Basics", time:"15 min", html:`
<div class="intro-box"><div class="intro-icon">⚛️</div><div class="intro-text"><strong>JSX</strong> is syntactic sugar over <code>React.createElement()</code>. Components are plain JavaScript functions that accept props and return JSX. Everything in React is built on this foundation.</div></div>
<div class="time-badge">⏱ ~15 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>JSX Syntax Rules</h4></div>
  <div class="topic-desc">
    <p>JSX looks like HTML but it compiles to JavaScript. There are a few important rules to know:</p>
    <ul>
      <li><strong>Single root element:</strong> Every component must return one root element. Use a Fragment <code>&lt;&gt;...&lt;/&gt;</code> to group elements without adding an extra DOM node.</li>
      <li><strong>className not class:</strong> Since JSX compiles to JS, <code>class</code> is a reserved word. Use <code>className</code> for CSS classes.</li>
      <li><strong>Self-closing tags:</strong> All tags must be closed — either <code>&lt;img /&gt;</code> or <code>&lt;img&gt;&lt;/img&gt;</code>.</li>
      <li><strong>JS expressions:</strong> Wrap any JS expression in curly braces <code>{ }</code>. You can use variables, function calls, ternaries — but not statements like <code>if/for</code>.</li>
      <li><strong>camelCase attributes:</strong> HTML attributes are camelCased in JSX — <code>onClick</code>, <code>onChange</code>, <code>htmlFor</code>, <code>tabIndex</code>.</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>Function vs Class Components</h4></div>
  <div class="topic-desc">
    <p><strong>Function components</strong> are plain JS functions. They are the modern standard — simpler, shorter, and support Hooks. Always prefer them.</p>
    <p><strong>Class components</strong> extend <code>React.Component</code> and use <code>this.state</code> and lifecycle methods like <code>componentDidMount</code>. You'll encounter them in older codebases but should not write new ones. The only remaining use case for class components is <strong>Error Boundaries</strong>, which cannot yet be written as function components.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>Props</h4></div>
  <div class="topic-desc">
    <p>Props are the inputs to a component — they are passed from parent to child, and are <strong>read-only</strong>. A component must never modify its own props.</p>
    <ul>
      <li>Destructure props in the function signature for cleaner code: <code>function Card({ title, body })</code></li>
      <li>Set default values inline: <code>function Button({ color = 'blue' })</code></li>
      <li>Pass any JS value — strings, numbers, objects, arrays, functions, even other components</li>
      <li>The special <code>children</code> prop holds whatever is placed between opening and closing tags</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>Conditional Rendering</h4></div>
  <div class="topic-desc">
    <p>React has no special templating directives — you use plain JavaScript to conditionally render UI:</p>
    <ul>
      <li><strong>&amp;&amp; operator:</strong> <code>{isLoggedIn &amp;&amp; &lt;Dashboard /&gt;}</code> — renders only if the left side is truthy. Watch out: <code>{0 &amp;&amp; ...}</code> will render "0"!</li>
      <li><strong>Ternary:</strong> <code>{isAdmin ? &lt;AdminView /&gt; : &lt;UserView /&gt;}</code> — good for either/or rendering.</li>
      <li><strong>Early return:</strong> Return <code>null</code> early in the function to skip rendering entirely.</li>
      <li><strong>Variable:</strong> Assign JSX to a variable and render the variable — great for complex logic.</li>
    </ul>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// Full component example</div><pre>
<span class="cm">// Good: destructured props, default value, conditional</span>
<span class="kw">function</span> <span class="fn">UserCard</span>({ name, role = <span class="st">'User'</span>, isAdmin }) {
  <span class="kw">if</span> (!name) <span class="kw">return</span> <span class="kw">null</span>; <span class="cm">// early return</span>

  <span class="kw">return</span> (
    <span class="jx">&lt;&gt;</span>
      <span class="jx">&lt;h2&gt;</span>{name}<span class="jx">&lt;/h2&gt;</span>
      <span class="jx">&lt;p className=</span><span class="st">"role"</span><span class="jx">&gt;</span>{role}<span class="jx">&lt;/p&gt;</span>
      {isAdmin &amp;&amp; <span class="jx">&lt;span className=</span><span class="st">"badge"</span><span class="jx">&gt;</span>Admin<span class="jx">&lt;/span&gt;</span>}
    <span class="jx">&lt;/&gt;</span>
  );
}

<span class="cm">// Rendering lists — always add key!</span>
<span class="kw">function</span> <span class="fn">List</span>({ items }) {
  <span class="kw">return</span> (
    <span class="jx">&lt;ul&gt;</span>
      {items.map(item =&gt; (
        <span class="jx">&lt;li key=</span>{item.id}<span class="jx">&gt;</span>{item.name}<span class="jx">&lt;/li&gt;</span>
      ))}
    <span class="jx">&lt;/ul&gt;</span>
  );
}
</pre></div>

<div class="tip"><strong>Key mental model:</strong> React re-renders a component any time its props or state change. A render is just the function being called again — it's fast because React diffs the output against the previous render.</div>

<div class="checklist">
  <div class="ci"><span class="cb">▸</span>JSX must have one root — use &lt;&gt;&lt;/&gt; Fragment to avoid extra DOM nodes</div>
  <div class="ci"><span class="cb">▸</span>Use className, htmlFor, tabIndex — not class, for, tabindex</div>
  <div class="ci"><span class="cb">▸</span>Props are read-only — a component must never mutate its props</div>
  <div class="ci"><span class="cb">▸</span>Always add a key when rendering lists — use a stable unique id, not array index</div>
  <div class="ci"><span class="cb">▸</span>Component names must start with a capital letter — lowercase = HTML element</div>
</div>
`},

// ─── SECTION 2 ───────────────────────────────────────────────────────────────
{ phase:"Phase 1 · Foundations", title:"useState & State Management", time:"15 min", html:`
<div class="intro-box"><div class="intro-icon">🔄</div><div class="intro-text"><strong>useState</strong> lets a component remember values between renders. When you call the setter, React schedules a re-render with the new state. The golden rule: <strong>never mutate state directly</strong> — always use the setter.</div></div>
<div class="time-badge">⏱ ~15 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>useState Basics</h4></div>
  <div class="topic-desc">
    <p><code>useState(initialValue)</code> returns a pair: the current state value and a setter function. The initial value is only used on the very first render.</p>
    <ul>
      <li>The setter causes a re-render and the component sees the new value next render</li>
      <li>State updates are <strong>asynchronous</strong> — reading state right after calling the setter still gives you the old value</li>
      <li>If you call the setter with the same value (by reference), React bails out — no re-render</li>
      <li>Pass a function to <code>useState</code> for <strong>lazy initialization</strong>: <code>useState(() =&gt; expensiveComputation())</code> — runs only once</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>Functional Updates</h4></div>
  <div class="topic-desc">
    <p>When new state depends on the previous state, always use the functional form: <code>setState(prev =&gt; nextValue)</code>.</p>
    <p>Why? React may batch multiple state updates. If you rely on reading state directly between updates, you can get stale values. The functional form receives the guaranteed latest state as the argument — making it safe in timers, async functions, and event handlers that run in rapid succession.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>Objects & Arrays in State</h4></div>
  <div class="topic-desc">
    <p>React uses <strong>shallow equality</strong> (<code>===</code>) to decide if state changed. If you mutate an object or array in place, React sees the same reference and skips the re-render.</p>
    <p>The solution: always create a new reference:</p>
    <ul>
      <li><strong>Objects:</strong> <code>setState(prev =&gt; ({ ...prev, name: 'new' }))</code></li>
      <li><strong>Add to array:</strong> <code>setState(prev =&gt; [...prev, newItem])</code></li>
      <li><strong>Remove from array:</strong> <code>setState(prev =&gt; prev.filter(i =&gt; i.id !== id))</code></li>
      <li><strong>Update item in array:</strong> <code>setState(prev =&gt; prev.map(i =&gt; i.id === id ? {...i, done: true} : i))</code></li>
    </ul>
    <p>For deeply nested state, consider <strong>Immer</strong> — it lets you write mutating code that produces immutable updates behind the scenes.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>Lifting State Up</h4></div>
  <div class="topic-desc">
    <p>When two sibling components need to share the same state, <strong>lift it up</strong> to their closest common ancestor. The parent holds the state and passes it down as props. This is the core of React's data flow model.</p>
    <p>Signs you need to lift state: two components need to stay "in sync", or a child needs to trigger a change that another child needs to see.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// useState patterns</div><pre>
<span class="kw">function</span> <span class="fn">TodoApp</span>() {
  <span class="kw">const</span> [todos, setTodos] = useState([]);
  <span class="kw">const</span> [text, setText]   = useState(<span class="st">''</span>);

  <span class="cm">// Add — spread old array + new item</span>
  <span class="kw">const</span> <span class="fn">add</span> = () => {
    <span class="kw">if</span> (!text.trim()) <span class="kw">return</span>;
    setTodos(prev => [...prev, { id: Date.now(), text, done: <span class="kw">false</span> }]);
    setText(<span class="st">''</span>);
  };

  <span class="cm">// Toggle — map to find and update one item</span>
  <span class="kw">const</span> <span class="fn">toggle</span> = (id) =>
    setTodos(prev => prev.map(t => t.id === id ? {...t, done: !t.done} : t));

  <span class="cm">// Remove — filter out the item</span>
  <span class="kw">const</span> <span class="fn">remove</span> = (id) =>
    setTodos(prev => prev.filter(t => t.id !== id));

  <span class="kw">return</span> (
    <span class="jx">&lt;div&gt;</span>
      <span class="jx">&lt;input</span> value={text} onChange={e => setText(e.target.value)} <span class="jx">/&gt;</span>
      <span class="jx">&lt;button</span> onClick={add}<span class="jx">&gt;</span>Add<span class="jx">&lt;/button&gt;</span>
      {todos.map(t => (
        <span class="jx">&lt;div</span> key={t.id}<span class="jx">&gt;</span>
          <span class="jx">&lt;input</span> type=<span class="st">"checkbox"</span> checked={t.done} onChange={() => toggle(t.id)} <span class="jx">/&gt;</span>
          <span class="jx">&lt;span</span> style={{textDecoration: t.done ? <span class="st">'line-through'</span> : <span class="st">'none'</span>}}<span class="jx">&gt;</span>{t.text}<span class="jx">&lt;/span&gt;</span>
          <span class="jx">&lt;button</span> onClick={() => remove(t.id)}<span class="jx">&gt;</span>✕<span class="jx">&lt;/button&gt;</span>
        <span class="jx">&lt;/div&gt;</span>
      ))}
    <span class="jx">&lt;/div&gt;</span>
  );
}
</pre></div>

<div class="pill-row">
  <div class="pill"><h5>State is local & isolated</h5><p>Two &lt;Counter /&gt; components each have their own count. They do not share state unless it is lifted up to a common parent.</p></div>
  <div class="pill"><h5>React 18 auto-batching</h5><p>Multiple setState calls in the same event handler are batched into one render. React 18 extends this to async functions and timers too.</p></div>
</div>
`},

// ─── SECTION 3 ───────────────────────────────────────────────────────────────
{ phase:"Phase 1 · Foundations", title:"useEffect & Side Effects", time:"20 min", html:`
<div class="intro-box"><div class="intro-icon">🌊</div><div class="intro-text"><strong>useEffect</strong> lets you perform side effects after React renders — fetching data, setting up subscriptions, or touching the DOM. It is the most misunderstood hook, mostly because the dependency array is so easy to get wrong.</div></div>
<div class="time-badge">⏱ ~20 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>The 3 Forms of useEffect</h4></div>
  <div class="topic-desc">
    <ul>
      <li><strong>No dep array:</strong> Runs after every single render. Rarely what you want — only use for things that must sync on every render (e.g. updating the document title).</li>
      <li><strong>Empty dep array <code>[]</code>:</strong> Runs once, after the first render (like componentDidMount). Good for one-time setup: fetch initial data, set up global listeners.</li>
      <li><strong>Dep array with values:</strong> Runs after the first render and again any time a dependency changes. React does a shallow comparison of each dep — if any changed, the effect re-runs.</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>Cleanup Functions</h4></div>
  <div class="topic-desc">
    <p>Return a function from useEffect to clean up before the effect re-runs or the component unmounts. Without cleanup you get memory leaks and bugs.</p>
    <p><strong>Always clean up:</strong></p>
    <ul>
      <li>Timers: <code>clearTimeout</code> / <code>clearInterval</code></li>
      <li>Event listeners: <code>removeEventListener</code></li>
      <li>WebSocket connections: <code>socket.close()</code></li>
      <li>Fetch requests: <code>AbortController.abort()</code> — prevents setting state on unmounted components</li>
      <li>Subscriptions: call the unsubscribe function</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>The Stale Closure Trap</h4></div>
  <div class="topic-desc">
    <p>A "stale closure" happens when an effect captures a value from a previous render and keeps using it even after it changes. This is the most common useEffect bug.</p>
    <p>Example: if you read <code>count</code> inside an effect but don't include it in the dep array, the effect will always see the initial value of <code>count</code> — it was "frozen" when the effect was created.</p>
    <p><strong>Fixes:</strong></p>
    <ul>
      <li>Add the value to the dep array (correct deps = no stale closures)</li>
      <li>Use the functional updater form <code>setState(prev =&gt; ...)</code> so you don't need to read the value at all</li>
      <li>Use a <code>ref</code> to store the latest value (for callbacks that should never change but need current values)</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>StrictMode & Double Invocation</h4></div>
  <div class="topic-desc">
    <p>In React 18 development mode, <code>StrictMode</code> intentionally mounts → unmounts → remounts every component. This means your effects run <strong>twice</strong> on the first render.</p>
    <p>This is not a bug — it's React exposing issues with missing cleanup. If your app breaks with double-invocation, your cleanup function is missing or wrong. Fix the cleanup, not the StrictMode.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// useEffect — practical patterns</div><pre>
<span class="cm">// Fetch with cleanup (prevents setting state after unmount)</span>
<span class="kw">function</span> <span class="fn">UserProfile</span>({ userId }) {
  <span class="kw">const</span> [user, setUser] = useState(<span class="kw">null</span>);
  <span class="kw">const</span> [loading, setLoading] = useState(<span class="kw">true</span>);

  useEffect(() => {
    <span class="kw">const</span> <span class="vr">controller</span> = <span class="kw">new</span> AbortController();
    setLoading(<span class="kw">true</span>);

    fetch(<span class="st">/api/users/\${userId}</span>, { signal: controller.signal })
      .then(r => r.json())
      .then(data => {
        setUser(data);
        setLoading(<span class="kw">false</span>);
      })
      .catch(err => {
        <span class="kw">if</span> (err.name !== <span class="st">'AbortError'</span>) console.error(err);
      });

    <span class="kw">return</span> () => controller.abort(); <span class="cm">// cleanup: cancel fetch</span>
  }, [userId]); <span class="cm">// re-fetch when userId changes</span>

  <span class="kw">if</span> (loading) <span class="kw">return</span> <span class="jx">&lt;Spinner /&gt;</span>;
  <span class="kw">return</span> <span class="jx">&lt;div&gt;</span>{user?.name}<span class="jx">&lt;/div&gt;</span>;
}

<span class="cm">// Sync with external system (event listener + cleanup)</span>
<span class="kw">function</span> <span class="fn">WindowSize</span>() {
  <span class="kw">const</span> [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    <span class="kw">const</span> <span class="fn">update</span> = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener(<span class="st">'resize'</span>, update);
    <span class="kw">return</span> () => window.removeEventListener(<span class="st">'resize'</span>, update);
  }, []); <span class="cm">// empty deps: set up once</span>

  <span class="kw">return</span> <span class="jx">&lt;p&gt;</span>{size.w} × {size.h}<span class="jx">&lt;/p&gt;</span>;
}
</pre></div>

<div class="tip"><strong>The eslint-plugin-react-hooks rule:</strong> The <code>exhaustive-deps</code> eslint rule will warn you whenever you use a value inside an effect without listing it as a dependency. Enable it — it catches the stale closure bug automatically.</div>
`},

// ─── SECTION 4 ───────────────────────────────────────────────────────────────
{ phase:"Phase 2 · Core Hooks", title:"useRef, useMemo & useCallback", time:"20 min", html:`
<div class="intro-box"><div class="intro-icon">🎯</div><div class="intro-text">These three hooks are about <strong>control and performance</strong>. <code>useRef</code> is an escape hatch for values that need to persist without causing re-renders. <code>useMemo</code> and <code>useCallback</code> are optimization tools — use them only after profiling.</div></div>
<div class="time-badge">⏱ ~20 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>useRef — Two Use Cases</h4></div>
  <div class="topic-desc">
    <p><code>useRef(initialValue)</code> returns a mutable object <code>{ current: initialValue }</code>. Changing <code>.current</code> does <strong>not</strong> trigger a re-render.</p>
    <p><strong>Use case 1 — DOM access:</strong> Attach a ref to a JSX element with <code>ref={myRef}</code>. After mount, <code>myRef.current</code> points to the real DOM node. Use this for focus management, measuring element size, or integrating third-party DOM libraries.</p>
    <p><strong>Use case 2 — Mutable instance variable:</strong> Store any value that needs to persist across renders but whose changes should not cause a re-render. Classic examples: timer IDs (so you can clear them), previous prop/state values, a flag to track if the component is mounted, and stable references to callbacks used inside event listeners.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>useMemo — Cache Expensive Values</h4></div>
  <div class="topic-desc">
    <p><code>useMemo(() =&gt; computation, deps)</code> runs the function and caches the result. It only recomputes when a dependency changes.</p>
    <p><strong>When to use:</strong></p>
    <ul>
      <li>Expensive computations (sorting/filtering large arrays, complex math)</li>
      <li>Creating a new object/array that is passed as a prop to a <code>React.memo</code> child — without useMemo a new reference is created every render, defeating React.memo</li>
    </ul>
    <p><strong>When NOT to use:</strong> For simple operations (string concatenation, basic arithmetic). The overhead of useMemo itself outweighs the benefit. Always profile first with React DevTools Profiler.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>useCallback — Stable Function References</h4></div>
  <div class="topic-desc">
    <p><code>useCallback(fn, deps)</code> returns the same function reference between renders as long as dependencies haven't changed.</p>
    <p>Functions defined inside a component are recreated every render. This is fine in most cases. The problem arises when you pass a function as a prop to a child wrapped in <code>React.memo</code> — a new function reference every render means React.memo never bails out.</p>
    <p><strong>Use useCallback when:</strong> the function is passed as a prop to a memoized child, or listed as a dependency of another hook (useEffect, useMemo) and you want it to be stable.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>React.memo</h4></div>
  <div class="topic-desc">
    <p><code>React.memo(Component)</code> wraps a component so it only re-renders when its props change (shallow comparison). It is the component-level equivalent of <code>useMemo</code>.</p>
    <p>It works best when: the component is pure (same props = same output), renders often, and the parent re-renders frequently. Pair it with <code>useCallback</code> for function props and <code>useMemo</code> for object/array props — otherwise the new references break the memoization.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// useRef, useMemo, useCallback together</div><pre>
<span class="kw">function</span> <span class="fn">SearchList</span>({ items }) {
  <span class="kw">const</span> [query, setQuery] = useState(<span class="st">''</span>);
  <span class="kw">const</span> <span class="vr">inputRef</span> = useRef(<span class="kw">null</span>); <span class="cm">// DOM ref</span>
  <span class="kw">const</span> <span class="vr">renderCount</span> = useRef(<span class="nm">0</span>); <span class="cm">// mutable, no re-render</span>
  renderCount.current++;

  <span class="cm">// Only re-filters when items or query changes</span>
  <span class="kw">const</span> <span class="vr">filtered</span> = useMemo(
    () => items.filter(i => i.name.toLowerCase().includes(query.toLowerCase())),
    [items, query]
  );

  <span class="cm">// Stable reference — won't break memoized child</span>
  <span class="kw">const</span> <span class="fn">handleSelect</span> = useCallback((id) => {
    console.log(<span class="st">'selected'</span>, id);
  }, []); <span class="cm">// no deps — function never needs to change</span>

  <span class="kw">return</span> (
    <span class="jx">&lt;div&gt;</span>
      <span class="jx">&lt;button</span> onClick={() => inputRef.current.focus()}<span class="jx">&gt;</span>Focus<span class="jx">&lt;/button&gt;</span>
      <span class="jx">&lt;input</span> ref={inputRef} value={query}
             onChange={e => setQuery(e.target.value)} <span class="jx">/&gt;</span>
      <span class="jx">&lt;p&gt;</span>Rendered {renderCount.current} times<span class="jx">&lt;/p&gt;</span>
      {filtered.map(i => (
        <span class="jx">&lt;MemoizedItem</span> key={i.id} item={i} onSelect={handleSelect} <span class="jx">/&gt;</span>
      ))}
    <span class="jx">&lt;/div&gt;</span>
  );
}

<span class="cm">// Only re-renders when item or onSelect reference changes</span>
<span class="kw">const</span> <span class="fn">MemoizedItem</span> = React.memo(({ item, onSelect }) => (
  <span class="jx">&lt;div</span> onClick={() => onSelect(item.id)}<span class="jx">&gt;</span>{item.name}<span class="jx">&lt;/div&gt;</span>
));
</pre></div>

<div class="tip"><strong>The golden rule of optimization:</strong> Measure first. Open React DevTools Profiler, record an interaction, and see which components are rendering and why. Most React apps don't need useMemo/useCallback — add them only where profiling shows a real bottleneck.</div>
`},

// ─── SECTION 5 ───────────────────────────────────────────────────────────────
{ phase:"Phase 2 · Core Hooks", title:"Context API & useReducer", time:"20 min", html:`
<div class="intro-box"><div class="intro-icon">🗂️</div><div class="intro-text"><strong>Context</strong> lets you pass data through the component tree without prop drilling. <strong>useReducer</strong> is like useState but for complex state with multiple sub-values or transition logic. Together they can replace Redux for many apps.</div></div>
<div class="time-badge">⏱ ~20 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>Context API — How It Works</h4></div>
  <div class="topic-desc">
    <p>Context has three parts:</p>
    <ul>
      <li><strong>createContext(defaultValue):</strong> Creates the context object. The default value is only used when a component has no matching Provider above it in the tree.</li>
      <li><strong>Context.Provider value={...}:</strong> Wraps part of the tree and provides the value. Any descendant can consume it.</li>
      <li><strong>useContext(MyContext):</strong> Subscribes to the context. When the Provider's value changes, every consumer re-renders.</li>
    </ul>
    <p><strong>Best practice:</strong> Always wrap useContext in a custom hook (e.g. <code>useAuth</code>) that validates the context exists. This gives a clear error message if used outside the Provider and provides a clean API.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>Context Performance & Splitting</h4></div>
  <div class="topic-desc">
    <p>Any time the Provider's <code>value</code> changes, <strong>every consumer re-renders</strong> — even if they only care about one part of the value that didn't change.</p>
    <p><strong>Fix: split contexts by update frequency.</strong> A common pattern is to separate state and dispatch into two contexts:</p>
    <ul>
      <li><code>StateContext</code> — holds the state (changes often)</li>
      <li><code>DispatchContext</code> — holds the dispatch function (never changes)</li>
    </ul>
    <p>Components that only dispatch actions consume <code>DispatchContext</code> and never re-render when state changes. This is the pattern used by React itself internally.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>useReducer — Redux-style State</h4></div>
  <div class="topic-desc">
    <p><code>useReducer(reducer, initialState)</code> returns <code>[state, dispatch]</code>. You dispatch action objects and the reducer function decides how to transform state.</p>
    <p><strong>When to prefer useReducer over useState:</strong></p>
    <ul>
      <li>Multiple related state values that change together (e.g. form fields, loading/error/data)</li>
      <li>The next state depends on the previous in complex ways</li>
      <li>State transitions that benefit from being named and explicit (action types)</li>
      <li>When you want to easily test state logic in isolation (reducers are pure functions)</li>
    </ul>
    <p>The reducer must be a <strong>pure function</strong> — no side effects, always return new state (never mutate).</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// Context + useReducer — auth example</div><pre>
<span class="kw">const</span> <span class="vr">StateCtx</span>    = createContext();
<span class="kw">const</span> <span class="vr">DispatchCtx</span> = createContext();

<span class="kw">function</span> <span class="fn">authReducer</span>(state, action) {
  <span class="kw">switch</span> (action.type) {
    <span class="kw">case</span> <span class="st">'LOGIN'</span>:  <span class="kw">return</span> { ...state, user: action.payload, loading: <span class="kw">false</span> };
    <span class="kw">case</span> <span class="st">'LOGOUT'</span>: <span class="kw">return</span> { user: <span class="kw">null</span>, loading: <span class="kw">false</span> };
    <span class="kw">case</span> <span class="st">'LOADING'</span>:<span class="kw">return</span> { ...state, loading: <span class="kw">true</span> };
    <span class="kw">default</span>:       <span class="kw">return</span> state;
  }
}

<span class="kw">function</span> <span class="fn">AuthProvider</span>({ children }) {
  <span class="kw">const</span> [state, dispatch] = useReducer(authReducer, { user: <span class="kw">null</span>, loading: <span class="kw">false</span> });
  <span class="kw">return</span> (
    <span class="jx">&lt;DispatchCtx.Provider</span> value={dispatch}<span class="jx">&gt;</span>
      <span class="jx">&lt;StateCtx.Provider</span> value={state}<span class="jx">&gt;</span>
        {children}
      <span class="jx">&lt;/StateCtx.Provider&gt;</span>
    <span class="jx">&lt;/DispatchCtx.Provider&gt;</span>
  );
}

<span class="cm">// Custom hooks for clean consumption</span>
<span class="kw">const</span> <span class="fn">useAuthState</span>    = () => useContext(StateCtx);
<span class="kw">const</span> <span class="fn">useAuthDispatch</span> = () => useContext(DispatchCtx);

<span class="cm">// In a component — only re-renders on state changes</span>
<span class="kw">function</span> <span class="fn">LoginButton</span>() {
  <span class="kw">const</span> dispatch = useAuthDispatch(); <span class="cm">// never re-renders from state</span>
  <span class="kw">return</span> <span class="jx">&lt;button</span> onClick={() => dispatch({ type: <span class="st">'LOADING'</span> })}<span class="jx">&gt;</span>Login<span class="jx">&lt;/button&gt;</span>;
}
</pre></div>

<div class="tip"><strong>Context vs Zustand:</strong> Context is not a state manager — it's a way to avoid prop drilling. When your context starts having complex update logic or performance issues, reach for Zustand. It's simpler than Redux and has built-in shallow comparison to avoid unnecessary re-renders.</div>
`},

// ─── SECTION 6 ───────────────────────────────────────────────────────────────
{ phase:"Phase 2 · Core Hooks", title:"Custom Hooks", time:"15 min", html:`
<div class="intro-box"><div class="intro-icon">🪝</div><div class="intro-text"><strong>Custom hooks</strong> are the primary way to share stateful logic in React. They are just functions that start with <code>use</code> and call other hooks. They let you extract complex logic from components and reuse it anywhere.</div></div>
<div class="time-badge">⏱ ~15 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-hook">Hook</span><h4>What Makes a Custom Hook</h4></div>
  <div class="topic-desc">
    <p>A custom hook is simply a JavaScript function whose name starts with <code>use</code>. That prefix is not optional — React's linter uses it to know which functions are hooks and enforce the Rules of Hooks (no hooks inside loops, conditions, or nested functions).</p>
    <p>Key properties:</p>
    <ul>
      <li>Each call to a custom hook is completely <strong>isolated</strong> — two components using <code>useFetch</code> get their own separate state</li>
      <li>Can call any number of built-in or custom hooks internally</li>
      <li>Can return anything: a single value, an array like <code>[value, setter]</code>, an object <code>{data, loading, error}</code>, or functions</li>
      <li>Logic is extracted but state lifecycle is still tied to the component that calls it</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>When to Extract a Custom Hook</h4></div>
  <div class="topic-desc">
    <p>Extract a custom hook when:</p>
    <ul>
      <li>Two or more components contain the same stateful logic</li>
      <li>A component has a large useEffect that handles one distinct concern (e.g., a WebSocket connection)</li>
      <li>You want to make a component easier to read by hiding implementation details</li>
      <li>You want to make logic independently testable</li>
    </ul>
    <p><strong>Don't</strong> extract prematurely. Wait until you see the pattern repeated before abstracting.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// 4 essential custom hooks</div><pre>
<span class="cm">// 1. useFetch — async data with loading/error states</span>
<span class="kw">function</span> <span class="fn">useFetch</span>(url) {
  <span class="kw">const</span> [state, setState] = useState({ data: <span class="kw">null</span>, loading: <span class="kw">true</span>, error: <span class="kw">null</span> });
  useEffect(() => {
    setState(s => ({...s, loading: <span class="kw">true</span>}));
    <span class="kw">const</span> ctrl = <span class="kw">new</span> AbortController();
    fetch(url, { signal: ctrl.signal })
      .then(r => r.json())
      .then(data => setState({ data, loading: <span class="kw">false</span>, error: <span class="kw">null</span> }))
      .catch(error => setState({ data: <span class="kw">null</span>, loading: <span class="kw">false</span>, error }));
    <span class="kw">return</span> () => ctrl.abort();
  }, [url]);
  <span class="kw">return</span> state;
}

<span class="cm">// 2. useLocalStorage — state that survives page refresh</span>
<span class="kw">function</span> <span class="fn">useLocalStorage</span>(key, initial) {
  <span class="kw">const</span> [val, setVal] = useState(
    () => JSON.parse(localStorage.getItem(key)) ?? initial
  );
  <span class="kw">const</span> <span class="fn">set</span> = (v) => {
    setVal(v);
    localStorage.setItem(key, JSON.stringify(v));
  };
  <span class="kw">return</span> [val, set];
}

<span class="cm">// 3. useDebounce — delay until user stops typing</span>
<span class="kw">function</span> <span class="fn">useDebounce</span>(value, delay = <span class="nm">300</span>) {
  <span class="kw">const</span> [debounced, setDebounced] = useState(value);
  useEffect(() => {
    <span class="kw">const</span> t = setTimeout(() => setDebounced(value), delay);
    <span class="kw">return</span> () => clearTimeout(t);
  }, [value, delay]);
  <span class="kw">return</span> debounced;
}

<span class="cm">// 4. useToggle — boolean toggle helper</span>
<span class="kw">function</span> <span class="fn">useToggle</span>(initial = <span class="kw">false</span>) {
  <span class="kw">const</span> [on, setOn] = useState(initial);
  <span class="kw">const</span> <span class="fn">toggle</span> = useCallback(() => setOn(v => !v), []);
  <span class="kw">return</span> [on, toggle];
}

<span class="cm">// Usage — clean and readable</span>
<span class="kw">function</span> <span class="fn">SearchPage</span>() {
  <span class="kw">const</span> [query, setQuery] = useState(<span class="st">''</span>);
  <span class="kw">const</span> <span class="vr">debouncedQuery</span> = useDebounce(query, <span class="nm">400</span>);
  <span class="kw">const</span> { data, loading, error } = useFetch(<span class="st">/api/search?q=\${debouncedQuery}</span>);
  <span class="kw">const</span> [darkMode, toggleDark] = useToggle();
  ...
}
</pre></div>

<div class="checklist">
  <div class="ci"><span class="cb">▸</span>Must start with <code>use</code> — React enforces Rules of Hooks based on this</div>
  <div class="ci"><span class="cb">▸</span>Each invocation gets its own isolated state — not shared between callers</div>
  <div class="ci"><span class="cb">▸</span>Can call any hooks inside — useState, useEffect, other custom hooks</div>
  <div class="ci"><span class="cb">▸</span>React Query, SWR, react-hook-form, and Zustand all expose custom hooks</div>
  <div class="ci"><span class="cb">▸</span>Extract when logic is repeated or when a component gets too complex</div>
</div>
`},

// ─── SECTION 7 ───────────────────────────────────────────────────────────────
{ phase:"Phase 3 · Patterns", title:"Component Patterns & Architecture", time:"20 min", html:`
<div class="intro-box"><div class="intro-icon">🏗️</div><div class="intro-text">Design patterns solve recurring architecture problems. Understanding these patterns lets you build flexible, composable component APIs that are easy to extend without rewriting from scratch.</div></div>
<div class="time-badge">⏱ ~20 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>Compound Components</h4></div>
  <div class="topic-desc">
    <p>Compound components work together as a group, sharing implicit state through Context. The parent manages the state; child components consume it. This gives the user of the component complete control over layout and composition.</p>
    <p>You see this in UI libraries: <code>&lt;Select&gt;</code> + <code>&lt;Select.Option&gt;</code>, <code>&lt;Tabs&gt;</code> + <code>&lt;Tabs.Tab&gt;</code> + <code>&lt;Tabs.Panel&gt;</code>.</p>
    <p><strong>Benefits:</strong> Flexible API (users control what renders and where), the parent doesn't need to pass state through every child prop, and the components are useless outside their context (enforced by throwing an error if useContext returns null).</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>Render Props</h4></div>
  <div class="topic-desc">
    <p>A component accepts a function as a prop (typically called <code>render</code> or <code>children</code>) and calls it with state, letting the parent decide what to render. This was the primary code-sharing pattern before hooks.</p>
    <p>Example: <code>&lt;Mouse render={({ x, y }) =&gt; &lt;Cursor x={x} y={y} /&gt;} /&gt;</code></p>
    <p>Custom hooks have largely replaced this pattern — a <code>useMouse</code> hook is simpler. However, render props are still useful when you need the logic to be tied to the component tree (e.g. when context is involved).</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-pattern">Pattern</span><h4>Higher-Order Components (HOC)</h4></div>
  <div class="topic-desc">
    <p>A HOC is a function that takes a component and returns a new enhanced component. It wraps the original to add behaviour — like authentication guards, logging, or data fetching.</p>
    <p>Example: <code>const AuthRoute = withAuth(DashboardPage);</code></p>
    <p>HOCs are now mostly replaced by hooks and custom hooks, but you still encounter them in older codebases (e.g., Redux's <code>connect()</code>, React Router's <code>withRouter()</code>). The main drawback is that they can create "wrapper hell" and make the component tree hard to read in DevTools.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-concept">Concept</span><h4>Controlled vs Uncontrolled Components</h4></div>
  <div class="topic-desc">
    <p><strong>Controlled:</strong> React owns the form state. The input value is driven by state: <code>&lt;input value={state} onChange={setState} /&gt;</code>. Every keystroke updates state and triggers a re-render. You have full control — easy validation, transformations, and disabling.</p>
    <p><strong>Uncontrolled:</strong> The DOM owns the value. You read it via a ref when needed (e.g., on submit): <code>&lt;input ref={inputRef} /&gt;</code>. Simpler for basic forms but harder to do live validation.</p>
    <p><strong>react-hook-form</strong> uses an uncontrolled approach under the hood for performance, giving you the ergonomics of controlled inputs without the re-render on every keystroke.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// Compound components — full example</div><pre>
<span class="kw">const</span> <span class="vr">AccordionCtx</span> = createContext();

<span class="kw">function</span> <span class="fn">Accordion</span>({ children, defaultOpen = <span class="kw">null</span> }) {
  <span class="kw">const</span> [open, setOpen] = useState(defaultOpen);
  <span class="kw">const</span> <span class="fn">toggle</span> = (id) => setOpen(prev => prev === id ? <span class="kw">null</span> : id);
  <span class="kw">return</span> (
    <span class="jx">&lt;AccordionCtx.Provider</span> value={{ open, toggle }}<span class="jx">&gt;</span>
      <span class="jx">&lt;div className=</span><span class="st">"accordion"</span><span class="jx">&gt;</span>{children}<span class="jx">&lt;/div&gt;</span>
    <span class="jx">&lt;/AccordionCtx.Provider&gt;</span>
  );
}

Accordion.Item = <span class="kw">function</span> Item({ id, title, children }) {
  <span class="kw">const</span> { open, toggle } = useContext(AccordionCtx);
  <span class="kw">const</span> isOpen = open === id;
  <span class="kw">return</span> (
    <span class="jx">&lt;div&gt;</span>
      <span class="jx">&lt;button</span> onClick={() => toggle(id)}<span class="jx">&gt;</span>
        {title} {isOpen ? <span class="st">'▲'</span> : <span class="st">'▼'</span>}
      <span class="jx">&lt;/button&gt;</span>
      {isOpen &amp;&amp; <span class="jx">&lt;div className=</span><span class="st">"body"</span><span class="jx">&gt;</span>{children}<span class="jx">&lt;/div&gt;</span>}
    <span class="jx">&lt;/div&gt;</span>
  );
};

<span class="cm">// Usage — user controls layout completely</span>
<span class="jx">&lt;Accordion defaultOpen=</span><span class="st">"q1"</span><span class="jx">&gt;</span>
  <span class="jx">&lt;Accordion.Item</span> id=<span class="st">"q1"</span> title=<span class="st">"What is React?"</span><span class="jx">&gt;</span>
    A UI library for building component-based interfaces.
  <span class="jx">&lt;/Accordion.Item&gt;</span>
  <span class="jx">&lt;Accordion.Item</span> id=<span class="st">"q2"</span> title=<span class="st">"What are hooks?"</span><span class="jx">&gt;</span>
    Functions that let you use state in function components.
  <span class="jx">&lt;/Accordion.Item&gt;</span>
<span class="jx">&lt;/Accordion&gt;</span>
</pre></div>

<div class="tip"><strong>Architecture tip:</strong> Keep <strong>presentational components</strong> (pure UI, no data fetching, easily tested) separate from <strong>container components</strong> (data fetching, business logic). This makes components reusable across different data sources.</div>
`},

// ─── SECTION 8 ───────────────────────────────────────────────────────────────
{ phase:"Phase 3 · Patterns", title:"Performance Optimization", time:"20 min", html:`
<div class="intro-box"><div class="intro-icon">⚡</div><div class="intro-text">React is fast by default. The virtual DOM reconciliation is highly optimized. Don't optimize prematurely — profile first, then apply the right tool: code splitting, virtualization, or selective memoization.</div></div>
<div class="time-badge">⏱ ~20 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>Code Splitting & Lazy Loading</h4></div>
  <div class="topic-desc">
    <p>By default, a React app bundles everything into one JS file. Code splitting breaks it into smaller chunks that load on demand.</p>
    <p><code>React.lazy(() =&gt; import('./Component'))</code> creates a lazily loaded component. Wrap it in <code>&lt;Suspense fallback={...}&gt;</code> to show a loading state while the chunk downloads.</p>
    <p><strong>Best practices:</strong></p>
    <ul>
      <li>Split at the <strong>route level</strong> — each page/route as its own chunk is the highest impact split</li>
      <li>Split heavy optional features (rich text editors, charts, modals that aren't opened immediately)</li>
      <li>Don't split small components — the network overhead isn't worth it</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>List Virtualization</h4></div>
  <div class="topic-desc">
    <p>Rendering 1,000+ DOM nodes is slow. Virtualization renders only the items currently visible in the viewport. As you scroll, items outside the view are unmounted and new ones are mounted — maintaining a small, constant DOM size.</p>
    <p><strong>Libraries:</strong></p>
    <ul>
      <li><strong>@tanstack/react-virtual</strong> — headless, flexible, works with any layout</li>
      <li><strong>react-window</strong> — lightweight, good for fixed-size lists and grids</li>
    </ul>
    <p>Rule of thumb: virtualize when you have 200+ items and the list feels sluggish.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-perf">Performance</span><h4>Understanding Re-renders</h4></div>
  <div class="topic-desc">
    <p>A component re-renders when: its state changes, its props change, its parent re-renders (even if props didn't change!), or a context it consumes changes.</p>
    <p><strong>Common causes of unexpected re-renders:</strong></p>
    <ul>
      <li>Inline object/array props: <code>&lt;Child style={{color: 'red'}} /&gt;</code> creates a new object every render</li>
      <li>Inline function props: <code>&lt;Child onClick={() =&gt; ...} /&gt;</code> creates a new function every render</li>
      <li>Context value changing: if the value is an object and you don't memoize it, all consumers re-render every time the Provider re-renders</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-adv">Advanced</span><h4>React 18 Concurrent Features</h4></div>
  <div class="topic-desc">
    <p>React 18 introduced concurrent rendering — React can pause, interrupt, and restart renders to keep the UI responsive.</p>
    <ul>
      <li><strong>startTransition:</strong> Marks a state update as non-urgent. React will pause this update if more urgent work comes in (e.g., typing). Wrap slow updates like filtering a large list.</li>
      <li><strong>useTransition:</strong> Returns <code>[isPending, startTransition]</code>. Use <code>isPending</code> to show a loading indicator while the transition is in progress.</li>
      <li><strong>useDeferredValue:</strong> Accepts a value and returns a deferred version that lags behind. Use it to keep the input responsive while a slow list re-renders with the new value.</li>
    </ul>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// Concurrent features — keeping UI responsive</div><pre>
<span class="kw">function</span> <span class="fn">SearchPage</span>() {
  <span class="kw">const</span> [input, setInput]     = useState(<span class="st">''</span>);
  <span class="kw">const</span> [query, setQuery]     = useState(<span class="st">''</span>);
  <span class="kw">const</span> [isPending, startT]   = useTransition();

  <span class="kw">const</span> <span class="fn">handleChange</span> = (e) => {
    setInput(e.target.value);         <span class="cm">// urgent: update input immediately</span>
    startT(() => setQuery(e.target.value)); <span class="cm">// non-urgent: filter results</span>
  };

  <span class="kw">return</span> (
    <span class="jx">&lt;&gt;</span>
      <span class="jx">&lt;input</span> value={input} onChange={handleChange} <span class="jx">/&gt;</span>
      {isPending &amp;&amp; <span class="jx">&lt;Spinner /&gt;</span>}
      <span class="jx">&lt;ResultsList</span> query={query} <span class="jx">/&gt;</span>    <span class="cm">{/* slow render */}</span>
    <span class="jx">&lt;/&gt;</span>
  );
}

<span class="cm">// Alternative: useDeferredValue (no callback needed)</span>
<span class="kw">function</span> <span class="fn">SearchPageV2</span>() {
  <span class="kw">const</span> [query, setQuery] = useState(<span class="st">''</span>);
  <span class="kw">const</span> <span class="vr">deferred</span> = useDeferredValue(query); <span class="cm">// lags behind</span>
  <span class="kw">const</span> <span class="vr">isStale</span>   = deferred !== query;      <span class="cm">// show if outdated</span>
  <span class="kw">return</span> (
    <span class="jx">&lt;&gt;</span>
      <span class="jx">&lt;input</span> value={query} onChange={e => setQuery(e.target.value)} <span class="jx">/&gt;</span>
      <span class="jx">&lt;div</span> style={{opacity: isStale ? <span class="nm">0.5</span> : <span class="nm">1</span>}}<span class="jx">&gt;</span>
        <span class="jx">&lt;HeavyList</span> query={deferred} <span class="jx">/&gt;</span>
      <span class="jx">&lt;/div&gt;</span>
    <span class="jx">&lt;/&gt;</span>
  );
}
</pre></div>

<div class="tip"><strong>Performance checklist:</strong> (1) Use React DevTools Profiler to find slow renders. (2) Check if components are rendering unnecessarily. (3) Apply lazy loading for route-level splits. (4) Add virtualization for long lists. (5) Only then add useMemo/useCallback where the profiler confirms a benefit.</div>
`},

// ─── SECTION 9 ───────────────────────────────────────────────────────────────
{ phase:"Phase 4 · Advanced", title:"Advanced Patterns & Ecosystem", time:"25 min", html:`
<div class="intro-box"><div class="intro-icon">🚀</div><div class="intro-text">Production-grade React: error handling that doesn't crash the app, rendering outside the normal tree, the modern server-first paradigm, and the key libraries every React developer should know.</div></div>
<div class="time-badge">⏱ ~25 minutes</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-adv">Advanced</span><h4>Error Boundaries</h4></div>
  <div class="topic-desc">
    <p>An Error Boundary is a class component that catches JavaScript errors anywhere in its child tree, preventing the whole app from crashing. It must use two lifecycle methods: <code>getDerivedStateFromError</code> (to render fallback UI) and <code>componentDidCatch</code> (to log the error).</p>
    <p>Error Boundaries only catch errors during rendering, in lifecycle methods, and in constructors of child components. They do NOT catch errors in event handlers (use try/catch there) or async code.</p>
    <p><strong>react-error-boundary</strong> is the recommended npm package — it provides a functional API with <code>useErrorBoundary</code> hook and <code>resetErrorBoundary</code> for retry functionality.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-adv">Advanced</span><h4>Portals</h4></div>
  <div class="topic-desc">
    <p><code>ReactDOM.createPortal(children, domNode)</code> renders children into a different DOM node than the parent. The component still lives in the React tree (so events bubble normally and context works), but the DOM output is placed elsewhere.</p>
    <p><strong>When to use portals:</strong></p>
    <ul>
      <li>Modals and dialogs — render into <code>document.body</code> to escape overflow:hidden parents</li>
      <li>Tooltips and dropdowns — need to escape stacking contexts (z-index issues)</li>
      <li>Toast notifications — typically rendered at the root level</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-adv">Advanced</span><h4>React Server Components (RSC)</h4></div>
  <div class="topic-desc">
    <p>Server Components run exclusively on the server — they can directly access databases, file systems, and secrets. They send zero JavaScript to the client, reducing bundle size.</p>
    <p>Key rules:</p>
    <ul>
      <li>No hooks (no useState, useEffect) — they are not interactive</li>
      <li>No browser APIs (no window, document)</li>
      <li>Can be async — <code>async function Page() { const data = await fetch(...) }</code></li>
      <li>Add <code>'use client'</code> at the top of a file to make it a Client Component</li>
      <li>Client Components can import Server Components but not the reverse</li>
    </ul>
    <p>This is the default in <strong>Next.js App Router</strong>. Think of the component tree as a boundary: Server Components at the top doing data work, Client Components at the leaves for interactivity.</p>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-eco">Ecosystem</span><h4>React Query / SWR — Server State</h4></div>
  <div class="topic-desc">
    <p>Managing server state (remote data) with useEffect + useState is painful: loading states, error handling, caching, refetching, stale data, pagination. React Query and SWR solve all of this.</p>
    <p><strong>What you get for free:</strong></p>
    <ul>
      <li>Automatic caching — the same query is deduped across components</li>
      <li>Background refetching — stale data is refreshed when window regains focus</li>
      <li>Loading, error, and success states out of the box</li>
      <li>Optimistic updates — update the UI before the server responds</li>
      <li>Pagination and infinite scroll helpers</li>
    </ul>
  </div>
</div>

<div class="topic-detail">
  <div class="topic-detail-header"><span class="tag t-eco">Ecosystem</span><h4>Zustand — Global Client State</h4></div>
  <div class="topic-desc">
    <p>Zustand is a minimal state management library. You create a store with <code>create()</code> and access it from any component with a hook — no Provider, no boilerplate.</p>
    <p>Unlike Context, Zustand components only re-render when the specific slice of state they subscribe to changes (using shallow comparison or selectors). This makes it much more performant for global state that changes frequently.</p>
  </div>
</div>

<div class="code-block"><div class="code-lbl">// Advanced patterns — practical examples</div><pre>
<span class="cm">// Error Boundary with react-error-boundary</span>
<span class="kw">import</span> { ErrorBoundary } <span class="kw">from</span> <span class="st">'react-error-boundary'</span>;

<span class="kw">function</span> <span class="fn">Fallback</span>({ error, resetErrorBoundary }) {
  <span class="kw">return</span> (
    <span class="jx">&lt;div&gt;</span>
      <span class="jx">&lt;p&gt;</span>Something went wrong: {error.message}<span class="jx">&lt;/p&gt;</span>
      <span class="jx">&lt;button</span> onClick={resetErrorBoundary}<span class="jx">&gt;</span>Try again<span class="jx">&lt;/button&gt;</span>
    <span class="jx">&lt;/div&gt;</span>
  );
}
<span class="jx">&lt;ErrorBoundary</span> FallbackComponent={Fallback}<span class="jx">&gt;</span>
  <span class="jx">&lt;MyApp /&gt;</span>
<span class="jx">&lt;/ErrorBoundary&gt;</span>

<span class="cm">// Portal — modal that escapes DOM nesting</span>
<span class="kw">function</span> <span class="fn">Modal</span>({ isOpen, onClose, children }) {
  <span class="kw">if</span> (!isOpen) <span class="kw">return</span> <span class="kw">null</span>;
  <span class="kw">return</span> ReactDOM.createPortal(
    <span class="jx">&lt;div className=</span><span class="st">"modal-overlay"</span> onClick={onClose}<span class="jx">&gt;</span>
      <span class="jx">&lt;div className=</span><span class="st">"modal"</span> onClick={e => e.stopPropagation()}<span class="jx">&gt;</span>
        {children}
      <span class="jx">&lt;/div&gt;</span>
    <span class="jx">&lt;/div&gt;</span>,
    document.body
  );
}

<span class="cm">// React Query — replace data-fetching useEffects</span>
<span class="kw">import</span> { useQuery, useMutation } <span class="kw">from</span> <span class="st">'@tanstack/react-query'</span>;

<span class="kw">function</span> <span class="fn">UserProfile</span>({ id }) {
  <span class="kw">const</span> { data, isLoading, error } = useQuery({
    queryKey: [<span class="st">'user'</span>, id],
    queryFn: () => fetch(<span class="st">/api/users/\${id}</span>).then(r => r.json()),
  });
  <span class="kw">if</span> (isLoading) <span class="kw">return</span> <span class="jx">&lt;Spinner /&gt;</span>;
  <span class="kw">if</span> (error)     <span class="kw">return</span> <span class="jx">&lt;Error /&gt;</span>;
  <span class="kw">return</span> <span class="jx">&lt;div&gt;</span>{data.name}<span class="jx">&lt;/div&gt;</span>;
}

<span class="cm">// Zustand store — no Provider needed</span>
<span class="kw">const</span> <span class="fn">useCartStore</span> = create((set, get) => ({
  items: [],
  total: <span class="nm">0</span>,
  addItem: (item) => set(s => ({
    items: [...s.items, item],
    total: s.total + item.price
  })),
  removeItem: (id) => set(s => ({
    items: s.items.filter(i => i.id !== id),
    total: s.total - s.items.find(i => i.id === id).price
  })),
}));
</pre></div>

<div class="checklist">
  <div class="ci"><span class="cb">▸</span><code>forwardRef</code> — lets a parent pass a ref into a child's DOM node</div>
  <div class="ci"><span class="cb">▸</span><code>useImperativeHandle</code> — exposes a custom API from a child component to its parent via ref</div>
  <div class="ci"><span class="cb">▸</span><code>flushSync</code> — force React to flush state updates synchronously (rare, for DOM measurements)</div>
  <div class="ci"><span class="cb">▸</span>Testing: <strong>React Testing Library</strong> for behaviour-driven tests, <strong>Vitest</strong> or Jest for unit tests</div>
  <div class="ci"><span class="cb">▸</span>Next.js App Router: Server Components by default — add <code>'use client'</code> only where interactivity is needed</div>
</div>

<div class="tip"><strong>You've covered the full spectrum!</strong> The path from here: build projects, read the official React docs (react.dev), and explore the ecosystem — React Query, Zustand, Next.js App Router, and react-hook-form are the most impactful libraries to learn next.</div>
`}
];

var phases = [
  { label:"Phase 1 · Foundations", idx:[0,1,2] },
  { label:"Phase 2 · Core Hooks",  idx:[3,4,5] },
  { label:"Phase 3 · Patterns",    idx:[6,7]   },
  { label:"Phase 4 · Advanced",    idx:[8]      }
];

function buildSidebar() {
  var html = "";
  phases.forEach(function(ph) {
    html += '<div class="phase-lbl">' + ph.label + '</div>';
    ph.idx.forEach(function(i) {
      var s = sections[i];
      var cls = (i === cur ? " active" : "") + (done[i] ? " done" : "");
      var right = done[i] ? '<span class="nav-right">✓</span>' : '<span class="nav-right">' + s.time + '</span>';
      html += '<div class="nav-item' + cls + '" onclick="goTo(' + i + ')"><span class="nav-dot"></span>' + s.title + right + '</div>';
    });
  });
  document.getElementById("sidebar").innerHTML = html;
}

function updateProgress() {
  var n = Object.keys(done).length;
  document.getElementById("pfill").style.width = Math.round(n / sections.length * 100) + "%";
  document.getElementById("ptxt").textContent = n + " of " + sections.length + " sections done";
}

function render() {
  var s = sections[cur];
  document.getElementById("pname").textContent = s.phase;
  document.getElementById("stitle").textContent = s.title;
  document.getElementById("content").innerHTML = s.html;
  document.getElementById("ctr").textContent = (cur + 1) + " of " + sections.length;
  var remaining = sections.slice(cur).reduce(function(a,x){ return a + (parseInt(x.time, 10) || 0); }, 0);
  document.getElementById("timeleft").textContent = "~" + remaining + " min remaining";
  document.getElementById("prevbtn").disabled = cur === 0;
  document.getElementById("nextbtn").textContent = cur === sections.length - 1 ? "Finish ✓" : "Next →";
  var db = document.getElementById("dbtn");
  if (done[cur]) { db.textContent = "Completed ✓"; db.className = "btn btn-done"; }
  else           { db.textContent = "Mark done ✓"; db.className = "btn"; }
  buildSidebar();
  updateProgress();
  document.getElementById("content").scrollTop = 0;
}

function goTo(i)    { cur = i; render(); }
function prevNext(d){ var n = cur + d; if (n >= 0 && n < sections.length) { cur = n; render(); } }
function toggleDone(){ done[cur] ? delete done[cur] : (done[cur] = true); render(); }

render();
