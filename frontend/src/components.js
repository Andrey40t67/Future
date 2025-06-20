import React, { useState, useEffect, useRef } from 'react';
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
  Bars3Icon,
  XMarkIcon,
  BellIcon,
  PlusIcon,
  ClockIcon,
  VideoCameraIcon,
  AdjustmentsHorizontalIcon,
  ChartBarIcon,
  GlobeAltIcon,
  TvIcon,
  MusicalNoteIcon,
  AcademicCapIcon,
  NewspaperIcon,
  GamepadIcon,
  MicrophoneIcon
} from '@heroicons/react/24/outline';
import { 
  PlayIcon as PlayIconSolid,
  PauseIcon as PauseIconSolid,
  SpeakerWaveIcon as SpeakerWaveIconSolid,
  SpeakerXMarkIcon as SpeakerXMarkIconSolid,
  HeartIcon as HeartIconSolid,
  BookmarkIcon as BookmarkIconSolid,
  StarIcon as StarIconSolid,
  CheckBadgeIcon as CheckBadgeIconSolid,
  BellIcon as BellIconSolid
} from '@heroicons/react/24/solid';

// Header Component
export const Header = ({ onSearch, searchQuery, isDarkMode, onThemeToggle, user }) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [notifications, setNotifications] = useState(3);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="ml-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                StreamSphere
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">by AndreyVV</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className={`relative transition-all duration-300 ${isSearchFocused ? 'transform scale-105' : ''}`}>
            <input
              type="text"
              placeholder="Search videos, creators, or topics..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full px-4 py-3 pl-12 pr-4 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300"
            />
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* User Controls */}
        <div className="flex items-center space-x-4">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
          <NotificationBell count={notifications} />
          <UserProfile user={user} />
        </div>
      </div>
    </header>
  );
};

// Sidebar Component
export const Sidebar = ({ isOpen, onToggle, currentView, onViewChange, user }) => {
  const menuItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'trending', label: 'Trending', icon: FireIcon },
    { id: 'subscriptions', label: 'Subscriptions', icon: BookmarkIcon },
    { id: 'channel', label: 'Your Channel', icon: UserIcon },
  ];

  const categories = [
    { id: 'music', label: 'Music', icon: MusicalNoteIcon },
    { id: 'gaming', label: 'Gaming', icon: GamepadIcon },
    { id: 'news', label: 'News', icon: NewspaperIcon },
    { id: 'sports', label: 'Sports', icon: TvIcon },
    { id: 'education', label: 'Education', icon: AcademicCapIcon },
    { id: 'podcasts', label: 'Podcasts', icon: MicrophoneIcon },
  ];

  return (
    <aside className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-800 shadow-lg border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-4">
        <button
          onClick={onToggle}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
        </button>
      </div>

      <nav className="px-4 pb-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                currentView === item.id
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-6 h-6 flex-shrink-0" />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {isOpen && (
          <>
            <div className="mt-8 mb-4">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3">
                Explore
              </h3>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">StreamSphere Premium</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                Unlock exclusive features and ad-free experience
              </p>
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-200">
                Upgrade Now
              </button>
            </div>
          </>
        )}
      </nav>
    </aside>
  );
};

