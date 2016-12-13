function maximize_height(obj, _padding) {
  var padding = _padding == undefined ? 0 : _padding;
  obj.css('height', $(window).height() - $('#main-navbar').outerHeight() - padding * 2);
}