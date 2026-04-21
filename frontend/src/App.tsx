import AppRouter from "./router/AppRouter";
import ChatWidget from "./components/ChatWidget";

export default function App() {
  return (
    <>
      <AppRouter />
      <ChatWidget />
    </>
  );
}
