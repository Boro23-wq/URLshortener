import upstash from "@upstash/redis"

const redis = upstash(process.env.UPSTASH_REDIS_REST_URL, process.env.UPSTASH_REDIS_REST_TOKEN);

export async function setUrl(url: string) : Promise<string>{
    const short = getShort(6);
    await redis.set(`short/${short}`, url);
    return short;
}

export async function getUrl(short: string): Promise<string>{
    const {data} = await redis.get(`short/${short}`);
    return data;
}

const getShort = (length: number) => {
    const charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        let randomPoz = Math.floor(Math.random() * charSet.length);
        randomString += charSet.substring(randomPoz,randomPoz+1);
    }

    return randomString;
}