require 'rails_helper'

RSpec.describe CountNumber, type: :model do
  context 'validation' do
    it { is_expected.to validate_presence_of :value }
  end
end
