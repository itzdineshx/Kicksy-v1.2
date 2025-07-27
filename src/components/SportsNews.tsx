import { useState } from "react";
import { Clock, User, Eye, MessageCircle, Share2, Bookmark, TrendingUp, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SportsNews = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const newsArticles = [
    {
      id: 1,
      title: "Virat Kohli Announces Comeback to Domestic Cricket After 12 Years",
      excerpt: "Former India captain Virat Kohli will play for Delhi in the upcoming Ranji Trophy season, marking his return to domestic cricket after more than a decade.",
      category: "Cricket",
      author: "Rajesh Kumar",
      publishedAt: "2024-12-27T10:30:00Z",
      readTime: "3 min read",
      views: "15.2K",
      comments: 89,
      image: "🏏",
      priority: "breaking",
      tags: ["Virat Kohli", "Ranji Trophy", "Delhi Cricket", "Domestic Cricket"]
    },
    {
      id: 2,
      title: "Mumbai City FC Secures ISL Playoff Spot with Thrilling 3-2 Victory",
      excerpt: "The Islanders defeated Bengaluru FC in a nail-biting encounter to secure their position in the Indian Super League playoffs for the third consecutive season.",
      category: "Football",
      author: "Priya Sharma",
      publishedAt: "2024-12-27T08:15:00Z",
      readTime: "4 min read",
      views: "8.7K",
      comments: 45,
      image: "⚽",
      priority: "high",
      tags: ["Mumbai City FC", "ISL", "Playoffs", "Bengaluru FC"]
    },
    {
      id: 3,
      title: "Pro Kabaddi League Season 11 to Feature Two New International Teams",
      excerpt: "PKL organizers announce the inclusion of teams from Iran and South Korea, making it the first truly international season in the league's history.",
      category: "Kabaddi",
      author: "Arjun Patel",
      publishedAt: "2024-12-26T16:45:00Z",
      readTime: "2 min read",
      views: "12.3K",
      comments: 67,
      image: "🤼",
      priority: "medium",
      tags: ["Pro Kabaddi", "International Teams", "Iran", "South Korea"]
    },
    {
      id: 4,
      title: "PV Sindhu Reaches BWF World Championships Final",
      excerpt: "Two-time Olympic medalist PV Sindhu advances to her fourth World Championships final after defeating Carolina Marin in straight sets.",
      category: "Badminton",
      author: "Sneha Reddy",
      publishedAt: "2024-12-26T14:20:00Z",
      readTime: "3 min read",
      views: "9.8K",
      comments: 34,
      image: "🏸",
      priority: "high",
      tags: ["PV Sindhu", "BWF", "World Championships", "Carolina Marin"]
    },
    {
      id: 5,
      title: "Hockey India League Returns After Seven Years with Star-Studded Auction",
      excerpt: "The revamped HIL will feature eight franchises and international stars, with the auction raising ₹45 crores for 144 players.",
      category: "Hockey",
      author: "Vikram Singh",
      publishedAt: "2024-12-25T12:00:00Z",
      readTime: "5 min read",
      views: "6.5K",
      comments: 23,
      image: "🏑",
      priority: "medium",
      tags: ["Hockey India League", "HIL", "Auction", "Franchise Cricket"]
    },
    {
      id: 6,
      title: "Indian Tennis Stars Shine at ATP Chennai Open Qualifiers",
      excerpt: "Sumit Nagal and Ramkumar Ramanathan both advance to the main draw, giving India strong representation in the home tournament.",
      category: "Tennis",
      author: "Meera Iyer",
      publishedAt: "2024-12-25T09:30:00Z",
      readTime: "2 min read",
      views: "4.2K",
      comments: 18,
      image: "🎾",
      priority: "low",
      tags: ["Tennis", "ATP Chennai Open", "Sumit Nagal", "Ramkumar Ramanathan"]
    }
  ];

  const trendingTopics = [
    { name: "Virat Kohli Return", posts: "12.3K" },
    { name: "ISL Playoffs", posts: "8.7K" },
    { name: "PKL International", posts: "5.9K" },
    { name: "PV Sindhu Final", posts: "7.2K" },
    { name: "Hockey League", posts: "3.4K" }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "breaking": return "bg-red-500 animate-pulse";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case "breaking": return "BREAKING";
      case "high": return "HOT";
      case "medium": return "TRENDING";
      case "low": return "UPDATE";
      default: return "NEWS";
    }
  };

  const getTimeAgo = (publishedAt: string) => {
    const now = new Date();
    const published = new Date(publishedAt);
    const diffInHours = Math.floor((now.getTime() - published.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const filteredNews = selectedCategory === "all" 
    ? newsArticles 
    : newsArticles.filter(article => article.category.toLowerCase() === selectedCategory);

  const categories = ["all", "cricket", "football", "kabaddi", "badminton", "hockey", "tennis"];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-in-bottom">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Sports News & Updates
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stay informed with the latest news, updates, and insights from the world of sports
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6 animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize hover:scale-105 transition-transform duration-300"
                >
                  {category === "all" ? "All Sports" : category}
                </Button>
              ))}
            </div>

            {/* Featured Article */}
            {filteredNews.length > 0 && (
              <Card className="group overflow-hidden hover:shadow-floating transition-all duration-500 animate-scale-in">
                <div className="relative">
                  <div className="h-64 bg-gradient-card flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                    <div className="text-8xl opacity-20 group-hover:animate-float">{filteredNews[0].image}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Priority Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getPriorityColor(filteredNews[0].priority)} text-white font-bold`}>
                        {getPriorityText(filteredNews[0].priority)}
                      </Badge>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-black/60 text-white">
                        {filteredNews[0].category}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="absolute bottom-0 left-0 right-0 text-white p-6">
                    <h2 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {filteredNews[0].title}
                    </h2>
                    <p className="text-white/90 mb-4 line-clamp-2">
                      {filteredNews[0].excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-white/80">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {filteredNews[0].author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {getTimeAgo(filteredNews[0].publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {filteredNews[0].views}
                        </div>
                      </div>
                      <Button variant="secondary" size="sm" className="bg-white/20 text-white hover:bg-white/30">
                        Read More
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            )}

            {/* News List */}
            <div className="space-y-4">
              {filteredNews.slice(1).map((article, index) => (
                <Card 
                  key={article.id} 
                  className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Article Icon */}
                      <div className="text-4xl flex-shrink-0 group-hover:animate-stadium-bounce">
                        {article.image}
                      </div>

                      {/* Content */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={`${getPriorityColor(article.priority)} text-white text-xs`}>
                                {getPriorityText(article.priority)}
                              </Badge>
                              <Badge variant="outline">{article.category}</Badge>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {article.tags.slice(0, 3).map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              #{tag.replace(/\s+/g, '')}
                            </Badge>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {getTimeAgo(article.publishedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {article.views}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                              <MessageCircle className="w-4 h-4" />
                              {article.comments}
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                              <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform">
                              <Bookmark className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card className="animate-scale-in" style={{ animationDelay: "300ms" }}>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h3 className="font-bold">Trending Now</h3>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-all duration-300 hover:scale-105"
                  >
                    <div>
                      <p className="font-medium">#{topic.name}</p>
                      <p className="text-sm text-muted-foreground">{topic.posts} posts</p>
                    </div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="animate-scale-in" style={{ animationDelay: "400ms" }}>
              <CardHeader>
                <h3 className="font-bold">Today's Stats</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24</div>
                  <p className="text-sm text-muted-foreground">Breaking News</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary">156</div>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-tertiary">89K</div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="animate-scale-in" style={{ animationDelay: "500ms" }}>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest sports news delivered to your inbox daily
                </p>
                <Button className="w-full">
                  Subscribe to Newsletter
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SportsNews;