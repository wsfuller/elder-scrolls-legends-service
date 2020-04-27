const allowedDomains = [
  'https://elder-scrolls-legends.netlify.app/',
  'https://elder-scrolls-legends.netlify.com/',
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedDomains.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

module.exports = {
  corsOptions,
};
