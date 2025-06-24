import {
  Bot,
  CameraIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileCodeIcon,
  FileIcon,
  FileTextIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  Star,
  UsersIcon,
  Video,
} from 'lucide-react'

export const mockUser = {
  name: 'Admin',
  email: 'admin@goonus.io',
  avatar: '/onus_avatar.png',
}

export const navMain = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Meetings',
    url: '/meetings',
    icon: Video,
  },
  {
    title: 'Agents',
    url: '/agents',
    icon: Bot,
  },
  {
    title: 'Projects',
    url: '#',
    icon: FolderIcon,
  },
  {
    title: 'Team',
    url: '#',
    icon: UsersIcon,
  },
]

export const navClouds = [
  {
    title: 'Capture',
    icon: CameraIcon,
    isActive: true,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
  {
    title: 'Proposal',
    icon: FileTextIcon,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
  {
    title: 'Prompts',
    icon: FileCodeIcon,
    url: '#',
    items: [
      {
        title: 'Active Proposals',
        url: '#',
      },
      {
        title: 'Archived',
        url: '#',
      },
    ],
  },
]

export const navSecondary = [
  {
    title: 'Settings',
    url: '#',
    icon: SettingsIcon,
  },
  {
    title: 'Get Help',
    url: '#',
    icon: HelpCircleIcon,
  },
  {
    title: 'Search',
    url: '#',
    icon: SearchIcon,
  },
  {
    title: 'Upgrade',
    url: '/upgrade',
    icon: Star,
  },
]

export const documents = [
  {
    title: 'Data Library',
    url: '#',
    icon: DatabaseIcon,
  },
  {
    title: 'Reports',
    url: '#',
    icon: ClipboardListIcon,
  },
  {
    title: 'Word Assistant',
    url: '#',
    icon: FileIcon,
  },
]

export const allSidebarItems = [
  ...navMain,
  ...navClouds,
  ...navSecondary,
  ...documents,
]
