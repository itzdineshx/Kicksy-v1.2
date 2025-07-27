import { Calendar, User, Eye, MessageCircle, Share2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NewsPage = () => {
  const featuredNews = {
    id: 1,
    title: "India Wins Historic Cricket World Cup After 12 Years",
    excerpt: "In a thrilling final match that went to the last over, Team India defeated Australia by 4 runs to claim their third World Cup title.",
    image: "/hero-cricket.jpg",
    category: "Cricket",
    author: "Rajesh Kumar",
    date: "2024-07-30",
    readTime: "5 min read",
    views: "25.4K"
  };

  const newsArticles = [
    {
      id: 2,
      title: "Mumbai City FC Signs Brazilian Star Midfielder",
      excerpt: "The ISL champions have strengthened their squad with the addition of former Flamengo midfielder João Silva ahead of the new season.",
      image: "/hero-football.jpg",
      category: "Football",
      author: "Priya Sharma",
      date: "2024-07-29",
      readTime: "3 min read",
      views: "12.8K"
    },
    {
      id: 3,
      title: "PKL Season 10: Record-Breaking Attendance Expected",
      excerpt: "Pro Kabaddi League's upcoming season is set to witness unprecedented fan turnout with advance bookings already crossing 80%.",
      image: "/hero-kabaddi.jpg",
      category: "Kabaddi",
      author: "Amit Verma",
      date: "2024-07-28",
      readTime: "4 min read",
      views: "8.9K"
    },
    {
      id: 4,
      title: "Young Shuttler Reaches BWF World Championships Semi-Final",
      excerpt: "19-year-old sensation Arjun Patel creates history by becoming the youngest Indian to reach BWF World Championships semi-final.",
      image: "/placeholder.svg",
      category: "Badminton",
      author: "Sneha Gupta",
      date: "2024-07-27",
      readTime: "2 min read",
      views: "15.2K"
    },
    {
      id: 5,
      title: "Indian Hockey Team Qualifies for Paris Olympics",
      excerpt: "After a nail-biting qualification tournament, the Indian men's hockey team secures their spot for the upcoming Olympics.",
      image: "/placeholder.svg",
      category: "Hockey",
      author: "Vikram Singh",
      date: "2024-07-26",
      readTime: "3 min read",
      views: "18.6K"
    },
    {
      id: 6,
      title: "Tennis Academy Opens in Rural Maharashtra",
      excerpt: "New state-of-the-art tennis facility aims to nurture grassroots talent from rural areas with world-class coaching and infrastructure.",
      image: "/placeholder.svg",
      category: "Tennis",
      author: "Meera Patel",
      date: "2024-07-25",
      readTime: "4 min read",
      views: "6.7K"
    },
    {
      id: 7,
      title: "Sports Technology Summit 2024 Announced",
      excerpt: "Leading sports technology companies and innovators to gather in Bangalore for the biggest sports tech conference in Asia.",
      image: "/placeholder.svg",
      category: "Technology",
      author: "Karan Malhotra",
      date: "2024-07-24",
      readTime: "2 min read",
      views: "4.3K"
    }
  ];

  const trendingTopics = [
    "World Cup 2024",
    "IPL Transfers",
    "Olympics Preparation",
    "ISL Season",
    "PKL Updates",
    "Sports Technology"
  ];

  const categories = ["All", "Cricket", "Football", "Kabaddi", "Badminton", "Hockey", "Tennis", "Technology"];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-sports bg-clip-text text-transparent">
            Sports News
          </h1>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest happenings in the world of sports
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search news articles..."
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Featured Article */}
            <Card className="overflow-hidden hover:shadow-floating transition-all duration-300">
              <div className="aspect-video relative">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4" variant="default">
                  Featured
                </Badge>
                <Badge className="absolute top-4 right-4" variant="secondary">
                  {featuredNews.category}
                </Badge>
              </div>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                  {featuredNews.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {featuredNews.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(featuredNews.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredNews.views}
                    </div>
                  </div>
                  <span>{featuredNews.readTime}</span>
                </div>
              </CardContent>
            </Card>

            {/* News Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {newsArticles.map((article) => (
                <Card key={article.id} className="group overflow-hidden hover:shadow-floating transition-all duration-300 hover:-translate-y-1">
                  <div className="aspect-video relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3" variant="secondary">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-3">
                        <span>{article.author}</span>
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <Button variant="outline" size="lg" className="hover:shadow-floating">
                Load More Articles
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant="destructive" className="w-2 h-2 rounded-full p-0"></Badge>
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <span className="font-medium">{topic}</span>
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Articles Published</span>
                  <Badge variant="secondary">47</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Total Readers</span>
                  <Badge variant="secondary">2.3M</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Breaking News</span>
                  <Badge variant="destructive">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Live Matches</span>
                  <Badge variant="default">5</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Newsletter Signup */}
            <Card className="bg-gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Stay Updated</h3>
                <p className="text-sm opacity-90 mb-4">
                  Get the latest sports news delivered to your inbox
                </p>
                <div className="space-y-3">
                  <Input 
                    placeholder="Enter your email"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  />
                  <Button 
                    variant="secondary"
                    className="w-full"
                  >
                    Subscribe Now
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Social Share */}
            <Card>
              <CardHeader>
                <CardTitle>Share & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-3">
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Discuss
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;