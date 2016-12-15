require 'rails_helper'

RSpec.describe Tag, type: :model do
  before :each do
    @image = Image.new link: 'tagged.jpg',
                       name: 'tagged',
                       category: Image.categories[:retrieve]
    @tag = Tag.new category: 'gender',
                   value: 'female'
  end

  context 'basic insertion' do
    it 'should succeed' do
      expect { @image.save }.to change{Image.count}.from(0).to(1)

      @tag.image_id = @image.id
      expect { @tag.save }.to change{Tag.count}.from(0).to(1)
    end

    it 'should fail when no associated image is present' do
      expect { @tag.save }.to raise_error(ActiveRecord::StatementInvalid)
    end
  end

  context 'duplication' do
    before :each do
      @image.save
      @tag.image_id = @image.id
      @tag.save
    end

    it 'should disallow duplicate category-value' do
      tag_dup = @tag.dup

      expect { tag_dup.save }.to raise_error(ActiveRecord::StatementInvalid)
    end

    it 'should allow duplicate category different value' do
      tag_dup = @tag.dup
      tag_dup.value = 'male'

      expect { tag_dup.save }.to change{Tag.count}.by 1
    end

    it 'should allow duplicate category-value on different image' do
      image_dup = @image.dup
      image_dup.link = 'different'
      image_dup.save

      tag_dup = @tag.dup
      tag_dup.image_id = image_dup.id

      expect { tag_dup.save }.to change{Tag.count}.by 1
    end
  end

  context 'referential integrity' do
    before :each do
      @image.save
      @tag.image_id = @image.id
      @tag.save
    end

    it 'should cascade image deletion' do
      image_id = @image.id
      expect(Tag.where(image_id: image_id).length).to eq 1
      @image.destroy
      expect(Tag.where(image_id: image_id).length).to eq 0
    end
  end
end
