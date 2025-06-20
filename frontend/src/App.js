import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  PlayIcon, 
  PauseIcon, 
  SpeakerWaveIcon, 
  SpeakerXMarkIcon,
  MagnifyingGlassIcon,
  HomeIcon,
  FireIcon,
  BookmarkIcon,
  UserIcon,
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EyeIcon,
  StarIcon,
  CheckBadgeIcon,
  SunIcon,
  MoonIcon,
  ArrowUpTrayIcon,
  VideoCameraIcon
} from '@heroicons/react/24/outline';
import { 
  PlayIcon as PlayIconSolid,
  PauseIcon as PauseIconSolid,
  SpeakerWaveIcon as SpeakerWaveIconSolid,
  SpeakerXMarkIcon as SpeakerXMarkIconSolid,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid
} from '@heroicons/react/24/solid';

// Import Firebase auth
import { auth, googleProvider } from './firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

// Import all components
import { 
  Header, 
  Sidebar, 
  VideoCard, 
  VideoPlayer, 
  TrendingSection,
  CreatorCard,
  ChannelPage,
  SearchPage,
  VideoDetails,
  CommentSection,
  Recommendations,
  Categories,
  Footer,
  LoadingSpinner,
  NotificationBell,
  UserProfile,
  SubscriptionFeed,
  PlaylistManager,
  LiveStreamBadge,
  CreatorBadge,
  VideoAnalytics,
  SocialShare,
  InteractiveThumbnail,
  AdvancedFilter,
  ThemeToggle,
  HoverPreview,
  CreatorMonetization,
  VideoRecommendations,
  VideoUpload,
  GoogleAuthButton,
  AuthModal
} from './components';

// Mock data for videos
const MOCK_VIDEOS = [
  {
    id: 1,
    title: "Future of Content Creation in 2025",
    creator: "TechVisionary",
    thumbnail: "https://images.pexels.com/photos/16053029/pexels-photo-16053029.jpeg",
    views: "2.5M",
    uploadTime: "2 days ago",
    duration: "12:45",
    description: "Exploring the revolutionary changes in content creation landscape. This comprehensive guide covers the latest trends, tools, and technologies that are shaping the future of digital content.",
    category: "Technology",
    tags: ["tech", "future", "content", "creation"],
    likes: 45000,
    dislikes: 1200,
    isLive: false,
    verified: true,
    premium: true,
    revenue: "$2,500"
  },
  {
    id: 2,
    title: "Behind the Scenes: Studio Setup",
    creator: "StudioMaster",
    thumbnail: "https://images.unsplash.com/photo-1603126004372-e63e3b53934b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwxfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MHx8fGJsdWV8MTc1MDQ0MjE4MXww&ixlib=rb-4.1.0&q=85",
    views: "850K",
    uploadTime: "5 days ago",
    duration: "8:30",
    description: "Take a tour of our revolutionary streaming setup. Learn professional tips for creating engaging content that captivates your audience.",
    category: "Entertainment",
    tags: ["studio", "setup", "production"],
    likes: 28000,
    dislikes: 500,
    isLive: false,
    verified: true,
    premium: false,
    revenue: "$850"
  },
  {
    id: 3,
    title: "Live: Innovation Showcase",
    creator: "InnovationLab",
    thumbnail: "https://images.pexels.com/photos/3889053/pexels-photo-3889053.jpeg",
    views: "125K",
    uploadTime: "Live now",
    duration: "LIVE",
    description: "Live showcase of breakthrough technologies that will change the world. Interactive session with Q&A.",
    category: "Live",
    tags: ["live", "innovation", "technology"],
    likes: 12000,
    dislikes: 200,
    isLive: true,
    verified: true,
    premium: true,
    revenue: "$1,200"
  },
  {
    id: 4,
    title: "Digital Performance Art",
    creator: "DigitalArtist",
    thumbnail: "https://images.pexels.com/photos/13990510/pexels-photo-13990510.jpeg",
    views: "1.2M",
    uploadTime: "1 week ago",
    duration: "15:20",
    description: "Immersive digital art performance experience combining technology and creativity in unprecedented ways.",
    category: "Art",
    tags: ["digital", "art", "performance"],
    likes: 35000,
    dislikes: 800,
    isLive: false,
    verified: false,
    premium: true,
    revenue: "$1,800"
  },
  {
    id: 5,
    title: "Creative Process Unveiled",
    creator: "CreativeGenius",
    thumbnail: "https://images.unsplash.com/photo-1603126004251-d01882b9bfd3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Nzd8MHwxfHNlYXJjaHwzfHx2aWRlbyUyMHByb2R1Y3Rpb258ZW58MHx8fGJsdWV8MTc1MDQ0MjE4MXww&ixlib=rb-4.1.0&q=85",
    views: "650K",
    uploadTime: "3 days ago",
    duration: "20:15",
    description: "Deep dive into the creative process behind viral content. Exclusive insights from industry professionals.",
    category: "Education",
    tags: ["creative", "process", "education"],
    likes: 22000,
    dislikes: 300,
    isLive: false,
    verified: true,
    premium: false,
    revenue: "$950"
  },
  {
    id: 6,
    title: "Interactive Tech Demo",
    creator: "TechExplorer",
    thumbnail: "https://images.pexels.com/photos/11140395/pexels-photo-11140395.jpeg",
    views: "450K",
    uploadTime: "1 day ago",
    duration: "18:45",
    description: "Interactive demonstration of cutting-edge technology. See the future of digital innovation unfold.",
    category: "Technology",
    tags: ["tech", "demo", "interactive"],
    likes: 18000,
    dislikes: 450,
    isLive: false,
    verified: true,
    premium: true,
    revenue: "$1,350"
  }
];

