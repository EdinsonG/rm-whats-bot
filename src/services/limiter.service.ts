import Bottleneck from "bottleneck";

export const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 2000 
});

export const randomDelay = () => new Promise(res => setTimeout(res, Math.random() * 3000));