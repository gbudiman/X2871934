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
          $(this).popover({
            trigger: 'hover',
            placement: 'auto right',
            viewport: {
              selector: '#step2'
            }
          })
          $(this).on('click', function() {
            
            var that = $(this);

            if (that.hasClass('step2-selected')) {
              // ignore
            } else {
              $('.step2-selected[data-queryset-id]').removeClass('step2-selected');
              that.addClass('step2-selected');
              console.log($(this).attr('data-queryset-id'));
            }
          })
        })

        resolve();
      }
    )
    
  }

  $('#step2-placeholder').hide();
  $('#step2-loading').show();
  $.get({
    url: '/fetch/queryset'
  }).done(function(data) {
    console.log(data);
    $('#step2-loading').hide();
    render_step2(data).then(function() {
      maximize_height($('#step2'), 16);
      attach_step2_click();
    })
  })
}