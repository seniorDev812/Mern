import cors from "cors";

const crossOrigin = (app) => {
  const corsOptions = {
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };

  if (process.env.NODE_ENV === "dev") {
    //! Development environment
    const devOrigin = process.env.CLIENT_DEV_URL || 'http://localhost:3000';
    app.use(
      cors({
        ...corsOptions,
        origin: devOrigin,
      }),
    );
    console.log('CORS configured for development:', devOrigin);
  } else {
    //! Production environment
    const prodOrigin = process.env.CLIENT_PROD_URL;
    if (!prodOrigin) {
      console.warn('CLIENT_PROD_URL not set in production environment');
    }
    app.use(
      cors({
        ...corsOptions,
        origin: prodOrigin,
      }),
    );
    console.log('CORS configured for production:', prodOrigin);
  }

  // Error handling for CORS
  app.use((err, req, res, next) => {
    if (err.name === 'CORSError') {
      console.error('CORS Error:', err);
      return res.status(403).json({
        msg: {
          title: 'CORS Error',
          desc: 'Access denied due to CORS policy'
        }
      });
    }
    next(err);
  });
};

export { crossOrigin };
