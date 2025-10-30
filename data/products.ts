// Temporary mock data (acts like a database)
const products = [
  {
    _id: "1",
    name: "AstroVision Telescope",
    slug: "astrovision-telescope",
    description:
      "High-precision telescope with 150 mm aperture for deep-sky observation.",
    price: 25999,
    category: "Astronomy",
    inventory: 12,
    image:
      "/images/telescope.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Drone Explorer X4",
    slug: "drone-explorer-x4",
    description:
      "Quad-copter drone with 4K camera and 30 min flight time.",
    price: 48999,
    category: "Drones",
    inventory: 5,
    image:
      "/images/drone.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Raspberry Pi Starter Kit",
    slug: "raspberry-pi-starter-kit",
    description:
      "All-in-one electronics starter kit including Raspberry Pi 4 B 4 GB.",
    price: 7999,
    category: "Electronics",
    inventory: 20,
    image:
      "/images/raspberrypi.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "SpaceLab Robotics Arm",
    slug: "spacelab-robotics-arm",
    description:
      "6-axis programmable robotic arm for engineering and prototyping.",
    price: 31999,
    category: "Robotics",
    inventory: 3,
    image:
      "/images/roboticsarm.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "AI Vision Camera Module",
    slug: "ai-vision-camera-module",
    description:
      "AI-powered camera module for object detection and tracking projects.",
    price: 12999,
    category: "AI Hardware",
    inventory: 8,
    image:
      "/images/camera-module.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Solar Energy Charger Kit",
    slug: "solar-energy-charger-kit",
    description:
      "Portable solar charging kit with 25W panel and USB-C output.",
    price: 4999,
    category: "Energy",
    inventory: 15,
    image:
      "/images/solar-charger.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "7",
    name: "Smart IoT Weather Station",
    slug: "smart-iot-weather-station",
    description:
      "Compact IoT-enabled weather monitoring station with Wi-Fi support.",
    price: 8999,
    category: "IoT Devices",
    inventory: 7,
    image:
      "/images/weather-station.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "8",
    name: "QuantumBit Microprocessor Kit",
    slug: "quantumbit-microprocessor-kit",
    description:
      "Educational microprocessor development kit for low-level hardware learners.",
    price: 17499,
    category: "Hardware",
    inventory: 4,
    image:
      "/images/microprocessor.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "9",
    name: "Lunar Rover Chassis Kit",
    slug: "lunar-rover-chassis-kit",
    description:
      "All-terrain robotic chassis inspired by real lunar rover designs.",
    price: 27999,
    category: "Robotics",
    inventory: 6,
    image:
      "/images/chasis-kit.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "10",
    name: "NeuralNet Edge Device",
    slug: "neuralnet-edge-device",
    description:
      "Compact AI edge device for running TensorFlow Lite models offline.",
    price: 22999,
    category: "AI Hardware",
    inventory: 10,
    image:
      "/images/neural-net.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "11",
    name: "StarLink Signal Booster",
    slug: "starlink-signal-booster",
    description:
      "Signal booster module to extend satellite internet connectivity range.",
    price: 15999,
    category: "Networking",
    inventory: 9,
    image:
      "/images/signal-booster.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "12",
    name: "Drone Propulsion System V2",
    slug: "drone-propulsion-system-v2",
    description:
      "High-efficiency brushless motor and propeller combo for drone enthusiasts.",
    price: 11499,
    category: "Drones",
    inventory: 13,
    image:
      "/images/drone.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "13",
    name: "Cosmic Observatory Camera",
    slug: "cosmic-observatory-camera",
    description:
      "High-resolution astrophotography camera with 24MP sensor and cooling system.",
    price: 34999,
    category: "Astronomy",
    inventory: 2,
    image:
      "/images/camera-module.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "14",
    name: "Embedded Systems Lab Kit",
    slug: "embedded-systems-lab-kit",
    description:
      "Complete embedded systems learning kit with sensors, boards, and manuals.",
    price: 9999,
    category: "Education",
    inventory: 18,
    image:
      "/images/raspberrypi.avif",
    lastUpdated: new Date().toISOString(),
  },
  {
    _id: "15",
    name: "SpaceComm Transceiver Module",
    slug: "spacecomm-transceiver-module",
    description:
      "Low-power, high-frequency transceiver for satellite communication projects.",
    price: 19999,
    category: "Communication",
    inventory: 5,
    image:
      "/images/signal-booster.avif",
    lastUpdated: new Date().toISOString(),
  },
];

export default products;