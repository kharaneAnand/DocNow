import jwt from 'jsonwebtoken';

// Doctor authentication middleware
const authDoctor = async (req, res, next) => {
  try {
    console.log('Headers:', req.headers); // Check all headers
    const dToken = req.headers.dtoken;
    console.log('Received dToken:', dToken); // Check if token is present

    if (!dToken) {
      return res.status(401).json({ success: false, message: 'Not Authorized. Please log in again.' });
    }

    const decoded = jwt.verify(dToken, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);

    req.doctorId = decoded.id;

    next();
  } catch (error) {
    console.error('Auth error:', error);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authDoctor;
