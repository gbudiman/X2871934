require 'rails_helper'

RSpec.describe Precomputed, type: :model do
  before :each do
    @iq = Image.create link: 'l0', name: 'n0', category: Image.categories[:query]
    @ir = Image.create link: 'l1', name: 'n1', category: Image.categories[:retrieve]

    @pre = Precomputed.new query_id: @iq.id,
                           retrieve_id: @ir.id,
                           relevance: 0
  end

  context 'basic insertion' do
    it 'should succeed' do
      expect { @pre.save }.to change{Precomputed.count}.from(0).to(1)
    end
  end

  context 'basic validation' do
    after :each do
      expect { @pre.save }.to raise_error(ActiveRecord::StatementInvalid)
    end

    it 'should disallow entry with identical query_id and retrieve_id' do
      @pre.retrieve_id = @pre.query_id
    end

    it 'should have valid query_id' do
      @pre.query_id = nil
    end

    it 'should have valid retrieve_id' do
      @pre.retrieve_id = -1
    end

    it 'should have relevance between 0 and 1' do
      @pre.relevance = 2
    end
  end

  context 'referential integrity' do
    before :each do
      @pre.save
      @pre_id = @pre.id
    end

    after :each do
      expect { Precomputed.find(@pre_id) }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'should cascade image deletion to query_id' do
      @iq.destroy
    end

    it 'should cascade image deletion to retrieve_id' do
      @ir.destroy
    end
  end
end
