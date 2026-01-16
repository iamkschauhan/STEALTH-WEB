import React from 'react';

interface Tab {
  icon: React.ReactNode;
  iconFilled: React.ReactNode;
  title: string;
}

interface TabBarProps {
  tabs: Tab[];
  selectedTab: number;
  onTabChange: (index: number) => void;
}

const Icon: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`${className}`}>{children}</span>
);

export const TabBar: React.FC<TabBarProps> = ({ tabs, selectedTab, onTabChange }) => {
  return (
    <>
      {/* Mobile: Bottom Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 pb-3 px-4 z-50 lg:hidden">
        <div className="glass-effect rounded-[36px] border border-white/10 shadow-lg backdrop-blur-xl bg-white/5 max-w-content mx-auto">
          <div className="flex items-center justify-around h-[70px] px-2">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => onTabChange(index)}
                className={`flex flex-col items-center justify-center gap-1 flex-1 transition-all duration-300 ${
                  selectedTab === index ? 'opacity-100' : 'opacity-60'
                }`}
              >
                {selectedTab === index ? (
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange/25 rounded-full blur-md -z-10" />
                    <div className="glass-effect bg-orange/30 rounded-full p-2">
                      <Icon className="text-white text-xl font-semibold">
                        {tab.iconFilled}
                      </Icon>
                    </div>
                  </div>
                ) : (
                  <Icon className="text-white text-xl">
                    {tab.icon}
                  </Icon>
                )}
                <span className={`text-white text-[10px] ${
                  selectedTab === index ? 'font-semibold' : 'font-medium'
                }`}>
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 xl:w-24 z-50 flex-col items-center py-6 glass-effect border-r border-white/10 backdrop-blur-xl bg-white/5">
        <div className="flex flex-col items-center gap-6 w-full px-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => onTabChange(index)}
              className={`flex flex-col items-center justify-center gap-2 w-full py-3 rounded-xl transition-all duration-300 ${
                selectedTab === index 
                  ? 'opacity-100 bg-orange/20' 
                  : 'opacity-60 hover:opacity-80 hover:bg-white/5'
              }`}
              title={tab.title}
            >
              {selectedTab === index ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-orange/25 rounded-full blur-md -z-10" />
                  <div className="glass-effect bg-orange/30 rounded-full p-2">
                    <Icon className="text-white text-xl xl:text-2xl font-semibold">
                      {tab.iconFilled}
                    </Icon>
                  </div>
                </div>
              ) : (
                <Icon className="text-white text-xl xl:text-2xl">
                  {tab.icon}
                </Icon>
              )}
              <span className={`text-white text-[10px] xl:text-xs ${
                selectedTab === index ? 'font-semibold' : 'font-medium'
              }`}>
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};
