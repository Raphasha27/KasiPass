import urllib.request, json, sys

# Test root
r = urllib.request.urlopen('http://localhost:8000/')
print('GET /:', json.loads(r.read()))

# Register test user
data = json.dumps({'email':'test@test.com','password':'test123','full_name':'Test User'}).encode()
req = urllib.request.Request('http://localhost:8000/users/register', data=data, headers={'Content-Type':'application/json'})
r = urllib.request.urlopen(req)
print('Register:', json.loads(r.read()))

# Login
data = json.dumps({'username':'test@test.com','password':'test123'}).encode()
req = urllib.request.Request('http://localhost:8000/users/token', data=data, headers={'Content-Type':'application/json'})
r = urllib.request.urlopen(req)
result = json.loads(r.read())
print('Login token:', result['token_type'], result['access_token'][:30]+'...')

# Test authenticated endpoint
token = result['access_token']
req = urllib.request.Request('http://localhost:8000/users/me', headers={'Authorization': f'Bearer {token}'})
r = urllib.request.urlopen(req)
print('GET /users/me:', json.loads(r.read()))

# List users (authenticated)
req = urllib.request.Request('http://localhost:8000/users/', headers={'Authorization': f'Bearer {token}'})
r = urllib.request.urlopen(req)
print('GET /users/:', json.loads(r.read()))
