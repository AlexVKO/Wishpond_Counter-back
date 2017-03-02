class CountNumbersController < ApplicationController

  # GET /count_numbers
  def index
    @count_numbers = CountNumber.all
    render json: @count_numbers
  end

  # POST /count_numbers
  def create
    @count_number = CountNumber.new(count_number_params)
    if @count_number.save
      render json: @count_number, status: :created, location: @count_number
    else
      errors_msg = @count_number.errors.messages.map {|field, error| "#{field} #{error.join}" }
      render json: {errors_msg: errors_msg}, status: :unprocessable_entity
    end
  end

  private

  def count_number_params
    params.require(:count_number).permit(:value)
  end
end
