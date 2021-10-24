let editors = [
  { value: document.getElementById("html-editor"), type: "xml" },
  { value: document.getElementById("css-editor"), type: "css" },
  { value: document.getElementById("js-editor"), type: "javascript" },
];
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
function getEditorsValue() {
  let editors = [
    { value: htmlEditor },
    { value: cssEditor },
    { value: javascriptEditor },
  ];

  let editorsValues = [];
  editors.forEach((item) => {
    if (item.value.getValue()) {
      editorsValues.push({
        title: item.value.options.mode,
        value: item.value.getValue(),
      });
    }
  });
  console.warn(editorsValues);
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
    }
  },
  false
);