// Video Card Component
export const VideoCard = ({ video, onVideoClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onVideoClick(video)}
    >
      <div className="relative mb-3 rounded-xl overflow-hidden">
        <InteractiveThumbnail video={video} isHovered={isHovered} />
        
        {/* Duration */}
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.duration}
        </div>
        
        {/* Live Badge */}
        {video.isLive && <LiveStreamBadge />}
        
        {/* Quick Actions */}
        <div className={`absolute top-2 right-2 flex space-x-1 transition-opacity duration-200 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
          >
            {isLiked ? (
              <HeartIconSolid className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsBookmarked(!isBookmarked);
            }}
            className="p-2 bg-black/70 rounded-full hover:bg-black/90 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkIconSolid className="w-4 h-4 text-blue-500" />
            ) : (
              <BookmarkIcon className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </div>
      
      <div className="flex space-x-3">
        <img 
          src={video.creator === 'TechVisionary' ? 'https://images.pexels.com/photos/11158021/pexels-photo-11158021.jpeg' : 
               video.creator === 'StudioMaster' ? 'https://images.unsplash.com/photo-1637607698942-558b19148d82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjb250ZW50JTIwY3JlYXRvcnN8ZW58MHx8fGJsdWV8MTc1MDQ0MjE2N3ww&ixlib=rb-4.1.0&q=85' :
               video.creator === 'InnovationLab' ? 'https://images.unsplash.com/photo-1645588799116-4f416bf28902?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwZW50ZXJ0YWlubWVudHxlbnwwfHx8Ymx1ZXwxNzUwNDQyMTc1fDA&ixlib=rb-4.1.0&q=85' :
               'https://images.pexels.com/photos/5475744/pexels-photo-5475744.jpeg'}
          alt={video.creator}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">{video.creator}</p>
            {video.verified && <CreatorBadge />}
          </div>
          <div className="flex items-center space-x-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>{video.views} views</span>
            <span>•</span>
            <span>{video.uploadTime}</span>
            {video.premium && (
              <>
                <span>•</span>
                <StarIconSolid className="w-3 h-3 text-yellow-500" />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Interactive Thumbnail Component
export const InteractiveThumbnail = ({ video, isHovered }) => {
  return (
    <div className="relative">
      <img 
        src={video.thumbnail} 
        alt={video.title}
        className={`w-full aspect-video object-cover transition-transform duration-300 ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      />
      {isHovered && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="bg-white/90 rounded-full p-3">
            <PlayIconSolid className="w-8 h-8 text-gray-900" />
          </div>
        </div>
      )}
    </div>
  );
};

