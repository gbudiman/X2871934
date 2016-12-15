require 'rails_helper'

RSpec.describe Image, type: :model do
  before :each do
    @image = Image.new link: 'ztest.jpg', 
                       name: 'ztest', 
                       category: Image.categories[:query]
  end

  context 'basic insertion' do
    it 'should succeed' do
      expect { @image.save }.to change{Image.count}.from(0).to(1)
    end

    it 'should be able to store CNN features array' do
      cnn_fts = Array.new
      128.times do |i|
        cnn_fts.push rand
      end

      @image.cnn_features = cnn_fts
      expect { @image.save }.to change{Image.count}.from(0).to(1)

      expect(@image.id).not_to be_nil

      id = @image.id
      blind_object = Image.find(id)
      expect(blind_object.cnn_features.length).to eq 128
    end
  end

  context 'basic validation' do
    after :each do
      expect { @image.save }.to raise_error(ActiveRecord::StatementInvalid)
    end

    it 'should disallow empty title' do
      @image.name = nil
    end

    it 'should disallow empty link' do
      @image.link = nil
    end

    it 'should disallow empty category' do
      @image.category = nil
    end
  end
end
