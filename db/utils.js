// раньше это было pb.js. Добавляйте сюда вспомогательные функции.
// но хуки для pb-js-движка лучше в pb_hooks. https://pocketbase.io/docs/js-overview/
import PocketBase from 'pocketbase';
// это у вас обвязка для PocketBase, чтобы в каждой странице не писать new PocketBase()
const pb = new PocketBase(import.meta.env.VITE_PB_URL);
export default pb;