// Video Player Component
export const VideoPlayer = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const youtubeVideoId = video.id === 1 ? 'dQw4w9WgXcQ' : 
                        video.id === 2 ? 'L_jWHffIx5E' :
                        video.id === 3 ? 'ScMzIvxBSi4' :
                        video.id === 4 ? 'ZZ5LpwO-An4' :
                        video.id === 5 ? 'hFZFjoX2cGg' :
                        'dQw4w9WgXcQ';

  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-2xl">
      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=0&rel=0&modestbranding=1`}
          title={video.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      {/* Custom Controls Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isPlaying ? (
                <PauseIconSolid className="w-6 h-6" />
              ) : (
                <PlayIconSolid className="w-6 h-6" />
              )}
            </button>
            <div className="text-sm">
              <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
              <span className="mx-1">/</span>
              <span>{video.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              {isMuted ? (
                <SpeakerXMarkIconSolid className="w-5 h-5" />
              ) : (
                <SpeakerWaveIconSolid className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Video Details Component
export const VideoDetails = ({ video }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <div className="mt-6 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {video.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <EyeIcon className="w-4 h-4" />
              <span>{video.views} views</span>
            </div>
            <span>•</span>
            <span>{video.uploadTime}</span>
          </div>
          <SocialShare video={video} />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img 
            src={video.creator === 'TechVisionary' ? 'https://images.pexels.com/photos/11158021/pexels-photo-11158021.jpeg' : 
                 video.creator === 'StudioMaster' ? 'https://images.unsplash.com/photo-1637607698942-558b19148d82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjb250ZW50JTIwY3JlYXRvcnN8ZW58MHx8fGJsdWV8MTc1MDQ0MjE2N3ww&ixlib=rb-4.1.0&q=85' :
                 video.creator === 'InnovationLab' ? 'https://images.unsplash.com/photo-1645588799116-4f416bf28902?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2Mzl8MHwxfHNlYXJjaHwzfHxkaWdpdGFsJTIwZW50ZXJ0YWlubWVudHxlbnwwfHx8Ymx1ZXwxNzUwNDQyMTc1fDA&ixlib=rb-4.1.0&q=85' :
                 'https://images.pexels.com/photos/5475744/pexels-photo-5475744.jpeg'}
            alt={video.creator}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">{video.creator}</h3>
              {video.verified && <CreatorBadge />}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">2.5M subscribers</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-full">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-l-full transition-colors ${
                isLiked ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              {isLiked ? (
                <HeartIconSolid className="w-5 h-5" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
              <span className="text-sm font-medium">{video.likes.toLocaleString()}</span>
            </button>
            <div className="w-px h-6 bg-gray-300 dark:bg-gray-600"></div>
            <button
              onClick={() => setIsDisliked(!isDisliked)}
              className={`px-4 py-2 rounded-r-full transition-colors ${
                isDisliked ? 'text-red-600 dark:text-red-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 13l3 3 7-7" />
              </svg>
            </button>
          </div>

          <button
            onClick={() => setIsSubscribed(!isSubscribed)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
              isSubscribed
                ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
                : 'bg-red-600 hover:bg-red-700 text-white shadow-lg'
            }`}
          >
            {isSubscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <p className="text-gray-900 dark:text-white">
          {showFullDescription ? video.description : `${video.description.substring(0, 100)}...`}
        </p>
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="text-blue-600 dark:text-blue-400 text-sm mt-2 hover:underline"
        >
          {showFullDescription ? 'Show less' : 'Show more'}
        </button>
        
        <div className="mt-4 flex flex-wrap gap-2">
          {video.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {video.premium && <CreatorMonetization video={video} />}
    </div>
  );
};

// Creator Monetization Component
export const CreatorMonetization = ({ video }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-4 border border-yellow-200 dark:border-yellow-700">
      <div className="flex items-center space-x-3">
        <StarIconSolid className="w-6 h-6 text-yellow-500" />
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white">Premium Content</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This creator earned <span className="font-medium text-green-600 dark:text-green-400">{video.revenue}</span> from this video
          </p>
        </div>
      </div>
    </div>
  );
};

// Comment Section Component
export const CommentSection = ({ videoId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: 'TechEnthusiast',
      avatar: 'https://images.pexels.com/photos/11158021/pexels-photo-11158021.jpeg',
      text: 'This is revolutionary! StreamSphere is going to change everything.',
      likes: 45,
      replies: 12,
      time: '2 hours ago',
      verified: false
    },
    {
      id: 2,
      user: 'ContentCreator',
      avatar: 'https://images.unsplash.com/photo-1637607698942-558b19148d82?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwyfHxjb250ZW50JTIwY3JlYXRvcnN8ZW58MHx8fGJsdWV8MTc1MDQ0MjE2N3ww&ixlib=rb-4.1.0&q=85',
      text: 'AndreyVV created something amazing here. The UI is so smooth!',
      likes: 23,
      replies: 5,
      time: '4 hours ago',
      verified: true
    }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: 'AndreyVV',
        avatar: 'https://images.pexels.com/photos/11158021/pexels-photo-11158021.jpeg',
        text: newComment,
        likes: 0,
        replies: 0,
        time: 'Just now',
        verified: true
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        {comments.length} Comments
      </h3>

      <form onSubmit={handleSubmitComment} className="mb-6">
        <div className="flex space-x-3">
          <img 
            src="https://images.pexels.com/photos/11158021/pexels-photo-11158021.jpeg"
            alt="Your Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <img 
              src={comment.avatar}
              alt={comment.user}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-medium text-gray-900 dark:text-white">{comment.user}</span>
                {comment.verified && <CreatorBadge />}
                <span className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-2">{comment.text}</p>
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <HeartIcon className="w-4 h-4" />
                  <span className="text-sm">{comment.likes}</span>
                </button>
                <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                  <ChatBubbleLeftIcon className="w-4 h-4" />
                  <span className="text-sm">{comment.replies}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Trending Section Component
export const TrendingSection = ({ videos, onVideoClick }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trending on StreamSphere</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onVideoClick={onVideoClick} />
        ))}
      </div>
    </div>
  );
};

// Creator Card Component
export const CreatorCard = ({ creator }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col items-center text-center">
        <img 
          src={creator.avatar}
          alt={creator.name}
          className="w-20 h-20 rounded-full object-cover mb-4"
        />
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="font-bold text-gray-900 dark:text-white">{creator.name}</h3>
          {creator.verified && <CreatorBadge />}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{creator.subscribers} subscribers</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {creator.description}
        </p>
        <div className="grid grid-cols-2 gap-4 w-full mb-4 text-sm">
          <div className="text-center">
            <p className="font-semibold text-gray-900 dark:text-white">{creator.totalViews}</p>
            <p className="text-gray-500 dark:text-gray-400">Total Views</p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-green-600 dark:text-green-400">{creator.monthlyRevenue}</p>
            <p className="text-gray-500 dark:text-gray-400">Monthly Revenue</p>
          </div>
        </div>
        <button
          onClick={() => setIsSubscribed(!isSubscribed)}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
            isSubscribed
              ? 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200'
              : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>
    </div>
  );
};

// Categories Component
export const Categories = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2 mb-6">
      {categories.map((category) => (
        <button
          key={category.name}
          onClick={() => onCategoryClick(category.name)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 ${
            selectedCategory === category.name
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          <category.icon className="w-5 h-5" />
          <span className="font-medium">{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Recommendations Component
export const Recommendations = ({ videos }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Up Next</h3>
      <div className="space-y-4">
        {videos.slice(0, 5).map((video) => (
          <div key={video.id} className="flex space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors">
            <div className="relative">
              <img 
                src={video.thumbnail}
                alt={video.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 py-0.5 rounded">
                {video.duration}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm">
                {video.title}
              </h4>
              <div className="flex items-center space-x-1 mt-1">
                <p className="text-sm text-gray-600 dark:text-gray-400">{video.creator}</p>
                {video.verified && <CheckBadgeIconSolid className="w-3 h-3 text-blue-500" />}
              </div>
              <div className="flex items-center space-x-1 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{video.views} views</span>
                <span>•</span>
                <span>{video.uploadTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Utility Components
export const LoadingSpinner = () => (
  <div className="hidden">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

export const NotificationBell = ({ count }) => (
  <div className="relative">
    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <BellIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
    </button>
    {count > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {count}
      </span>
    )}
  </div>
);

export const UserProfile = ({ user }) => (
  <div className="flex items-center space-x-3">
    <img 
      src={user.avatar}
      alt={user.name}
      className="w-8 h-8 rounded-full object-cover"
    />
    <span className="font-medium text-gray-900 dark:text-white hidden sm:inline">
      {user.name}
    </span>
  </div>
);

export const ThemeToggle = ({ isDarkMode, onToggle }) => (
  <button
    onClick={onToggle}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  >
    {isDarkMode ? (
      <SunIcon className="w-6 h-6 text-yellow-500" />
    ) : (
      <MoonIcon className="w-6 h-6 text-gray-600" />
    )}
  </button>
);

export const LiveStreamBadge = () => (
  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full font-medium">
    LIVE
  </div>
);

export const CreatorBadge = () => (
  <CheckBadgeIconSolid className="w-4 h-4 text-blue-500" />
);

export const SocialShare = ({ video }) => (
  <div className="flex items-center space-x-2">
    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>
    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <BookmarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
    </button>
  </div>
);

// Additional Page Components
export const SearchPage = ({ videos, onVideoClick }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Search Results</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoClick={onVideoClick} />
      ))}
    </div>
  </div>
);

export const ChannelPage = ({ creator, videos }) => (
  <div>
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 mb-8 text-white">
      <div className="flex items-center space-x-6">
        <img 
          src={creator.avatar}
          alt={creator.name}
          className="w-32 h-32 rounded-full object-cover border-4 border-white"
        />
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-4xl font-bold">{creator.name}</h1>
            {creator.verified && <CheckBadgeIconSolid className="w-8 h-8" />}
          </div>
          <p className="text-xl opacity-90 mb-4">{creator.subscribers} subscribers</p>
          <p className="opacity-80 mb-4">{creator.description}</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
    
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onVideoClick={() => {}} />
        ))}
      </div>
    </div>
  </div>
);

export const SubscriptionFeed = ({ videos }) => (
  <div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Subscriptions</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} onVideoClick={() => {}} />
      ))}
    </div>
  </div>
);

export const Footer = () => (
  <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-8 mt-12">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">S</span>
            </div>
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              StreamSphere
            </span>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            The revolutionary video platform created by AndreyVV. Experience the future of content creation.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">About</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Features</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Premium</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Enterprise</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Creators</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Creator Hub</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Monetization</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Analytics</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Resources</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Community</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
            <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy</a></li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 StreamSphere by AndreyVV. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
            <GlobeAltIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
);

// Additional utility components
export const VideoAnalytics = ({ video }) => null;
export const AdvancedFilter = () => null;
export const HoverPreview = () => null;
export const PlaylistManager = () => null;
export const VideoRecommendations = () => null;