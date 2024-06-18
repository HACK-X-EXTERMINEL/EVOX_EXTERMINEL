var loader = document.getElementById("preload");

// تعطيل التمرير
function disableScroll() {
  // حفظ موقف التمرير الحالي
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  // تعطيل التمرير
  window.onscroll = function() {
    window.scrollTo(scrollLeft, scrollTop);
  };
}

// تمكين التمرير
function enableScroll() {
  window.onscroll = null;
}

// تعطيل التمرير عند بدء تحميل الصفحة
disableScroll();

window.addEventListener("load", function() {
  var fadeEffect = setInterval(function () {
    if (!loader.style.opacity) {
      loader.style.opacity = 1;
    }
    if (loader.style.opacity > 0) {
      loader.style.opacity -= 0.1;
    } else {
      clearInterval(fadeEffect);
      // تمكين التمرير بعد إخفاء الـ loader
      loader.style.display = "none";
      enableScroll();
    }
  }, 100);
});
