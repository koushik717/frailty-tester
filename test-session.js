import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

const jar = new CookieJar();
const baseURL = 'http://localhost:3000';

// Create axios instance that preserves cookies
const client = wrapper(axios.create({
    baseURL,
    jar,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
}));

async function testFlow() {
    try {
        console.log('🧪 Testing Session Flow with Cookie Jar\n');

        // Step 1: Login
        console.log('1️⃣ Logging in...');
        const loginRes = await client.post('/api/auth/login', {
            email: 'venkatakoushik777@gmail.com',
            password: 'ABCD@1234'
        });

        console.log('✅ Login response:', loginRes.data);
        console.log('🍪 Cookies set:', loginRes.headers['set-cookie']);
        console.log('🍪 Cookie jar:', await jar.getCookies(baseURL));

        // Step 2: Submit a test result
        console.log('\n2️⃣ Submitting PSS test result...');
        const testRes = await client.post('/api/frailty-tests/results', {
            test: 'pss10',
            testName: 'PSS-10 Stress Test',
            overallScore: 999,
            assessment: {
                category: 'TEST WITH COOKIE JAR'
            }
        });

        console.log('✅ Test submission response userId:', testRes.data.userId);

        // Step 3: Fetch results
        console.log('\n3️⃣ Fetching results...');
        const resultsRes = await client.get('/api/frailty-tests/results');

        console.log('✅ Results count:', resultsRes.data.length);
        if (resultsRes.data.length > 0) {
            console.log('✅ SUCCESS! Last result:', resultsRes.data[resultsRes.data.length - 1]);
        } else {
            console.log('❌ FAILED: No results returned');
        }

    } catch (error) {
        console.error('❌ Error:', error.response?.data || error.message);
    }
}

testFlow();
