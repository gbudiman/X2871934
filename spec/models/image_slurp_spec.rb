require 'rails_helper'

RSpec.describe Image, type: :model do
  it 'should slurp query seeds' do
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'query_set.txt').to_s,
                category: Image.categories[:query]

    expect(Image.count).to eq 20
    expect(Tag.count).to eq 57
  end

  it 'should slurp retrieve seeds' do
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'retrieval_set.txt').to_s,
                category: Image.categories[:retrieve]

    expect(Image.count).to eq 60
    expect(Tag.count).to eq 0
  end
end