require 'open-uri'
require 'nokogiri'
get '/getVideos/:query' do
  doc= Nokogiri::HTML(open("http://www.youtube.com/results?search_query=#{params[:query]}"))
  titles = []
  doc.xpath('//*[@id="search-results"]/li/div[2]/h3').map { |a|
    titles << a.text.strip
  }

  videos = []
  doc.xpath('//*[@id="search-results"]/li/div/a').map { |a|
    if a['href'].include?('watch')
      videos << a['href'].gsub('/watch?v=', '')
    end
  }

  ytVideos = []
  (1..titles.count).each do |i|
    if titles[i].nil?
      next
    end
    title = titles[i]
    if title.length > 37
      title = title[0, 37] + "..."
    end
    ytVideos << YoutubeVideo.new(videos[i],title)
  end

  Oj.dump ytVideos
end

post '/submitYoutubeUpdate/:video' do
  newConsumerUpdate= JSON.parse request.body.read
  ConsumerUpdate.create(:status => newConsumerUpdate['status'],
                        :name => newConsumerUpdate['name'],
                        :consumerType => newConsumerUpdate['consumerType'])
  timeout=5
  while timeout!=0 and newConsumerUpdate['id'] == Consumer.where(consumerType: newConsumerUpdate['consumerType'], name: newConsumerUpdate['name']).order('created_at DESC').first[:id]
    sleep(1)
    timeout=timeout-1
  end
  unless timeout==0
    return Oj.dump(Toast.new('status was updated',newConsumerUpdate['name'], 'success'))
  end
  return Oj.dump(Toast.new('it looks like domus did not respond','Oops!','error'))
end

class YoutubeVideo
  def initialize(url,title)
    @url =url
    @title=title
  end
end