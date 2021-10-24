let editors = [
  { value: document.getElementById("html-editor"), type: "xml" },
  { value: document.getElementById("css-editor"), type: "css" },
  { value: document.getElementById("js-editor"), type: "javascript" },
];
export let editorsValues = [];
export let htmlEditorValue = "";
export let cssEditorValue = "";
export let javascriptEditorValue = "";
const runButton = document.querySelector(".run-btn");
//TODO:Refactor for more dynamic

let htmlEditor = CodeMirror.fromTextArea(editors[0].value, {
  mode: editors[0].type,
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  spellcheck: true,
});
htmlEditor.setSize("350", "300");
let cssEditor = CodeMirror.fromTextArea(editors[1].value, {
  mode: editors[1].type,
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  spellcheck: true,
});
cssEditor.setSize("350", "300");
let javascriptEditor = CodeMirror.fromTextArea(editors[2].value, {
  mode: editors[2].type,
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  spellcheck: true,
});
javascriptEditor.setSize("350", "300");

export function getEditorsValue() {
  let editors = [
    { value: htmlEditor },
    { value: cssEditor },
    { value: javascriptEditor },
  ];

  editors.forEach((item) => {
    if (item.value.getValue()) {
      editorsValues.push({
        title: item.value.options.mode,
        value: item.value.getValue(),
      });
    }
    htmlEditorValue = htmlEditor.getValue();
    cssEditorValue = cssEditor.getValue();
    javascriptEditorValue = javascriptEditor.getValue();
  });
  setAttribute();
}
function setAttribute() {
  let content_card = document.querySelector("content-card");
  content_card.setAttribute("html", htmlEditorValue);
  content_card.setAttribute("css", cssEditorValue);
  content_card.setAttribute("javascript", javascriptEditorValue);
}
runButton.addEventListener("click", getEditorsValue);
document.addEventListener(
  "keydown",
  function (e) {
    if (
      (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
      e.keyCode == 83
    ) {
      e.preventDefault();
      getEditorsValue();
      console.warn("running");
    }
  },
  false
);
