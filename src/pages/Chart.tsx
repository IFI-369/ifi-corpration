import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LinkedChart } from "@/components/linked-chart";

type YouTubeChannel = {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
  statistics?: {
    viewCount: string;
    subscriberCount: string;
    videoCount: string;
  };
};

type VideoData = {
  id: string;
  snippet: {
    title: string;
    publishedAt: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
};

const Chart: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [channels, setChannels] = useState<YouTubeChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<YouTubeChannel | null>(
    null,
  );
  const [channelAnalytics, setChannelAnalytics] = useState<any>(null);
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [timeline, setTimeline] = useState<"1year" | "1month" | "1week">(
    "1year",
  );
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get("search") || "";

  const API_KEY = "AIzaSyAeX11rZka_G36cQGP6np3kA-SHK5pD5o0";

  // Fetch YouTube channel data
  const fetchYouTubeData = async (query: string) => {
    if (!query) return;
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query,
        )}&type=channel&key=${API_KEY}`,
      );
      const data = await response.json();
      setChannels(data.items); // Set the list of matching channels
    } catch (error) {
      console.error("Failed to fetch YouTube data:", error);
    }
  };

  // Fetch channel analytics (e.g., total views, subscribers, videos)
  const fetchChannelAnalytics = async (channelId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${channelId}&key=${API_KEY}`,
      );
      const data = await response.json();
      setChannelAnalytics(data.items[0]); // Set the channel analytics
    } catch (error) {
      console.error("Failed to fetch channel analytics:", error);
    }
  };

  // Fetch video data for the selected channel
  const fetchVideoData = async (channelId: string) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=50&key=${API_KEY}`,
      );
      const data = await response.json();
      setVideoData(data.items);

      // Generate chart data from video statistics
      const formattedData = data.items.map((video: any) => ({
        date: new Date(video.snippet.publishedAt).getTime(),
        views: parseInt(video.statistics?.viewCount || 0),
        likes: parseInt(video.statistics?.likeCount || 0),
        comments: parseInt(video.statistics?.commentCount || 0),
      }));
      setChartData(formattedData);
    } catch (error) {
      console.error("Failed to fetch video data:", error);
    }
  };

  // Handle channel click
  const handleChannelClick = (channel: YouTubeChannel) => {
    setSelectedChannel(channel);
    fetchChannelAnalytics(channel.id);
    fetchVideoData(channel.id);
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/chart?search=${encodeURIComponent(searchQuery)}`);
    await fetchYouTubeData(searchQuery);
  };

  // Fetch data when searchParam changes
  useEffect(() => {
    if (searchParam) {
      fetchYouTubeData(searchParam);
    }
  }, [searchParam]);

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search YouTube Channel"
          className="p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>

      {/* Display matching channels */}
      {channels.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">Matching Channels:</h2>
          <div className="space-y-2">
            {channels.map((channel) => (
              <div
                key={channel.id}
                onClick={() => handleChannelClick(channel)}
                className="flex items-center p-2 border border-gray-200 rounded cursor-pointer hover:bg-gray-100"
              >
                <img
                  src={channel.snippet.thumbnails.default.url}
                  alt={channel.snippet.title}
                  className="w-10 h-10 rounded-full mr-2"
                />
                <div>
                  <p className="font-semibold">{channel.snippet.title}</p>
                  <p className="text-sm text-gray-600">
                    {channel.snippet.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Display selected channel analytics */}
      {selectedChannel && channelAnalytics && (
        <div className="mb-4">
          <h2 className="text-lg font-bold mb-2">
            Analytics for {selectedChannel.snippet.title}:
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Total Views:</p>
              <p>{channelAnalytics.statistics.viewCount}</p>
            </div>
            <div>
              <p className="font-semibold">Total Subscribers:</p>
              <p>{channelAnalytics.statistics.subscriberCount}</p>
            </div>
            <div>
              <p className="font-semibold">Total Videos:</p>
              <p>{channelAnalytics.statistics.videoCount}</p>
            </div>
          </div>
        </div>
      )}

      {/* Display the chart */}
      <div className="flex justify-center items-center h-[90vh] w-full">
        <div className="w-full max-w-6xl h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] flex justify-center items-center">
          <LinkedChart
            data={chartData}
            dateField="date"
            aggregatorConfig={{
              views: (item) => item.views,
              likes: (item) => item.likes,
              comments: (item) => item.comments,
            }}
            chartType="area"
            title={`نمودار داده‌های ${timeline === "1year" ? "سالانه" : timeline === "1month" ? "ماهانه" : "هفتگی"} با نوسانات`}
          />
        </div>
      </div>
    </div>
  );
};

export default Chart;
