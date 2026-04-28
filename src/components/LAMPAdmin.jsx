import React, { useState } from 'react';
import { Twitter, Linkedin, Github, Instagram, Youtube, Facebook, Globe, Mail, Plus, X, Edit3, Save, Eye, Settings, Palette, Move, Trash2 } from 'lucide-react';

const LAMPAdmin = () => {
const [activeTab, setActiveTab] = useState('profiles');
const [previewMode, setPreviewMode] = useState(false);
const [hoveredProfile, setHoveredProfile] = useState(null);
const [isHubHovered, setIsHubHovered] = useState(false);

// Available platforms library
const platformLibrary = {
social: [
{ id: 'twitter', name: 'Twitter', icon: Twitter, color: '#1DA1F2', placeholder: '@username' },
{ id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#0077B5', placeholder: 'Your Name' },
{ id: 'instagram', name: 'Instagram', icon: Instagram, color: '#E4405F', placeholder: '@username' },
{ id: 'facebook', name: 'Facebook', icon: Facebook, color: '#1877F2', placeholder: 'Your Name' },
{ id: 'youtube', name: 'YouTube', icon: Youtube, color: '#FF0000', placeholder: 'Channel Name' },
],
professional: [
{ id: 'github', name: 'GitHub', icon: Github, color: '#333', placeholder: 'username' },
{ id: 'website', name: 'Website', icon: Globe, color: '#6366F1', placeholder: 'yoursite.com' },
{ id: 'email', name: 'Email', icon: Mail, color: '#059669', placeholder: 'your@email.com' },
]
};

// User configuration state
const [userConfig, setUserConfig] = useState({
name: "Alex Johnson",
avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
theme: {
hexColor: '#6366F1',
accentColor: '#8B5CF6',
backgroundColor: '#1E293B'
},
profiles: [
{ id: '1', platform: 'twitter', handle: '@alexjohnson', url: 'https://twitter.com/alexjohnson', position: 0 },
{ id: '2', platform: 'linkedin', handle: 'Alex Johnson', url: 'https://linkedin.com/in/alexjohnson', position: 1 },
{ id: '3', platform: 'github', handle: 'alexjohnson', url: 'https://github.com/alexjohnson', position: 2 },
]
});

const [editingProfile, setEditingProfile] = useState(null);
const [newProfile, setNewProfile] = useState({ platform: '', handle: '', url: '' });

// Add new profile
const addProfile = () => {
if (newProfile.platform && newProfile.handle) {
const platform = Object.values(platformLibrary).flat().find(p => p.id === newProfile.platform);
setUserConfig(prev => ({
…prev,
profiles: […prev.profiles, {
id: Date.now().toString(),
platform: newProfile.platform,
handle: newProfile.handle,
url: newProfile.url || `https://${platform.name.toLowerCase()}.com/${newProfile.handle}`,
position: prev.profiles.length
}]
}));
setNewProfile({ platform: '', handle: '', url: '' });
}
};

// Remove profile
const removeProfile = (id) => {
setUserConfig(prev => ({
…prev,
profiles: prev.profiles.filter(p => p.id !== id)
}));
};

// Update profile
const updateProfile = (id, updates) => {
setUserConfig(prev => ({
…prev,
profiles: prev.profiles.map(p => p.id === id ? { …p, …updates } : p)
}));
};

// Preview component
const getSpokePosition = (index, total) => {
const angle = (index * 360) / total - 90;
const radius = 80;
const x = Math.cos((angle * Math.PI) / 180) * radius;
const y = Math.sin((angle * Math.PI) / 180) * radius;
return { x, y, angle };
};

const LAMPPreview = () => (
<div className="flex items-center justify-center h-64 bg-slate-900 rounded-lg relative overflow-hidden">
<div
className="relative w-20 h-20 cursor-pointer"
onMouseEnter={() => setIsHubHovered(true)}
onMouseLeave={() => {
setIsHubHovered(false);
setHoveredProfile(null);
}}
>
{/* Hexagonal background */}
<div className="absolute inset-0">
<div
className="w-full h-full shadow-xl transition-all duration-300 hover:scale-110"
style={{
background: `linear-gradient(135deg, ${userConfig.theme.hexColor}, ${userConfig.theme.accentColor})`,
clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
filter: isHubHovered ? 'brightness(1.2)' : 'brightness(1)'
}}
/>
</div>

    {/* Avatar */}
    <div className="absolute inset-1 rounded-full overflow-hidden border-2 border-white/20">
      <img src={userConfig.avatar} alt={userConfig.name} className="w-full h-full object-cover" />
    </div>

    {/* Profile spokes */}
    {isHubHovered && userConfig.profiles.map((profile, index) => {
      const position = getSpokePosition(index, userConfig.profiles.length);
      const platform = Object.values(platformLibrary).flat().find(p => p.id === profile.platform);
      const IconComponent = platform?.icon || Globe;

      return (
        <div key={profile.id}>
          <div
            className="absolute w-0.5 bg-white/30 origin-center transition-all duration-500"
            style={{
              left: '50%', top: '50%', height: '80px',
              transform: `translate(-50%, -50%) rotate(${position.angle}deg)`,
              opacity: isHubHovered ? 1 : 0
            }}
          />
          <div
            className="absolute w-8 h-8 rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-125 flex items-center justify-center"
            style={{
              left: `calc(50% + ${position.x}px)`,
              top: `calc(50% + ${position.y}px)`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: platform?.color || '#6366F1',
              opacity: isHubHovered ? 1 : 0,
              transitionDelay: `${index * 50}ms`
            }}
          >
            <IconComponent className="w-4 h-4 text-white" />
          </div>
        </div>
      );
    })}
  </div>
</div>
```

);

return (
<div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
<div className="max-w-6xl mx-auto p-6">
{/* Header */}
<div className="flex items-center justify-between mb-8">
<div>
<h1 className="text-3xl font-bold text-white">LAMP Admin</h1>
<p className="text-slate-400">Configure your social media hub</p>
</div>
<button
onClick={() => setPreviewMode(!previewMode)}
className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
>
<Eye className="w-4 h-4" />
{previewMode ? 'Edit Mode' : 'Preview Mode'}
</button>
</div>

    {previewMode ? (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
          <LAMPPreview />
        </div>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Embed Code</h2>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <div className="text-green-400 mb-2">HTML Embed:</div>
            <div className="text-slate-300">
              &lt;script src="https://lamp.app/widget.js"&gt;&lt;/script&gt;<br/>
              &lt;lamp-hub user-id="{userConfig.name.toLowerCase().replace(' ', '')}"&gt;&lt;/lamp-hub&gt;
            </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-lg font-mono text-sm">
            <div className="text-green-400 mb-2">Email Signature:</div>
            <div className="text-slate-300">
              Copy the generated HTML code into your email signature settings
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation */}
        <div className="lg:col-span-1">
          <nav className="space-y-2">
            {[
              { id: 'profiles', label: 'Profiles', icon: Settings },
              { id: 'appearance', label: 'Appearance', icon: Palette },
              { id: 'settings', label: 'Settings', icon: Edit3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === tab.id ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Preview</h3>
            <LAMPPreview />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {activeTab === 'profiles' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Manage Profiles</h2>
              
              {/* Current Profiles */}
              <div className="space-y-4">
                {userConfig.profiles.map(profile => {
                  const platform = Object.values(platformLibrary).flat().find(p => p.id === profile.platform);
                  const IconComponent = platform?.icon || Globe;
                  
                  return (
                    <div key={profile.id} className="bg-slate-800 p-4 rounded-lg flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: platform?.color || '#6366F1' }}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold">{platform?.name}</div>
                        <div className="text-slate-400 text-sm">{profile.handle}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingProfile(profile.id)}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeProfile(profile.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Add New Profile */}
              <div className="bg-slate-800 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Add New Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <select
                    value={newProfile.platform}
                    onChange={(e) => setNewProfile(prev => ({ ...prev, platform: e.target.value }))}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                  >
                    <option value="">Select Platform</option>
                    <optgroup label="Social Media">
                      {platformLibrary.social.map(platform => (
                        <option key={platform.id} value={platform.id}>{platform.name}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Professional">
                      {platformLibrary.professional.map(platform => (
                        <option key={platform.id} value={platform.id}>{platform.name}</option>
                      ))}
                    </optgroup>
                  </select>
                  <input
                    type="text"
                    placeholder="Handle/Username"
                    value={newProfile.handle}
                    onChange={(e) => setNewProfile(prev => ({ ...prev, handle: e.target.value }))}
                    className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                  />
                  <button
                    onClick={addProfile}
                    className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg px-4 py-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Customize Appearance</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Colors</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Hexagon Color</label>
                      <input
                        type="color"
                        value={userConfig.theme.hexColor}
                        onChange={(e) => setUserConfig(prev => ({
                          ...prev,
                          theme: { ...prev.theme, hexColor: e.target.value }
                        }))}
                        className="w-full h-10 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Accent Color</label>
                      <input
                        type="color"
                        value={userConfig.theme.accentColor}
                        onChange={(e) => setUserConfig(prev => ({
                          ...prev,
                          theme: { ...prev.theme, accentColor: e.target.value }
                        }))}
                        className="w-full h-10 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Avatar</h3>
                  <div className="space-y-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-slate-600 mx-auto">
                      <img src={userConfig.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Avatar Source Options */}
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-2">Choose Avatar Source</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              const input = document.createElement('input');
                              input.type = 'file';
                              input.accept = 'image/*';
                              input.onchange = (e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (e) => {
                                    setUserConfig(prev => ({ ...prev, avatar: e.target.result }));
                                  };
                                  reader.readAsDataURL(file);
                                }
                              };
                              input.click();
                            }}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2 text-sm transition-colors"
                          >
                            📁 Upload Photo
                          </button>
                          <button
                            onClick={() => {
                              // Demo: Use Gravatar based on email
                              const email = 'demo@example.com'; // Would get from user input
                              const hash = 'demo'; // Would generate MD5 hash
                              const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=150&d=identicon`;
                              setUserConfig(prev => ({ ...prev, avatar: gravatarUrl }));
                            }}
                            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 rounded-lg px-3 py-2 text-sm transition-colors"
                          >
                            🔗 Use Gravatar
                          </button>
                        </div>
                      </div>
                      
                      {/* Platform Avatar Sync */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Sync from Platform</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              // Demo: GitHub avatar API
                              const githubProfile = userConfig.profiles.find(p => p.platform === 'github');
                              if (githubProfile) {
                                const username = githubProfile.handle;
                                const githubAvatarUrl = `https://github.com/${username}.png?size=150`;
                                setUserConfig(prev => ({ ...prev, avatar: githubAvatarUrl }));
                              } else {
                                alert('Add a GitHub profile first to sync avatar');
                              }
                            }}
                            className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 text-sm transition-colors"
                          >
                            <Github className="w-4 h-4" /> GitHub
                          </button>
                          <button
                            onClick={() => {
                              // Demo: LinkedIn would require OAuth
                              alert('LinkedIn integration requires OAuth setup - coming soon!');
                            }}
                            className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 rounded-lg px-3 py-2 text-sm transition-colors"
                          >
                            <Linkedin className="w-4 h-4" /> LinkedIn
                          </button>
                        </div>
                      </div>
                      
                      {/* Manual URL Input */}
                      <div>
                        <label className="block text-sm font-medium mb-2">Or Enter URL</label>
                        <input
                          type="url"
                          placeholder="https://example.com/avatar.jpg"
                          value={userConfig.avatar}
                          onChange={(e) => setUserConfig(prev => ({ ...prev, avatar: e.target.value }))}
                          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">General Settings</h2>
              
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Display Name</label>
                    <input
                      type="text"
                      value={userConfig.name}
                      onChange={(e) => setUserConfig(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div className="pt-4 border-t border-slate-700">
                    <h3 className="text-lg font-semibold mb-4">Integration Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Enable click tracking</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Show profile tooltips</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input type="checkbox" className="rounded" />
                        <span>Auto-update from social platforms</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
</div>
```

);
};

export default LAMPAdmin;