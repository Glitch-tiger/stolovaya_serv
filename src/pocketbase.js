import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.dev.zavidovo.school');
pb.autoCancellation(false);
export default pb;