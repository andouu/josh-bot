export async function getDatabase(dbName, client) {
    try {
        await client.connect();
        console.log('Connected successfully to server');
        
    }
}