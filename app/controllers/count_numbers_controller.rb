class CountNumbersController < ApplicationController

  # GET /count_numbers
  def index
    @count_numbers = CountNumber.all
    render json: @count_numbers
  end
end
