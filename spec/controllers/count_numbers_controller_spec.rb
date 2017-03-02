require 'rails_helper'

RSpec.describe CountNumbersController, type: :controller do

  let(:invalid_attributes) { {value: nil} }

  let(:valid_attributes)   {
    { value: Random.new.rand(10) }
  }

  describe "GET #index" do
    before(:each) do
      5.times { FactoryGirl.create(:count_number, valid_attributes) }
      get :index
    end

    it "renders all numbers from database" do
      expect(json_response.length).to eql CountNumber.count
    end

    it { should respond_with 200 }
  end

end
