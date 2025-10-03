class HealthController {
  /**
   * Health check endpoint
   */
  getHealth(req, res) {
    res.json({ 
      status: "ok", 
      timestamp: new Date(), 
      message: "Hello from Sapien!" 
    });
  }
}

module.exports = new HealthController();