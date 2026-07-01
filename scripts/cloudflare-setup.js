const fs = require('fs')
const path = require('path')
const https = require('https')

const envPath = path.resolve(__dirname, '..', '.env')
const env = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).filter(Boolean).reduce((acc, line) => {
  const [key, ...rest] = line.split('=')
  acc[key] = rest.join('=')
  return acc
}, {})

const token = env.CLOUDFLARE_API_TOKEN
const accountId = env.ACCOUNT_ID
const zoneId = env.ZONE_ID

if (!token || !accountId || !zoneId) {
  console.error('Missing CLOUDFLARE_API_TOKEN, ACCOUNT_ID or ZONE_ID in .env')
  process.exit(1)
}

const request = (method, url, body) => {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const options = {
      method,
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    }
    const req = https.request(options, res => {
      let data = ''
      res.on('data', chunk => (data += chunk))
      res.on('end', () => {
        let json = null
        try {
          json = data ? JSON.parse(data) : null
        } catch (err) {
          json = { parseError: err.message, raw: data }
        }
        resolve({ status: res.statusCode, body: json, raw: data })
      })
    })
    req.on('error', reject)
    if (body) req.write(JSON.stringify(body))
    req.end()
  })
}

const main = async () => {
  console.log('Fetching Pages projects...')
  const projects = await request('GET', `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects`)
  console.log(JSON.stringify(projects, null, 2))
  const project = projects.body?.result?.find(p => p.name === 'skvoshop')
  if (!project) {
    console.error('Project skvoshop not found')
    process.exit(1)
  }
  console.log('Project:', project.name, project.id)

  const pagesProjectPath = project.name
  const domains = ['skvo.shop', 'www.skvo.shop']
  for (const domain of domains) {
    console.log(`Adding custom domain: ${domain}`)
    const res = await request('POST', `https://api.cloudflare.com/client/v4/accounts/${accountId}/pages/projects/${pagesProjectPath}/domains`, { name: domain })
    console.log(JSON.stringify(res, null, 2))
  }

  const records = [
    { type: 'CNAME', name: 'www.skvo.shop', content: 'f323d5dd.skvoshop.pages.dev', ttl: 120, proxied: true },
    { type: 'CNAME', name: 'skvo.shop', content: 'f323d5dd.skvoshop.pages.dev', ttl: 120, proxied: true }
  ]

  for (const record of records) {
    const existing = await request('GET', `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?name=${encodeURIComponent(record.name)}`)
    if (existing.body?.result?.length) {
      console.log(`DNS record already exists for ${record.name}, skipping`)
      continue
    }
    console.log(`Creating DNS record: ${record.name}`)
    const res = await request('POST', `https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, record)
    console.log(JSON.stringify(res, null, 2))
  }

  console.log('No Worker routes are created for Pages custom domains.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
