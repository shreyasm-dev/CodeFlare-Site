var html = ["<!DOCTYPE html>", "<html>", "  <head>", "    <title>Monaco Editor</title>", "  </head>", "  <body>", "    ", "  </body>", "</html>"]

// Set up Monaco Editor
require.config({
  paths: {
    'vs': 'https://unpkg.com/monaco-editor@0.8.3/min/vs'
  }
});
window.MonacoEnvironment = {
  getWorkerUrl: () => proxy
};

let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@0.8.3/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@0.8.3/min/vs/base/worker/workerMain.js');
`], {
  type: 'text/html'
}));

require(["vs/editor/editor.main"], function() {
  let editor = monaco.editor.create(document.getElementById('container'), {
    value: html.join('\n'),
    language: 'html',
    theme: 'vs-dark',
    tabSize: 2
  });

  editor.onKeyDown(function(e) {
    if (e.keyCode == 84 && editor.getModel()._languageIdentifier.language == "html") {
      var position = editor.getPosition();
      var text = editor.getValue(position);
      var splitedText = text.split("\n");
      var line = splitedText[position.lineNumber - 1];
      var regex = /<(\w+)[^\/>]*$/;
      if (line.match(regex)) {
        var content = "</" + line.match(regex)[1] + ">";
        editor.trigger('bla', 'type', {
          text: content
        });
        editor.setPosition(position);
      }
    }
  }, 'editorTextFocus && !suggestWidgetVisible && !renameInputVisible && !inSnippetMode && !quickFixWidgetVisible')

  document.getElementById('runButton').addEventListener('click', function() {
    document.querySelector('iframe').srcdoc = editor.getValue()
  })

  window.onresize = function() {
    editor.layout()
  }
});

console.log = function(log) {
  var consoleDiv = document.createElement('div')
  consoleDiv.innerHTMl = log
}

function toggleSandbox() {
  if (document.querySelector('iframe').hasAttribute('sandbox')) {
    document.querySelector('iframe').removeAttribute('sandbox')
  } else {
    document.querySelector('iframe').setAttribute('sandbox', '')
  }
}

function getSandbox() {
  if (document.querySelector('iframe').hasAttribute('sandbox')) {
    return true
  } else {
    return false
  }
}

//toggleSandbox()

document.getElementById('customizeButton').addEventListener('click', function() {
  document.getElementById('customizeButtonOptions').classList.toggle('show')
})

document.getElementById('customizeButtonOptions').addEventListener('click', function() {
  document.getElementById('customizeButtonOptions').classList.toggle('show')
})

document.getElementById('debugButton').addEventListener('click', function() {
  document.getElementById('customizeDebugOptions').classList.toggle('show')
})

document.getElementById('customizeDebugOptions').addEventListener('click', function() {
  document.getElementById('customizeDebugOptions').classList.toggle('show')
})

const pickr = Pickr.create({
  el: '#color-picker-theme',
  theme: 'classic',
  default: '#000000',
  container: document.getElementById("themePicker"),

  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
  ],

  components: {

    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: true,
      cmyk: true,
      input: true,
      clear: true,
      save: true
    }
  }
});

const pickrSecondary = Pickr.create({
  el: '#color-picker-theme-secondary',
  theme: 'classic',
  default: '#ffffff',
  container: document.getElementById("themePicker"),

  swatches: [
    'rgba(244, 67, 54, 1)',
    'rgba(233, 30, 99, 0.95)',
    'rgba(156, 39, 176, 0.9)',
    'rgba(103, 58, 183, 0.85)',
    'rgba(63, 81, 181, 0.8)',
    'rgba(33, 150, 243, 0.75)',
    'rgba(3, 169, 244, 0.7)',
    'rgba(0, 188, 212, 0.7)',
    'rgba(0, 150, 136, 0.75)',
    'rgba(76, 175, 80, 0.8)',
    'rgba(139, 195, 74, 0.85)',
    'rgba(205, 220, 57, 0.9)',
    'rgba(255, 235, 59, 0.95)',
    'rgba(255, 193, 7, 1)'
  ],

  components: {

    // Main components
    preview: true,
    opacity: true,
    hue: true,

    // Input / output Options
    interaction: {
      hex: true,
      rgba: true,
      hsla: true,
      hsva: true,
      cmyk: true,
      input: true,
      clear: true,
      save: true
    }
  }
});

pickr.on('save', function(color) {
  if (color != null) {
    color = color.toRGBA()
    document.querySelector('html').style.setProperty('--theme-color-', 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + color[3] + ')')
  } else {
    document.querySelector('html').style.setProperty('--theme-color-', 'black')
  }
})

pickrSecondary.on('save', function(color) {
  if (color != null) {
    color = color.toRGBA()
    document.querySelector('html').style.setProperty('--theme-color-secondary-', 'rgba(' + color[0] + ', ' + color[1] + ', ' + color[2] + ', ' + color[3] + ')')
  } else {
    document.querySelector('html').style.setProperty('--theme-color-secondary-', 'black')
  }
})
