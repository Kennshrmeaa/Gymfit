export default async function handler(req, res) {
  try {
    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Paymongo-Signature');
    res.setHeader('Content-Type', 'application/json');

    // Handle preflight
    if (req.method === 'OPTIONS') {
      return res.status(200).json({ ok: true });
    }

    console.log(`API: ${req.method} ${req.url}`);

    const pathname = new URL(req.url, `http://${req.headers.host}`).pathname.replace(/^\/api/, '');

    // Health check
    if (req.method === 'GET' && pathname === '/health') {
      return res.status(200).json({
        ok: true,
        timestamp: new Date().toISOString(),
        service: 'GymFit API'
      });
    }

    // OTP endpoints
    if (pathname === '/auth/send-otp') {
      if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });
      
      try {
        let body = '';
        for await (const chunk of req) {
          body += chunk.toString();
        }
        const data = JSON.parse(body || '{}');
        
        // Placeholder - would call actual handler
        return res.status(200).json({
          ok: true,
          message: 'OTP sent to ' + data.email,
          cooldownInSec: 60,
          expiresInSec: 300
        });
      } catch (err) {
        return res.status(400).json({ ok: false, message: 'Invalid request' });
      }
    }

    if (pathname === '/auth/verify-otp') {
      if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });
      
      try {
        let body = '';
        for await (const chunk of req) {
          body += chunk.toString();
        }
        const data = JSON.parse(body || '{}');
        
        return res.status(200).json({
          ok: true,
          message: 'Email verified',
          verifiedAt: new Date().toISOString()
        });
      } catch (err) {
        return res.status(400).json({ ok: false, message: 'Invalid request' });
      }
    }

    if (pathname === '/subscriptions/create-checkout') {
      if (req.method !== 'POST') return res.status(405).json({ ok: false, message: 'Method not allowed' });
      
      return res.status(200).json({
        ok: true,
        message: 'Checkout session created'
      });
    }

    if (pathname === '/subscriptions/status') {
      if (req.method !== 'GET') return res.status(405).json({ ok: false, message: 'Method not allowed' });
      
      return res.status(200).json({
        ok: true,
        subscription: { status: 'inactive' }
      });
    }

    // Not found
    return res.status(404).json({
      ok: false,
      message: `Endpoint not found: ${req.method} ${pathname}`
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
