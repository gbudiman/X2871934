function fetch_queryset() {
  var render_step2 = function(data) {
    return new Promise(
      function(resolve, reject) {

        $.each(data, function(name, x) {
          var s = $('<div></div>')
                    .addClass('col-xs-12 col-sm-6 col-md-4 col-lg-2')
                    .addClass('img-padded')
                    .attr('data-queryset-id', name)
                    .attr('data-content', 'blabla')
                    .append($('<img></img>')
                              .attr('alt', name)
                              .attr('src', 'photo_placeholder.jpg')
                              .addClass('img-rounded')
                              .attr('width', 128)
                              .attr('height', 128));

          $('#step2').append(s);
        })

        resolve();
      }
    );
  }

  var attach_step2_click = function() {
    return new Promise(
      function(resolve, reject) {
        $('[data-queryset-id]').each(function() {
          // $(this).popover({
          //   trigger: 'hover',
          //   placement: 'auto right',
          //   viewport: {
          //     selector: '#step2'
          //   }
          // })

          $(this).on('click', function() {
            
            var that = $(this);

            if (that.hasClass('step2-selected')) {
              // ignore
            } else {
              $('.step2-selected[data-queryset-id]').removeClass('step2-selected');
              that.addClass('step2-selected');
              fetch_retrieveset();
              console.log($(this).attr('data-queryset-id'));
            }
          })
        })

        resolve();
      }
    )
    
  }

  set_queryset('reset');
  

  $('#step2-placeholder').hide();
  $('#step2-loading').show();
  $('#step2-selected').removeClass('step2-selected');
  $('#step2 [data-queryset-id]').remove();
  $('#step3 [data-retrieveset-id]').remove();
  
  $.get({
    url: '/fetch/queryset'
  }).done(function(data) {
    
    render_step2(data).then(function() {
      $('#step2-loading').hide();
      maximize_height($('#step2'), 16);
      attach_step2_click();
    })
  })
}

$(function() {
  $('#step2')
    .attr('data-full-width', $('#step2').width())
    .attr('data-compressed', $(window).width() / 4);
})