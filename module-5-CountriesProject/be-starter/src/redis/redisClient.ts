import {createClient} from 'redis';

const redisClient = createClient({
  url: 'redis://localhost:6379'
})

export const redisInit = async () => {
  redisClient.on('error', (err)=>{
    console.log('Redis error', err);
  })

  redisClient.on('connect',()=> {
    console.log('Redis connected');
  })

  await redisClient.connect();
}

export default redisClient;