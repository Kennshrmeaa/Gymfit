export default async function handler(req, res) {
  try {
    console.log(`API Request: ${req.method} ${req.url}`);

    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Paymongo-Signature');
      return res.status(200).json({ ok: true });
    }

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Paymongo-Signature');

    // Route info
    const pathname = req.url.replace(/\?.*/, '').replace('/api', '');
    const method = req.method;

    // Simple health check
    if (method === 'GET' && pathname === '/health') {
      return res.status(200).json({
        ok: true,
        message: 'API is running'
      });
    }

    // For other routes, return a placeholder response for now
    if (pathname === '/auth/send-otp' && method === 'POST') {
      return res.status(200).json({
        ok: true,
        message: 'OTP handler placeholder',
        cooldownInSec: 60,
        expiresInSec: 300
      });
    }

    if (pathname === '/auth/verify-otp' && method === 'POST') {
      return res.status(200).json({
        ok: true,
        message: 'Verify OTP handler placeholder'
      });
    }

    if (pathname === '/subscriptions/create-checkout' && method === 'POST') {
      return res.status(200).json({
        ok: true,
        message: 'Create checkout handler placeholder'
      });
    }

    if (pathname === '/subscriptions/status' && method === 'GET') {
      return res.status(200).json({
        ok: true,
        subscription: { status: 'inactive' }
      });
    }

    // Route not found
    return res.status(404).json({
      ok: false,
      message: `Endpoint not found: ${method} ${pathname}`
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
      error: error.message
    });
  }
}
