let editors = [
  { value: document.getElementById("html-editor"), type: "xml" },
  { value: document.getElementById("css-editor"), type: "css" },
  { value: document.getElementById("js-editor"), type: "javascript" },
];
export let editorsValues = [];
export let editorsValues1 = "<h1>Hello Web Components </h1>";
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
  });
  console.log(editorsValues);
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
