function maximize_height(obj, _padding) {
  var padding = _padding == undefined ? 0 : _padding;
  obj.css('height', $(window).height() - $('#main-navbar').outerHeight() - padding * 2);
}

function attach_infinite_scroll(obj, anchor, end_marker) {
  var infinite_scroll = true;

  obj.on('scroll', function() {
    var anchor_position = anchor.position().top;
    var object_height = obj.height();

    if (object_height - anchor_position > 8) {
      console.log('end triggered');

      if (result_position + result_segment < result_count) {
        fetch_retrieveset(infinite_scroll);
      } else {
        anchor.hide();
        end_marker.show();
      }
    }
  })
}


$(function() {
  attach_infinite_scroll($('#step3'), $('#step3-loading'), $('#step3-end'));
})