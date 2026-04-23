import AppRouter from "./router/AppRouter";
import ChatWidget from "./components/chat/ChatWidget";

export default function App() {
  return (
    <>
      <AppRouter />
      <ChatWidget />
    </>
  );
}
