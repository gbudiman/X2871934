require 'rails_helper'

RSpec.describe Precomputed, type: :model do
  it 'should slurp precomputed seeds' do
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'query_set.txt').to_s,
                category: Image.categories[:query]
    Image.slurp path: Rails.root.join('db', 'raw_seeds', 'retrieval_set.txt').to_s,
                category: Image.categories[:retrieve]

    Precomputed.slurp path: Rails.root.join('db', 'raw_seeds', 'matching.txt').to_s

    expect(Precomputed.count).to eq 60
  end
end