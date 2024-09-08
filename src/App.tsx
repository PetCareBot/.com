import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Star,
  Command,
} from "lucide-react";

const Paw: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z" />
    <path d="M20 5a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z" />
    <path d="M4 5a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z" />
    <path d="M12 14a3 3 0 0 0-3 3c0 1.5 1.5 3 3 3s3-1.5 3-3a3 3 0 0 0-3-3z" />
  </svg>
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => (
  <button
    className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${className}`}
    {...props}
  >
    {children}
  </button>
);

type StatusType = "operational" | "degraded" | "outage";

const StatusIndicator: React.FC<{ status: StatusType }> = ({ status }) => {
  const statusConfig = {
    operational: {
      icon: CheckCircle,
      color: "text-green-400",
      text: "Operational",
    },
    degraded: {
      icon: AlertTriangle,
      color: "text-yellow-400",
      text: "Degraded",
    },
    outage: { icon: XCircle, color: "text-red-400", text: "Outage" },
  } as const;

  const { icon: Icon, color, text } = statusConfig[status];

  return (
    <div className={`flex items-center ${color}`}>
      <Icon className="w-5 h-5 mr-2" />
      <span>{text}</span>
    </div>
  );
};

const Help: React.FC = () => {
  const topics = [
    "Getting Started",
    "Commands",
    "Pet Care",
    "Customization",
    "Troubleshooting",
  ];
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  return (
    <div className="flex h-full">
      <div className="w-1/4 bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Help Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic} className="mb-2">
              <button
                className={`w-full text-left p-2 rounded ${
                  selectedTopic === topic
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-3/4 p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTopic}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">{selectedTopic}</h1>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-gray-800 p-4 rounded-lg"
                >
                  <h3 className="text-xl font-semibold mb-2">Section {i}</h3>
                  <p className="text-gray-300">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam in dui mauris.
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

interface UserData {
  id: string;
  username: string;
  discriminator: string;
  avatar: string;
  servers: { id: string; name: string; icon: string }[];
}

type Pet = {
  id: number;
  name: string;
  type: string;
  level: number;
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const [overallStatus, setOverallStatus] = useState<StatusType>("operational");
  const [services, setServices] = useState([
    { name: "Bot Core", status: "operational" as StatusType },
    { name: "Web Dashboard", status: "operational" as StatusType },
    { name: "API", status: "operational" as StatusType },
    { name: "Database", status: "operational" as StatusType },
  ]);
  const [showPremiumPopup, setShowPremiumPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [pets] = useState<Pet[]>([
    { id: 1, name: "Fluffy", type: "Cat", level: 5 },
    { id: 2, name: "Buddy", type: "Dog", level: 7 },
    { id: 3, name: "Tweety", type: "Bird", level: 3 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const statuses: StatusType[] = ["operational", "degraded", "outage"];
      const newServices = services.map((service) => ({
        ...service,
        status: statuses[Math.floor(Math.random() * statuses.length)],
      }));
      setServices(newServices);

      const hasOutage = newServices.some(
        (service) => service.status === "outage"
      );
      const hasDegraded = newServices.some(
        (service) => service.status === "degraded"
      );
      setOverallStatus(
        hasOutage ? "outage" : hasDegraded ? "degraded" : "operational"
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [services]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "DISCORD_AUTH_SUCCESS") {
        setIsLoggedIn(true);
        setUserData(event.data.userData);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogin = () => {
    const width = 500;
    const height = 700;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    window.open(
      "https://discord.com/api/oauth2/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code&scope=identify%20guilds",
      "Discord Login",
      `width=${width},height=${height},left=${left},top=${top}`
    );
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
  };

  const PremiumPopup = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={() => setShowPremiumPopup(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-purple-400">
            Unleash Premium Power
          </h2>
          <button
            className="text-gray-400 hover:text-white transition-colors"
            onClick={() => setShowPremiumPopup(false)}
          >
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Pro",
              price: "$9.99/month",
              features: [
                "Custom commands",
                "Priority support",
                "Advanced analytics",
                "Unlimited pets",
              ],
              buttonText: "Choose Pro",
            },
            {
              title: "Ultimate",
              price: "$19.99/month",
              features: [
                "All Pro features",
                "White-label bot",
                "API access",
                "Dedicated server",
              ],
              buttonText: "Choose Ultimate",
            },
          ].map((tier) => (
            <motion.div
              key={tier.title}
              className="bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold mb-4">{tier.title}</h3>
              <p className="text-3xl font-bold mb-6">{tier.price}</p>
              <ul className="space-y-2 mb-6">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                {tier.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const BotCommands = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[
        { name: "!pet", description: "View your current pet" },
        { name: "!feed", description: "Feed your pet" },
        { name: "!play", description: "Play with your pet" },
        { name: "!train", description: "Train your pet new tricks" },
        { name: "!shop", description: "Visit the pet shop" },
        { name: "!leaderboard", description: "View top pet owners" },
      ].map((command) => (
        <motion.div
          key={command.name}
          className="bg-gray-800 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <Command className="w-5 h-5 mr-2 text-purple-400" />
            <h3 className="text-lg font-semibold">{command.name}</h3>
          </div>
          <p className="text-gray-400">{command.description}</p>
        </motion.div>
      ))}
    </div>
  );

  const PetList = () => (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pets.map((pet) => (
        <motion.div
          key={pet.id}
          className="bg-gray-800 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center mb-2">
            <Paw className="w-5 h-5 mr-2 text-purple-400" />
            <h3 className="text-lg font-semibold">{pet.name}</h3>
          </div>
          <p className="text-gray-400">Type: {pet.type}</p>
          <p className="text-gray-400">Level: {pet.level}</p>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 py-4 px-6 md:px-12 lg:px-24">
        <nav className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-purple-400 text-2xl font-bold flex items-center"
          >
            <Paw className="w-8 h-8 mr-2" />
            PetCare
          </motion.div>
          <div className="hidden lg:flex space-x-6">
            {[
              "Home",
              "Manage Servers",
              "Join Server",
              "Commands",
              "Help",
              "Status",
              "Pets",
            ].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => {
                  if (item === "Join Server") {
                    window.open(
                      "https://discord.gg/your-invite-link",
                      "_blank"
                    );
                  } else {
                    setCurrentPage(item.toLowerCase().replace(" ", "-"));
                  }
                }}
                className={`hover:text-purple-400 transition-colors ${
                  currentPage === item.toLowerCase().replace(" ", "-")
                    ? "text-purple-400"
                    : ""
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.button>
            ))}
          </div>
          <div className="hidden lg:flex space-x-4">
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setShowPremiumPopup(true)}
            >
              Get Premium
            </Button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <img
                  src={`https://cdn.discordapp.com/avatars/${userData?.id}/${userData?.avatar}.png`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span>
                  {userData?.username}#{userData?.discriminator}
                </span>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleLogout}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <Button
                className="bg-pink-600 hover:bg-pink-700 text-white"
                onClick={handleLogin}
              >
                Log In with Discord
              </Button>
            )}
          </div>
          <button className="lg:hidden text-white" onClick={toggleMenu}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden bg-gray-800 p-4"
          >
            {[
              "Home",
              "Manage Servers",
              "Join Server",
              "Commands",
              "Help",
              "Status",
              "Pets",
            ].map((item) => (
              <button
                key={item}
                onClick={() => {
                  if (item === "Join Server") {
                    window.open(
                      "https://discord.gg/your-invite-link",
                      "_blank"
                    );
                  } else {
                    setCurrentPage(item.toLowerCase().replace(" ", "-"));
                    setIsMenuOpen(false);
                  }
                }}
                className="block py-2 hover:text-purple-400 transition-colors"
              >
                {item}
              </button>
            ))}
            <Button
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                setShowPremiumPopup(true);
                setIsMenuOpen(false);
              }}
            >
              Get Premium
            </Button>
            {isLoggedIn ? (
              <Button
                className="w-full mt-2 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            ) : (
              <Button
                className="w-full mt-2 bg-pink-600 hover:bg-pink-700 text-white"
                onClick={handleLogin}
              >
                Log In with Discord
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow container mx-auto px-6 py-12 md:py-24">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col lg:flex-row items-center justify-between"
            >
              <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                  Unleash the Power of Virtual Pets in Your Discord
                </h1>
                <p className="text-xl md:text-2xl mb-12 text-gray-300">
                  PetCare Bot brings fun, engagement, and community-building to
                  your Discord server through interactive virtual pets. Automate
                  moderation, boost activity, and create unforgettable
                  experiences!
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white text-lg py-3 px-8 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300"
                    onClick={
                      isLoggedIn
                        ? () => setCurrentPage("manage-servers")
                        : handleLogin
                    }
                  >
                    {isLoggedIn ? "Manage Servers" : "Add to Discord"}
                  </Button>
                  <Button className="bg-gray-700 hover:bg-gray-600 text-white text-lg py-3 px-8 w-full sm:w-auto transform hover:scale-105 transition-transform duration-300">
                    Try Demo
                  </Button>
                </div>
              </div>
              <div className="lg:w-1/2">
                <motion.img
                  src="/placeholder.svg?height=400&width=600"
                  alt="PetCare Bot in action"
                  className="mx-auto rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <p className="mt-4 text-center text-gray-400">
                  Used by 2.5M+ Discord Servers
                </p>
              </div>
            </motion.div>
          )}

          {currentPage === "commands" && (
            <motion.div
              key="commands"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                PetCare Bot Commands
              </h1>
              <p className="text-xl text-center mb-12 text-gray-300">
                Explore the various commands available to interact with your
                virtual pets!
              </p>
              <BotCommands />
            </motion.div>
          )}

          {currentPage === "help" && (
            <motion.div
              key="help"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Help />
            </motion.div>
          )}

          {currentPage === "status" && (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                PetCare Bot Status
              </h1>
              <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">
                  Overall System Status
                </h2>
                <StatusIndicator status={overallStatus} />
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg shadow-lg p-6"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {service.name}
                    </h3>
                    <StatusIndicator status={service.status} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {isLoggedIn && currentPage === "manage-servers" && (
            <motion.div
              key="manage-servers"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                Manage Your Servers
              </h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {userData?.servers.map((server) => (
                  <motion.div
                    key={server.id}
                    className="bg-gray-800 p-4 rounded-lg shadow-md"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-center mb-2">
                      <img
                        src={`https://cdn.discordapp.com/icons/${server.id}/${server.icon}.png`}
                        alt={`${server.name} icon`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                      <h3 className="text-lg font-semibold">{server.name}</h3>
                    </div>
                    <Button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white">
                      Manage Bot
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {currentPage === "pets" && (
            <motion.div
              key="pets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-center">
                Your Pets
              </h1>
              <PetList />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-800 py-12 px-6 md:px-24">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-purple-400 mb-4">Product</h3>
            <ul className="space-y-2">
              {["Features", "Pricing", "Integrations", "FAQ"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-4">Resources</h3>
            <ul className="space-y-2">
              {["Documentation", "API Reference", "Guides", "Status"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-4">Company</h3>
            <ul className="space-y-2">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-purple-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-purple-400 mb-4">Legal</h3>
            <ul className="space-y-2">
              {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-purple-400 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="mt-12 text-center text-gray-400">
          <p>&copy; 2024 PetCare Bot. All rights reserved.</p>
        </div>
      </footer>

      <AnimatePresence>{showPremiumPopup && <PremiumPopup />}</AnimatePresence>
    </div>
  );
}
