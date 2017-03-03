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

  describe "POST #create" do
    context "when counted number is successfully saved" do

      before(:each) do
        @count_number_attributes = FactoryGirl.attributes_for(:count_number)
        post :create, params: { count_number: @count_number_attributes }
      end

      it 'returns the number just created' do
        expect(json_response[:value]).to eql @count_number_attributes[:value]
      end

      it { should respond_with 201 }
    end

    context "when count_number is NOT successfully created" do
      before(:each) do
        @count_number_attributes = FactoryGirl.attributes_for(:count_number, value: nil)
        post :create, params: { count_number: @count_number_attributes}
      end

      it 'render the errons on why the count_number could not be created' do
        expect(json_response[:errors_msg]).to include "value can't be blank"
      end

      it { should respond_with 422 }
    end
  end

  describe "DELETE #destroy" do
    context 'when the number is deleted' do
      before :each do
        @count_number = FactoryGirl.create :count_number
        delete :destroy, params: { id: @count_number.id }
      end

      it { should respond_with 204}

      it 'does not find this instance anymore' do
        expect { @count_number.reload }.to raise_error ActiveRecord::RecordNotFound
      end
    end
  end

  describe "DELETE #destroy_all" do
    context 'when the number is deleted' do
      before :each do
        3.times { FactoryGirl.create :count_number }
        delete :destroy_all
      end

      it { should respond_with 204}

      it 'finds a empty database' do
        expect(CountNumber.count).to be_zero
      end
    end
  end
end
