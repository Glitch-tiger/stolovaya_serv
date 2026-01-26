import PocketBase from "pocketbase";

// В Codespaces используем динамический URL
const getPbUrl = () => {
  if (typeof window === 'undefined') return '';
  
  const { hostname, protocol } = window.location;
  
  // GitHub Codespaces
  if (hostname.includes('github.dev') || hostname.includes('preview.app.github.dev')) {
    return `${protocol}//${hostname.replace('3000', '8090')}`;
  }
  
  // Локально
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8090';
  }
  
  // GitHub Pages (НЕ БУДЕТ РАБОТАТЬ!)
  return '';
};

const pb = new PocketBase(getPbUrl());
export default pb;

