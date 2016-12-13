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
      if (result_position + result_segment < result_count) {
        fetch_retrieveset(infinite_scroll);
      } else {
        anchor.hide();
        end_marker.show();
      }
    }
  })
}

function window_resize_handler() {
  maximize_height($('#step1'), $('#step1-next').outerHeight());
  maximize_height($('#step2'), 16);
  maximize_height($('#step3'), 16);

  var step2_full_width = $(window).width() - $('#step1').outerWidth() - 32;
  var step2_compressed = $(window).width() / 4;
  $('#step2')
    .attr('data-full-width', step2_full_width)
    .attr('data-compressed', step2_compressed);

  switch(step2_state()) {
    case 'full-width': 
      $('#step2').css('width', step2_full_width); 
      break;
    case 'compressed': 
      $('#step2').css('width', step2_compressed); 
      $('#step3').css('width', $(window).width() - step2_compressed);
      break;
  }
  
  $('#step3')
    .css('width', $(window).width() 
                - $('#step1').outerWidth() 
                - $('#step2').outerWidth() 
                - 32);
}


$(function() {
  attach_infinite_scroll($('#step3'), $('#step3-loading'), $('#step3-end'));
})