// Mock creators data with better avatars
const MOCK_CREATORS = [
  {
    id: 1,
    name: "TechVisionary",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    subscribers: "2.8M",
    verified: true,
    category: "Technology",
    totalViews: "125M",
    monthlyRevenue: "$15,000",
    description: "Leading voice in future technology trends"
  },
  {
    id: 2,
    name: "StudioMaster",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c7bc?w=150&h=150&fit=crop&crop=face",
    subscribers: "1.5M",
    verified: true,
    category: "Entertainment",
    totalViews: "85M",
    monthlyRevenue: "$12,000",
    description: "Professional content production expert"
  },
  {
    id: 3,
    name: "InnovationLab",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    subscribers: "3.2M",
    verified: true,
    category: "Science",
    totalViews: "200M",
    monthlyRevenue: "$25,000",
    description: "Innovation showcase channel"
  },
  {
    id: 4,
    name: "DigitalArtist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    subscribers: "950K",
    verified: false,
    category: "Art",
    totalViews: "45M",
    monthlyRevenue: "$8,000",
    description: "Digital art and performance creator"
  }
];

const CATEGORIES = [
  { name: "All", icon: HomeIcon, active: true },
  { name: "Trending", icon: FireIcon, active: false },
  { name: "Technology", icon: Cog6ToothIcon, active: false },
  { name: "Entertainment", icon: StarIcon, active: false },
  { name: "Education", icon: BookmarkIcon, active: false },
  { name: "Art", icon: HeartIcon, active: false },
  { name: "Live", icon: PlayIcon, active: false }
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(null);

  // Firebase auth state listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser({
          name: authUser.displayName || "User",
          email: authUser.email,
          avatar: authUser.photoURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          subscriptions: 45,
          playlists: 12
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Google Sign In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  // Sign Out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const filteredVideos = MOCK_VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.creator.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setCurrentView('video');
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentView('home');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentView('search');
  };

  const handleUpload = () => {
    if (user) {
      setShowUploadModal(true);
    } else {
      setShowAuthModal(true);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'video':
        return (
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-2/3">
              <VideoPlayer video={selectedVideo} />
              <VideoDetails video={selectedVideo} />
              <CommentSection videoId={selectedVideo?.id} user={user} />
            </div>
            <div className="lg:w-1/3">
              <Recommendations videos={MOCK_VIDEOS.filter(v => v.id !== selectedVideo?.id)} />
            </div>
          </div>
        );
      case 'search':
        return <SearchPage videos={filteredVideos} onVideoClick={handleVideoClick} />;
      case 'channel':
        return <ChannelPage creator={MOCK_CREATORS[0]} videos={MOCK_VIDEOS} />;
      case 'subscriptions':
        return <SubscriptionFeed videos={MOCK_VIDEOS} />;
      case 'trending':
        return <TrendingSection videos={MOCK_VIDEOS} onVideoClick={handleVideoClick} />;
      default:
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/8254894/pexels-photo-8254894.jpeg" 
                alt="StreamSphere Hero" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 flex items-center">
                <div className="px-8 text-white">
                  <h1 className="text-6xl font-bold mb-4 animate-fadeInUp">
                    Добро пожаловать в StreamSphere
                  </h1>
                  <p className="text-xl mb-6 animate-fadeInUp delay-200">
                    Революционная видеоплатформа, созданная AndreyVV
                  </p>
                  <p className="text-lg opacity-90 animate-fadeInUp delay-400">
                    Испытайте будущее создания и открытия контента
                  </p>
                </div>
              </div>
            </div>

            {/* Categories */}
            <Categories 
              categories={CATEGORIES} 
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
            />

            {/* Trending Videos */}
            <TrendingSection videos={filteredVideos} onVideoClick={handleVideoClick} />

            {/* Top Creators */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
                Рекомендуемые создатели
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_CREATORS.map(creator => (
                  <CreatorCard key={creator.id} creator={creator} />
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          currentView={currentView}
          onViewChange={setCurrentView}
          user={user}
          onUpload={handleUpload}
        />
        
        <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
          <Header 
            onSearch={handleSearch}
            searchQuery={searchQuery}
            isDarkMode={isDarkMode}
            onThemeToggle={toggleTheme}
            user={user}
            onSignOut={handleSignOut}
            onShowAuth={() => setShowAuthModal(true)}
            onUpload={handleUpload}
          />
          
          <main className="p-6">
            {renderContent()}
          </main>
          
          <Footer />
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <VideoUpload 
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          user={user}
        />
      )}

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onGoogleSignIn={handleGoogleSignIn}
        />
      )}
      
      {/* Loading states and animations */}
      <LoadingSpinner />
    </div>
  );
}

export default App;