require('dotenv').config()

/**
 * Environment variables.
 */
module.exports = {
  HOST1: process.env.HOST1 ?? '',
  USER1: process.env.USER1 ?? '',
  PASS1: process.env.PASS1 ?? '',
  DATA1: process.env.DATA1 ?? '',
  IP: process.env.IP ?? '127.0.0.1',
  HTTP_PORT: process.env.HTTP_PORT ?? 80,
  HTTPS_PORT: process.env.HTTPS_PORT ?? 443,
  NODE_ENV: process.env.NODE_ENV ?? 'dev',
};
