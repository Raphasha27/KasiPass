import urllib.request, json

# Test root
r = urllib.request.urlopen('http://localhost:8000/')
print('GET /:', json.loads(r.read()))

# Register a fresh test user
data = json.dumps({'email':'apitest@test.com','password':'test123','full_name':'API Test'}).encode()
req = urllib.request.Request('http://localhost:8000/users/register', data=data, headers={'Content-Type':'application/json'})
try:
    r = urllib.request.urlopen(req)
    print('Register:', json.loads(r.read()))
except urllib.error.HTTPError as e:
    print(f'Register error: {e.code} {json.loads(e.read())}')

# Login using form data (OAuth2PasswordRequestForm)
import urllib.parse
form_data = urllib.parse.urlencode({'username':'apitest@test.com','password':'test123'}).encode()
req = urllib.request.Request('http://localhost:8000/users/token', data=form_data)
try:
    r = urllib.request.urlopen(req)
    result = json.loads(r.read())
    print('Login token:', result['token_type'], result['access_token'][:30]+'...')

    # Test authenticated endpoints
    token = result['access_token']
    req = urllib.request.Request('http://localhost:8000/users/me', headers={'Authorization': f'Bearer {token}'})
    r = urllib.request.urlopen(req)
    print('GET /users/me:', json.loads(r.read()))

    req = urllib.request.Request('http://localhost:8000/listings/', headers={'Authorization': f'Bearer {token}'})
    r = urllib.request.urlopen(req)
    print('GET /listings/:', json.loads(r.read()))
except urllib.error.HTTPError as e:
    print(f'Login error: {e.code} {e.read()[:200]}')
