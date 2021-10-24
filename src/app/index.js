let editors = [
  { value: document.getElementById("html-editor"), type: "xml" },
  { value: document.getElementById("css-editor"), type: "css" },
  { value: document.getElementById("js-editor"), type: "javascript" },
];
export let editorsValues = [];
export let htmlEditorValue = "";
export let cssEditorValue = "";
export let javascriptEditorValue = "";
let iframeContent = null;
let isValid = false;
const runButton = document.querySelector(".run-btn");
const saveButton = document.querySelector(".save-btn");
const clearButton = document.querySelector(".clear-btn");

var select = document.getElementById("history-selectbox");
select.addEventListener(
  "change",
  function () {
    let localItem = Object.values(
      JSON.parse(localStorage.getItem(this.value))
    )[0];
    appendValues(localItem.html, localItem.css, localItem.javascript);
    htmlEditor.setValue(localItem.html);
    cssEditor.setValue(localItem.css);
    javascriptEditor.setValue(localItem.javascript);
  },
  false
);

function apendToOption() {
  const selectBox = document.querySelector(".history-select");
  const keys = Object.keys(localStorage);
  keys.forEach((item) => {
    const option = document.createElement("option");
    option.setAttribute("value", item);
    option.text = item;
    selectBox.appendChild(option);
  });
}
apendToOption();
optionValFromLocal();
function optionValFromLocal() {
  saveButton.addEventListener("click", () => {
    const historySelect = document.querySelector(".history-select");
    const historyName = document.querySelector("#history-name");
    const optionEl = document.createElement("option");
    if (historyName.value) {
      isValid = true;
      optionEl.setAttribute("value", historyName.value);
      optionEl.setAttribute("selected", true);
      optionEl.text = historyName.value;
      setTimeout(() => {
        historySelect.appendChild(optionEl);
      }, 250);
    } else {
      isValid = false;
      alert("Please Provide a name");
    }
  });
  clearButton.addEventListener("click", () => clearStorage());
}

function clearStorage() {
  localStorage.clear();
}

minimizer();
function minimizer() {
  const minimizeButton = document.querySelector(".minimize-btn");
  minimizeButton.addEventListener("click", () => {
    let editorContainer = document.querySelector(".editors-container");
    let contentArea = document.querySelector(".content-area");
    if (!editorContainer.classList.contains("editors-container-minimize")) {
      minimizeButton.textContent = "Maximize";
      editorContainer.classList.add("editors-container-minimize");
      contentArea.classList.add("content-area-minimize");
    } else {
      minimizeButton.textContent = "Minimize";
      editorContainer.classList.remove("editors-container-minimize");
      contentArea.classList.remove("content-area-minimize");
    }
  });
}
let editorOptions = {
  theme: "dracula",
  lineNumbers: true,
  autoCloseTags: true,
  autoCloseBrackets: true,
  spellcheck: true,
};
let htmlEditor = CodeMirror.fromTextArea(editors[0].value, {
  mode: editors[0].type,
  ...editorOptions,
});
htmlEditor.setSize("350", "250");
let cssEditor = CodeMirror.fromTextArea(editors[1].value, {
  mode: editors[1].type,
  ...editorOptions,
});
cssEditor.setSize("350", "250");
let javascriptEditor = CodeMirror.fromTextArea(editors[2].value, {
  mode: editors[2].type,
  ...editorOptions,
});
javascriptEditor.setSize("350", "250");

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
  appendValues(htmlEditorValue, cssEditorValue, javascriptEditorValue);
}
function setAttribute() {
  let content_card = document.querySelector("iframe");
  content_card.setAttribute("html", htmlEditorValue);
  content_card.setAttribute("css", cssEditorValue);
  content_card.setAttribute("javascript", javascriptEditorValue);
}
function appendValues(htmlEditorValue, cssEditorValue, javascriptEditorValue) {
  iframeContent =
    htmlEditorValue +
    `<style>${cssEditorValue}</style>` +
    `<script>${javascriptEditorValue}</script>`;
  let iframeCard = document.querySelector(
    "div.content-area iframe#content-frame"
  );
  let iframeDocument = iframeCard.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(iframeContent);
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

const saveElement = document.querySelector(".save-btn");
const historyName = document.querySelector("#history-name");
const selectBox = document.querySelector("#history-selectbox");
saveElement.addEventListener("click", () => {
  setItem(false);
});
function setItem(isClear) {
  const getStorage = JSON.parse(localStorage.getItem(historyName.value));
  const storage = {
    [historyName.value]: {
      html: htmlEditor.getValue(),
      css: cssEditor.getValue(),
      javascript: javascriptEditor.getValue(),
    },
    ...getStorage,
  };
  if (isValid && !isClear) {
    localStorage.setItem(historyName.value, JSON.stringify(storage));
  }
}
selectBox.addEventListener("click", () => {
  const getItem = localStorage.getItem(selectBox.value);
  iframeContent = getItem;
  htmlEditorValue = getItem;
});
