import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";

interface NavItem {
  id: string;
  path: string;
  icon: string;
  name: string;
}

interface User {
  id: string;
  image: string;
  name: string;
  message: string;
  time: string;
}

export const navigationArr: NavItem[] = [
  {
    id: "e1",
    path: "/",
    icon: "mingcute:home-3-line",
    name: "Home",
  },
  {
    id: "e2",
    path: "/add-friend",
    icon: "weui:add-friends-filled",
    name: "Add friend",
  },
  {
    id: "e3",
    path: "/friends",
    icon: "mdi:people",
    name: "Friends",
  },
  {
    id: "e3",
    path: "/profile",
    icon: "iconamoon:profile-fill",
    name: "Profile",
  },
];

export const userDummyArr: User[] = [
  {
    id: "user1",
    name: "Kristin Watson",
    message: `Haha that's terrifying`,
    time: "12m",
    image: image1,
  },
  {
    id: "user2",
    name: "Esther Howard",
    message: `perfect!`,
    time: "24m",
    image: image2,
  },
  {
    id: "user3",
    name: "Jane Cooper",
    message: `Wow, this is really epic`,
    time: "15m",
    image: image4,
  },
  {
    id: "user4",
    name: "Robert Fox",
    message: `aww`,
    time: "44m",
    image: image6,
  },
  {
    id: "user5",
    name: "Kathryn Murphy",
    message: `omg, this is amazing`,
    time: "8m",
    image: image3,
  },
  {
    id: "user6",
    name: "Theresa Webb",
    message: `Haha oh man`,
    time: "33m",
    image: image5,
  },
  {
    id: "user7",
    name: "Eleanor Pena",
    message: `just ideas for next time`,
    time: "50m",
    image: image7,
  },
  {
    id: "user8",
    name: "Darrell Steward",
    message: `woohoooo`,
    time: "58m",
    image: image8,
  },
  {
    id: "user9",
    name: "Eleanor Pena",
    message: `just ideas for next time`,
    time: "50m",
    image: image7,
  },
  {
    id: "user10",
    name: "Darrell Steward",
    message: `woohoooo`,
    time: "58m",
    image: image8,
  },
];
