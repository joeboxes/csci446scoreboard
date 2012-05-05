class ScoresController < ApplicationController
  # GET /scores
  # GET /scores.json
  def index
    @scores = Score.all();
	#@scores.sort!{ |a,b| b.score <=> a.score } # highest score first
    respond_to do |format|
      format.html # index.html.erb
      format.json { @scores = Score.find(:all, :order => 'score desc', :limit => 20); render :json => @scores }
    end
  end

  # GET /scores/1
  # GET /scores/1.json
  def show
    @score = Score.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @score }
    end
  end

  # GET /scores/new
  # GET /scores/new.json
  def new
    @score = Score.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @score }
    end
  end

  # GET /scores/1/edit
  def edit
    @score = Score.find(params[:id])
  end

  # POST /scores
  # POST /scores.json
  def create
@nameVal = params[:name]
@scoreVal = params[:score]

# IF IT EXISTS, DO UPDATE SCORE
@score = Score.find_by_name(@nameVal)
puts @score
puts @score.nil?

if @score.nil?
puts "CREATEING"
	@score = Score.new( )
	@score.name = params[:name]
	@score.score = params[:score]
# params[:name], params[:score]
    #@score = Score.new( params[:score] )

    respond_to do |format|
      if @score.save
        format.html { redirect_to @score, :notice => 'Score was successfully created.' }
        format.json { render :json => @score, :status => :created, :location => @score }
      else
        format.html { render :action => "new" }
        format.json { render :json => @score.errors, :status => :unprocessable_entity }
      end
    end
else
puts "UPDATEING"
	@score.score = [@score.score.to_i, @scoreVal.to_i].max
	respond_to do |format|
      if @score.save
        format.html { redirect_to @score, :notice => 'Score was successfully created.' }
        format.json { render :json => @score, :status => :created, :location => @score }
      else
        format.html { render :action => "new" }
        format.json { render :json => @score.errors, :status => :unprocessable_entity }
      end
    end
# respond_to do |format|
#	format.html { render :action => "new" }
#	format.json { render :json => @score.errors, :status => :unprocessable_entity }
#	params[:id] = @existing.id
#	update;
end

  end

  # PUT /scores/1
  # PUT /scores/1.json
  def update
    @score = Score.find(params[:id])

    respond_to do |format|
      if @score.update_attributes(params[:score])
#	if @score.update_attributes( :image=> params[:score] )
        format.html { redirect_to @score, :notice => 'Score was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @score.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /scores/1
  # DELETE /scores/1.json
  def destroy
    @score = Score.find(params[:id])
    @score.destroy

    respond_to do |format|
      format.html { redirect_to scores_url }
      format.json { head :no_content }
    end
  end
end
