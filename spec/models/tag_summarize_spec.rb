require 'rails_helper'
require 'rake'

RSpec.describe Tag, type: :model do
  before :each do
    rake = Rake::Application.new
    Rake.application = rake
    rake.init
    rake.load_rakefile
    rake['preseed_demo:rebuild'].invoke
  end

  it 'should be summarizable' do
    expect(Tag.summarize.keys.count).to be > 0
  end
end