module ApplicationHelper
  def contextualize link:, title:
    page_request = request.env['PATH_INFO']
    haml_tag :li do
      if (link == page_request)
        puts 'here'
        haml_tag :a, class: 'link-is-current-page' do
          haml_concat title
        end
      else
        haml_tag :a, href: link do
          haml_concat title
        end
      end
      
    end
  end
end
