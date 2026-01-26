import PocketBase from "pocketbase";

// На Render оба сервиса на одном домене, но разных портах
// PocketBase на порту 8090, React на 3000
const pbUrl = window.location.hostname === 'localhost' 
  ? "http://localhost:8090"
  : `${window.location.origin.replace(/:\d+/, '')}:8090`;

const pb = new PocketBase(pbUrl);
export default pb;

