function ready(fn) {
  var docRef = this.document;

  if (docRef.attachEvent ? docRef.readyState === 'complete' : docRef.readyState !== 'loading') {
    fn();
  } else {
    docRef.addEventListener('DOMContentLoaded', fn);
  }
}

function elementInParentViewport(el) {
  var parentWindow = window.parent;

  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < parentWindow.pageYOffset + parentWindow.innerHeight &&
    left < parentWindow.pageXOffset + parentWindow.innerWidth &&
    top + height > parentWindow.pageYOffset &&
    left + width > parentWindow.pageXOffset
  );
}

function onShow() {
  alert('Me-Mow~');
}

ready(function selfReadyF() {
  var parentReadyF = function() {
    var windowRef = this;
    var parentWindowRef = window.frameElement;

    if (elementInParentViewport(parentWindowRef)) {
      onShow();

      return;
    }

    windowRef.addEventListener('scroll', function f(event) {
      if (elementInParentViewport(parentWindowRef)) {
        onShow();

        windowRef.removeEventListener('scroll', f);
      }
    });
  };

  ready(parentReadyF.bind(window.parent));
});
