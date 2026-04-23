import AppRouter from "./router/AppRouter";
import ChatWidget from "./components/chat/ChatWidget";
import ToastContainer from "./components/ui/ToastContainer";

export default function App() {
  return (
    <>
      <AppRouter />
      <ChatWidget />
      <ToastContainer />
    </>
  );
}
