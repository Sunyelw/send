const convict = require('convict');
const { tmpdir } = require('os');
const path = require('path');
const { randomBytes } = require('crypto');

const conf = convict({
  s3_bucket: {
    format: String,
    default: '',
    env: 'S3_BUCKET'
  },
  redis_host: {
    format: String,
    default: 'localhost',
    env: 'REDIS_HOST'
  },
  redis_event_expire: {
    format: Boolean,
    default: false,
    env: 'REDIS_EVENT_EXPIRE'
  },
  listen_address: {
    format: 'ipaddress',
    default: '0.0.0.0',
    env: 'IP_ADDRESS'
  },
  listen_port: {
    format: 'port',
    default: 1443,
    arg: 'port',
    env: 'PORT'
  },
  analytics_id: {
    format: String,
    default: '',
    env: 'GOOGLE_ANALYTICS_ID'
  },
  sentry_id: {
    format: String,
    default: '',
    env: 'SENTRY_CLIENT'
  },
  sentry_dsn: {
    format: String,
    default: '',
    env: 'SENTRY_DSN'
  },
  env: {
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  max_file_size: {
    format: Number,
    default: 1024 * 1024 * 1024 * 3,
    env: 'MAX_FILE_SIZE'
  },
  expire_seconds: {
    format: Number,
    default: 86400,
    env: 'EXPIRE_SECONDS'
  },
  l10n_dev: {
    format: Boolean,
    default: false,
    env: 'L10N_DEV'
  },
  base_url: {
    format: 'url',
    default: 'https://send.firefox.com',
    env: 'BASE_URL'
  },
  file_dir: {
    format: 'String',
    default: `${tmpdir()}${path.sep}send-${randomBytes(4).toString('hex')}`,
    env: 'FILE_DIR'
  },
  fxa_url: {
    format: 'url',
    default: 'https://stable.dev.lcip.org',
    env: 'FXA_URL'
  },
  fxa_client_id: {
    format: String,
    default: 'b50ec33d3c9beb6d', // localhost
    env: 'FXA_CLIENT_ID'
  },
  fxa_client_secret: {
    format: String,
    default: '05ac76fbe3e739c9effbaea439bc07d265c613c5e0da9070590a2378377c09d8', // localhost
    env: 'FXA_CLIENT_SECRET'
  }
});

// Perform validation
conf.validate({ allowed: 'strict' });

const props = conf.getProperties();
module.exports = props;
