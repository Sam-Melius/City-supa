const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzOTUwODgwMywiZXhwIjoxOTU1MDg0ODAzfQ.J-wd3ZinAsWJOx74WAlDTfP_zlOPEuXkq5omF4WTAQk';
const SUPABASE_URL = 'https://wkltsapfnvvazzlbkpbz.supabase.co';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getUser() {
    return client.auth.session();
}

export async function updateName(newName) {
    const user = await getUser();
    
    const response = await client
        .from('cities')
        .update({ name: newName })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateSlogans(slogansArray) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ slogans: slogansArray })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateWaterfrontId(newId) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ waterfront_id: newId })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateCastleId(newId) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ castle_id: newId })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function updateSkylineId(newId) {
    const user = await getUser();

    const response = await client
        .from('cities')
        .update({ skyline_id: newId })
        .match({ user_id: user.user.id })
        .single();

    return checkError(response);
}

export async function getCity() {
    const response = await client
        .from('cities')
        .select()
        .single();

    return checkError(response);
}

export async function createDefaultCity() {
    const response = await client
        .from('cities')
        .insert([
            {
                name: 'Matrix',
                waterfront_id: 1,
                skyline_id: 1,
                castle_id: 1,
                slogans: []
            }
        ]);
    return checkError(response);
}

export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./city');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '/';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
