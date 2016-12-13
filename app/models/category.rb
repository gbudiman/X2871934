class Category < ApplicationRecord
  def self.mock_list_all
    return {
      gender: ['Female', 'Male', 'Unisex'],
      style: ['Formal', 'Casual'],
      top: ['Blazer', 'Blouse', 'Button-Down', 'Cardigan', 'Flannel', 'Halter', 'Henley', 'Hoodie', 'Jacket', 'Peacoat', 'Poncho', 'Sweater', 'Tank', 'Tee', 'Top', 'Turtleneck'],
      bottom: ['Capris', 'Chinos', 'Culottes', 'Gauchos', 'Jeans', 'Jodhpurs', 'Leggings', 'Sarong', 'Shorts', 'Skirt', 'Sweatpants', 'Sweatshorts', 'Trunks'],
      onepiece: ['Coat', 'Coverup', 'Dress', 'Jumpsuit', 'Kaftan', 'Kimono', 'Onesie', 'Robe']
    }
  end
end
